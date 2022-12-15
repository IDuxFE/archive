/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { RollupOutput } from 'rollup'
import type { BuildTargets, ResolvedArchiveConfig } from './types'

import { writeFileSync } from 'node:fs'

import { join } from 'pathe'
import { build as viteBuild } from 'vite'

import { loadConfig, resolveConfig } from './config'
import { createBuildViteConfig } from './vite'

export interface BuildOptions {
  root?: string
  target?: BuildTargets
}

export async function build(options: BuildOptions) {
  const { root, target } = options

  const { config } = await loadConfig(root)
  const resolvedConfig = resolveConfig(config)

  if (!target || target === 'app') {
    await buildApp(resolvedConfig)
  } else {
    await buildPages(resolvedConfig, target)
  }
}

async function buildApp(config: ResolvedArchiveConfig): Promise<void> {
  const viteConfig = await createBuildViteConfig(config, 'app')

  const buildResults = await viteBuild(viteConfig)
  const buildResult = (Array.isArray(buildResults) ? buildResults[0] : buildResults) as RollupOutput

  const indexOutput = buildResult.output.find(o => o.name === `app-${config.theme}` && o.type === 'chunk')!
  const styleOutput = buildResult.output.find(o => o.name === 'style.css' && o.type === 'asset')!
  const indexHtml = generateEntryHtml(indexOutput.fileName, styleOutput.fileName, viteConfig.base ?? '/')

  writeFileSync(join(config.dist, 'index.html'), indexHtml, 'utf-8')
}

async function buildPages(config: ResolvedArchiveConfig, target: 'page' | 'instance'): Promise<void> {
  const viteConfig = await createBuildViteConfig(config, target)

  await viteBuild(viteConfig)
}

function generateBaseHtml(head: string, body: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <title>archive Demos</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="">
  ${head}
</head>
<body>
  ${body}
</body>
</html>`
}

function generateEntryHtml(jsEntryFile: string, cssEntryFile: string, base: string): string {
  return generateBaseHtml(
    `<link rel="stylesheet" href="${base}${cssEntryFile}">`,
    `<div id="app"></div>
    <script type="module" src="${base}${jsEntryFile}"></script>`,
  )
}
