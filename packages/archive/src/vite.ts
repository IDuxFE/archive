import type { SetOptional } from 'type-fest'
import type { ResolvedArchiveConfig } from './types'
import type { ResolvedNavRecord, ResolvedPageTab, ResolvedPageData } from '@idux/archive-app'
import { type InlineConfig, type Plugin, loadConfigFromFile, searchForWorkspaceRoot, mergeConfig } from 'vite'
import { createArchiveMdPlugin } from '@idux/archive-markdown-plugin'
import { createArchivePlugin } from '@idux/archive-plugin'

import { dirname, join } from 'pathe'
import { createRequire } from 'node:module'

const _require = createRequire(import.meta.url)
const BUNDLE_PATH = join(dirname(_require.resolve('@idux/archive-app/package.json')), 'bundle')

const APP_MOUNT_OPTIONS_ID = 'virtual:archive-app-mount-options'
const RESOLVED_APP_MOUNT_OPTIONS_ID = `/__resolved__${APP_MOUNT_OPTIONS_ID}`

function genPageTabScript(tab: ResolvedPageTab): string {
  if (!tab.component) {
    return JSON.stringify(tab)
  }

  const tempTab = { ...tab }
  delete tempTab.component
  return `{${JSON.stringify(tempTab).slice(1, -1)}, component: ${tab.component}}`
}
function genPageDataScript(pageData: ResolvedPageData) {
  if (!pageData.tabs) {
    return JSON.stringify(pageData)
  }

  const tempPageData = { ...pageData }
  delete tempPageData.tabs

  return `{${JSON.stringify(tempPageData).slice(1, -1)}, tabs: [${pageData.tabs
    .map(tab => genPageTabScript(tab))
    .join(',')}]}`
}
function genNavRecordsScript(records: ResolvedNavRecord[]): string {
  return `[${records.map(record => {
    if (record.type === 'link') {
      return JSON.stringify(record)
    }

    if (record.type === 'item') {
      if (!record.pageData.tabs?.length) {
        return JSON.stringify(record)
      }

      const tempRecord = { ...record } as SetOptional<ResolvedNavRecord & { type: 'item' }, 'pageData'>
      delete tempRecord.pageData
      return `{${JSON.stringify(tempRecord).slice(1, -1)}, pageData: ${genPageDataScript(record.pageData)}}`
    }

    const tempRecord = { ...record } as SetOptional<ResolvedNavRecord & { type: 'sub' }, 'children'>
    delete tempRecord.children

    return `{${JSON.stringify(tempRecord).slice(1, -1)}, children: ${genNavRecordsScript(record.children)}}`
  })}]`
}

// function genThemeScript(theme: ResolvedArchiveConfig['theme']) {
//   const { rendererFile, themeStyle } = theme
//   return `${rendererFile ? `import renderers from ${rendererFile}` : ''}

//   `
// }

async function createCommonViteConfig(
  archiveConfig: ResolvedArchiveConfig,
  mode: 'build' | 'dev',
): Promise<InlineConfig> {
  const userViteConfigFile = await loadConfigFromFile({ command: mode === 'dev' ? 'serve' : 'build', mode })
  const userViteConfig = mergeConfig(userViteConfigFile?.config ?? {}, {
    configFile: false,
    server: { port: 8080 },
  })

  const plugins: Plugin[] = []

  plugins.push(createArchiveMdPlugin(archiveConfig.markdownOptions))
  plugins.push(
    createArchivePlugin({
      onDemosCollected: archiveConfig.onDemosCollected,
      collectors: archiveConfig.collectors,
    }),
  )
  plugins.push({
    name: 'archive-app-mount-options',
    resolveId(id) {
      if (id.startsWith(APP_MOUNT_OPTIONS_ID)) {
        return RESOLVED_APP_MOUNT_OPTIONS_ID
      }
    },

    // TODO: hmr
    load(id) {
      if (id.startsWith(RESOLVED_APP_MOUNT_OPTIONS_ID)) {
        const { resolvedNavRecords, routeRecords } = archiveConfig.getResolvedRecords()
        const navRecordsScript = genNavRecordsScript(resolvedNavRecords)
        const { setupFile } = archiveConfig

        return `${setupFile ? `import setupContext from '${setupFile}'` : ''}
        
        export default {
          el: '#app',
          theme: ${JSON.stringify(archiveConfig.theme)},
          navRecords: ${navRecordsScript},
          routeRecords: [${routeRecords
            .map(record => `{path: ${JSON.stringify(record.path)}, pageData: ${genPageDataScript(record.pageData)}}`)
            .join(',')}],
          ${
            setupFile
              ? [
                  'setupApp: setupContext.setupApp',
                  'setupOptions: setupContext.options',
                  'renderers: setupContext.renderers',
                ].join(',')
              : ''
          }
        }`
      }
    },
  })

  userViteConfig.plugins = userViteConfig.plugins ?? []
  userViteConfig.plugins.push(...plugins)

  return userViteConfig
}

export async function createBuildViteConfig(
  archiveConfig: ResolvedArchiveConfig,
  target: 'page' | 'app',
): Promise<InlineConfig> {
  const commonViteConfig = await createCommonViteConfig(archiveConfig, 'build')
  const isAppBuild = target === 'app'
  const buildViteConfig = mergeConfig(commonViteConfig, {
    mode: 'development',
    build: {
      lib: isAppBuild
        ? false
        : {
            entry: '',
            formats: ['es'],
            fileName: 'index',
          },
      rollupOptions: {
        input: join(BUNDLE_PATH, `${target}-${archiveConfig.theme.themeStyle}.js`),
        plugins: [
          {
            name: 'archive-build-rollup-options-override',
            enforce: 'post',
            options(options: any) {
              if (isAppBuild) {
                options.external = []
              }
            },
          },
        ],
      },
      outDir: archiveConfig.dist,
      emptyOutDir: true,
      cssCodeSplit: false,
      minify: false,
    },
  })

  buildViteConfig.plugins.push({
    name: 'archive-build-config-override',
    enforce: 'post',
    config(config) {
      if (isAppBuild) {
        config.build!.rollupOptions!.external = []
      }
    },
  } as Plugin)

  return buildViteConfig
}

export async function createDevViteConfig(archiveConfig: ResolvedArchiveConfig): Promise<InlineConfig> {
  const devViteConfig = await createCommonViteConfig(archiveConfig, 'dev')

  devViteConfig.plugins!.push({
    name: 'archive-dev-server-html',
    config() {
      return {
        server: {
          fs: {
            allow: [BUNDLE_PATH, archiveConfig.root, process.cwd(), searchForWorkspaceRoot(process.cwd())],
          },
          watch: {
            ignored: ['**/vite.config.*'],
          },
          hmr: true,
        },
        optimizeDeps: {
          entries: [join(BUNDLE_PATH, `app-${archiveConfig.theme.themeStyle}.js`)],
          exclude: ['archive'],
        },
      }
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (req.url!.endsWith('.html')) {
            res.statusCode = 200

            let html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title></title>
      <link rel="icon" href=""/>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="description" content="">
    </head>
    <body>
      <div id="app"></div>
      <script type="module" src="/@fs/${BUNDLE_PATH}/app-${archiveConfig.theme.themeStyle}.js"></script>
    </body>
  </html>`
            // Apply Vite HTML transforms. This injects the Vite HMR client, and
            // also applies HTML transforms from Vite plugins
            html = await server.transformIndexHtml(req.url!, html)
            res.setHeader('content-type', 'text/html; charset=UTF-8')
            res.end(html)
            return
          }
          next()
        })
      }
    },
  })

  return devViteConfig
}
