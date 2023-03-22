/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from 'fs'
import path from 'path'

import { resolveTitleFromToken } from '@mdit-vue/shared'
import _debug from 'debug'
import LRUCache from 'lru-cache'

import { type MarkdownEnv, type MarkdownOptions, type MarkdownRenderer, createMarkdownRenderer } from './markdown'
import { CleanUrlsMode, HeadConfig, PageData } from './types'

const debug = _debug('@idux/archive-vite-markdown-plugin')
const cache = new LRUCache<string, MarkdownCompileResult>({ max: 1024 })
const includesRE = /<!--\s*@include:\s*(.*?)\s*-->/g

export interface MarkdownCompileResult {
  vueSrc: string
  pageData: PageData
  includes: string[]
}

export function clearCache(): void {
  cache.clear()
}

export async function createMarkdownToVueRenderFn(
  srcDir: string,
  options: MarkdownOptions = {},
  userDefines: Record<string, any> | undefined,
  isBuild = false,
  base = '/',
  cleanUrls: CleanUrlsMode = 'disabled',
): Promise<(src: string, file: string) => Promise<MarkdownCompileResult>> {
  const md = await createMarkdownRenderer(srcDir, options, base)
  const replaceRegex = genReplaceRegexp(userDefines, isBuild)

  return async (src: string, file: string): Promise<MarkdownCompileResult> => {
    const relativePath = path.posix.relative(srcDir, file)
    const dir = path.dirname(file)
    const cacheKey = JSON.stringify({ src, file })

    const cached = cache.get(cacheKey)
    if (cached) {
      debug(`[cache hit] ${relativePath}`)
      return cached
    }

    const start = Date.now()

    // resolve includes
    const includes: string[] = []
    src = src.replace(includesRE, (m, m1) => {
      try {
        const includePath = path.posix.join(dir, m1)
        const content = fs.readFileSync(includePath, 'utf-8')
        includes.push(includePath)
        return content
      } catch (error) {
        return m // silently ignore error if file is not present
      }
    })

    // reset env before render
    const env: MarkdownEnv = {
      path: file,
      relativePath,
      cleanUrls,
    }
    const html = md.render(src, env)
    const { frontmatter = {}, headers = [], sfcBlocks, title = '' } = env

    const pageData: PageData = {
      title: inferTitle(md, frontmatter, title),
      titleTemplate: frontmatter.titleTemplate as any,
      description: inferDescription(frontmatter),
      frontmatter,
      headers,
      relativePath,
    }

    const vueSrc = [
      ...injectPageDataCode(sfcBlocks?.scripts.map(item => item.content) ?? [], pageData, replaceRegex),
      `<template><div class="archive-md">${replaceConstants(html, replaceRegex, vueTemplateBreaker)}</div></template>`,
      ...(sfcBlocks?.styles.map(item => item.content) ?? []),
      ...(sfcBlocks?.customBlocks.map(item => item.content) ?? []),
    ].join('\n')

    debug(`[render] ${file} in ${Date.now() - start}ms.`)

    const result = {
      vueSrc,
      pageData,
      includes,
    }
    cache.set(cacheKey, result)
    return result
  }
}

const scriptRE = /<\/script>/
const scriptLangTsRE = /<\s*script[^>]*\blang=['"]ts['"][^>]*/
const scriptSetupRE = /<\s*script[^>]*\bsetup\b[^>]*/
const scriptClientRE = /<\s*script[^>]*\bclient\b[^>]*/
const defaultExportRE = /((?:^|\n|;)\s*)export(\s*)default/
const namedDefaultExportRE = /((?:^|\n|;)\s*)export(.+)as(\s*)default/
const jsStringBreaker = '\u200b'
const vueTemplateBreaker = '<wbr>'

function genReplaceRegexp(userDefines: Record<string, any> = {}, isBuild: boolean): RegExp {
  // `process.env` need to be handled in both dev and build
  // @see https://github.com/vitejs/vite/blob/cad27ee8c00bbd5aeeb2be9bfb3eb164c1b77885/packages/vite/src/node/plugins/clientInjections.ts#L57-L64
  const replacements = ['process.env']
  if (isBuild) {
    replacements.push('import.meta', ...Object.keys(userDefines))
  }
  return new RegExp(`\\b(${replacements.map(key => key.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')).join('|')})`, 'g')
}

/**
 * To avoid env variables being replaced by vite:
 * - insert `'\u200b'` char into those strings inside js string (page data)
 * - insert `<wbr>` tag into those strings inside html string (vue template)
 *
 * @see https://vitejs.dev/guide/env-and-mode.html#production-replacement
 */
function replaceConstants(str: string, replaceRegex: RegExp, breaker: string) {
  return str.replace(replaceRegex, _ => `${_[0]}${breaker}${_.slice(1)}`)
}

function injectPageDataCode(tags: string[], data: PageData, replaceRegex: RegExp) {
  const dataJson = JSON.stringify(data)
  const code = `\nexport const pageData = JSON.parse(${JSON.stringify(
    replaceConstants(dataJson, replaceRegex, jsStringBreaker),
  )})`

  const existingScriptIndex = tags.findIndex(tag => {
    return scriptRE.test(tag) && !scriptSetupRE.test(tag) && !scriptClientRE.test(tag)
  })

  const isUsingTS = tags.findIndex(tag => scriptLangTsRE.test(tag)) > -1

  if (existingScriptIndex > -1) {
    const tagSrc = tags[existingScriptIndex]
    // user has <script> tag inside markdown
    // if it doesn't have export default it will error out on build
    const hasDefaultExport = defaultExportRE.test(tagSrc) || namedDefaultExportRE.test(tagSrc)
    tags[existingScriptIndex] = tagSrc.replace(
      scriptRE,
      code + (hasDefaultExport ? `` : `\nexport default {name:'${path.basename(data.relativePath)}'}`) + `</script>`,
    )
  } else {
    tags.unshift(
      `<script ${isUsingTS ? 'lang="ts"' : ''}>${code}\nexport default {name:'${path.basename(
        data.relativePath,
      )}'}</script>`,
    )
  }

  return tags
}

const inferTitle = (md: MarkdownRenderer, frontmatter: Record<string, any>, title: string) => {
  if (typeof frontmatter.title === 'string') {
    const titleToken = md.parseInline(frontmatter.title, {})[0]
    if (titleToken) {
      return resolveTitleFromToken(titleToken, {
        shouldAllowHtml: false,
        shouldEscapeText: false,
      })
    }
  }
  return title
}

const inferDescription = (frontmatter: Record<string, any>) => {
  const { description, head } = frontmatter

  if (description !== undefined) {
    return description
  }

  return (head && getHeadMetaContent(head, 'description')) || ''
}

const getHeadMetaContent = (head: HeadConfig[], name: string): string | undefined => {
  if (!head || !head.length) {
    return undefined
  }

  const meta = head.find(([tag, attrs = {}]) => {
    return tag === 'meta' && attrs.name === name && attrs.content
  })

  return meta && meta[1].content
}
