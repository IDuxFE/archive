/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { componentPlugin } from '@mdit-vue/plugin-component'
import { type FrontmatterPluginOptions, frontmatterPlugin } from '@mdit-vue/plugin-frontmatter'
import { type HeadersPluginOptions, headersPlugin } from '@mdit-vue/plugin-headers'
import { type SfcPluginOptions, sfcPlugin } from '@mdit-vue/plugin-sfc'
import { titlePlugin } from '@mdit-vue/plugin-title'
import { type TocPluginOptions, tocPlugin } from '@mdit-vue/plugin-toc'
import { slugify } from '@mdit-vue/shared'
import MarkdownIt from 'markdown-it'
import anchorPlugin from 'markdown-it-anchor'
import attrsPlugin from 'markdown-it-attrs'
import emojiPlugin from 'markdown-it-emoji'
import { IThemeRegistration } from 'shiki'

import { Header } from '../types'
import { containerPlugin } from './plugins/containers'
import { highlight } from './plugins/highlight'
import { highlightLinePlugin } from './plugins/highlightLines'
import { imagePlugin } from './plugins/image'
import { lineNumberPlugin } from './plugins/lineNumbers'
import { linkPlugin } from './plugins/link'
import { preWrapperPlugin } from './plugins/preWrapper'
import { snippetPlugin } from './plugins/snippet'

export type ThemeOptions = IThemeRegistration | { light: IThemeRegistration; dark: IThemeRegistration }

export interface MarkdownOptions extends MarkdownIt.Options {
  lineNumbers?: boolean
  config?: (md: MarkdownIt) => void
  anchor?: anchorPlugin.AnchorOptions
  attrs?: {
    leftDelimiter?: string
    rightDelimiter?: string
    allowedAttributes?: string[]
    disable?: boolean
  }
  frontmatter?: FrontmatterPluginOptions
  headers?: HeadersPluginOptions
  sfc?: SfcPluginOptions
  theme?: ThemeOptions
  toc?: TocPluginOptions
  externalLinks?: Record<string, string>
}

export type MarkdownRenderer = MarkdownIt

export type { Header }

export const createMarkdownRenderer = async (
  srcDir: string,
  options: MarkdownOptions = {},
  base = '/',
): Promise<MarkdownRenderer> => {
  const md = MarkdownIt({
    html: true,
    linkify: true,
    highlight: options.highlight || (await highlight(options.theme)),
    ...options,
  }) as MarkdownRenderer

  // custom plugins
  md.use(componentPlugin)
    .use(highlightLinePlugin)
    .use(preWrapperPlugin)
    .use(snippetPlugin, srcDir)
    .use(containerPlugin)
    .use(imagePlugin)
    .use(
      linkPlugin,
      {
        target: '_blank',
        rel: 'noreferrer',
        ...options.externalLinks,
      },
      base,
    )

  // 3rd party plugins
  if (!options.attrs?.disable) {
    md.use(attrsPlugin, options.attrs)
  }
  md.use(emojiPlugin)

  // mdit-vue plugins
  md.use(anchorPlugin, {
    slugify,
    permalink: anchorPlugin.permalink.ariaHidden({}),
    ...options.anchor,
  } as anchorPlugin.AnchorOptions)
    .use(frontmatterPlugin, {
      ...options.frontmatter,
    } as FrontmatterPluginOptions)
    .use(headersPlugin, {
      ...options.headers,
    } as HeadersPluginOptions)
    .use(sfcPlugin, {
      ...options.sfc,
    } as SfcPluginOptions)
    .use(titlePlugin)
    .use(tocPlugin, {
      ...options.toc,
    } as TocPluginOptions)

  // apply user config
  if (options.config) {
    options.config(md)
  }

  if (options.lineNumbers) {
    md.use(lineNumberPlugin)
  }
  return md
}
