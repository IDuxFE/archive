/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type {
  BuildTargets,
  ResolvedArchiveConfig,
  ServerResolvedNavRecord,
  ServerResolvedPageData,
  ServerResolvedPageTab,
} from '@idux/archive-types'

import { createRequire } from 'node:module'

import { dirname, join } from 'pathe'
import { type InlineConfig, type Plugin, loadConfigFromFile, mergeConfig, searchForWorkspaceRoot } from 'vite'

import { genObjectScript } from '@idux/archive-utils'
import { createArchiveMdPlugin } from '@idux/archive-vite-markdown-plugin'
import { createArchivePlugin } from '@idux/archive-vite-plugin'

import { findMatchedPageLoader, getPageSrcByArchivePageId, isArchivePageId } from './utils'

const _require = createRequire(import.meta.url)
const BUNDLE_PATH = join(dirname(_require.resolve('@idux/archive-app/package.json')), 'bundle')

const APP_MOUNT_OPTIONS_ID = 'virtual:archive-app-mount-options'
const RESOLVED_APP_MOUNT_OPTIONS_ID = `/__resolved__${APP_MOUNT_OPTIONS_ID}`

function genPageTabScript(tab: ServerResolvedPageTab): string {
  return genObjectScript(
    tab,
    tab.component
      ? {
          component: tab.component,
        }
      : undefined,
  )
}
function genPageDataScript(pageData: ServerResolvedPageData): string {
  if (pageData.demoIds) {
    return JSON.stringify(pageData)
  }

  if (pageData.component) {
    return genObjectScript(pageData, { component: pageData.component })
  }

  if (pageData.tabs) {
    return genObjectScript(pageData, { tabs: `[${pageData.tabs.map(tab => genPageTabScript(tab)).join(',')}]` })
  }

  return 'undefined'
}
function genNavRecordsScript(records: ServerResolvedNavRecord[]): string {
  return `[${records.map(record => {
    if (record.type === 'link') {
      return JSON.stringify(record)
    }

    if (record.type === 'item') {
      return genObjectScript(
        record,
        record.pageData.tabs?.length ? { pageData: genPageDataScript(record.pageData) } : undefined,
      )
    }

    return genObjectScript(record, { children: genNavRecordsScript(record.children) })
  })}]`
}

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
      root: archiveConfig.root,
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
  plugins.push({
    name: 'archive-page-loaders',
    resolveId(id) {
      if (isArchivePageId(id)) {
        return id
      }
    },
    async load(id) {
      if (!isArchivePageId(id)) {
        return
      }

      const src = getPageSrcByArchivePageId(id)
      const loader = findMatchedPageLoader(src, archiveConfig.pageLoaders)

      if (!loader) {
        return ''
      }

      return await loader.resolver(src)
    },
  })

  userViteConfig.plugins = userViteConfig.plugins ?? []
  userViteConfig.plugins.push(...plugins)

  return userViteConfig
}

export async function createBuildViteConfig(
  archiveConfig: ResolvedArchiveConfig,
  target: BuildTargets,
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

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
