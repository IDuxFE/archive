import type { RollupOutput } from 'rollup'
import { build as viteBuild } from 'vite'
import { createBuildViteConfig } from './vite'
import { loadConfig, resolveConfig } from './config'

import { join } from 'pathe'
import { writeFileSync } from 'node:fs'

export async function buildApp() {
  const { config } = await loadConfig()
  const resolvedConfig = resolveConfig(config)
  const viteConfig = await createBuildViteConfig(resolvedConfig, 'app')

  const buildResults = await viteBuild(viteConfig)
  const buildResult = (Array.isArray(buildResults) ? buildResults[0] : buildResults) as RollupOutput

  const indexOutput = buildResult.output.find(o => o.name === `app-${resolvedConfig.theme}` && o.type === 'chunk')!
  const styleOutput = buildResult.output.find(o => o.name === 'style.css' && o.type === 'asset')!
  const indexHtml = generateEntryHtml(indexOutput.fileName, styleOutput.fileName, viteConfig.base ?? '/')

  writeFileSync(join(resolvedConfig.dist, 'index.html'), indexHtml, 'utf-8')
}

export async function buildPages() {
  const { config } = await loadConfig()
  const resolvedConfig = resolveConfig(config)
  const viteConfig = await createBuildViteConfig(resolvedConfig, 'page')

  await viteBuild(viteConfig)
}

function generateBaseHtml(head: string, body: string) {
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

function generateEntryHtml(jsEntryFile: string, cssEntryFile: string, base: string) {
  return generateBaseHtml(
    `<link rel="stylesheet" href="${base}${cssEntryFile}">`,
    `<div id="app"></div>
    <script type="module" src="${base}${jsEntryFile}"></script>`,
  )
}

function generatePagesEntryScript(jsEntryFile: string) {
  return `import { pages } from './${jsEntryFile}'
export default pages`
}