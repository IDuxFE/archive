/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { BuildTargets, ResolvedArchiveConfig } from '@idux/archive-types'

import { createRequire } from 'node:module'

import { dirname, join } from 'pathe'
import {
  type InlineConfig,
  type Plugin,
  type ViteDevServer,
  loadConfigFromFile,
  mergeConfig,
  searchForWorkspaceRoot,
} from 'vite'

import { createArchiveMdPlugin } from '@idux/archive-vite-markdown-plugin'
import { createArchivePlugin } from '@idux/archive-vite-plugin'

import { genNavRecordsScript, genPageDataScript, getPluginLoaders } from './utils'

const _require = createRequire(import.meta.url)
const BUNDLE_PATH = join(dirname(_require.resolve('@idux/archive-app/package.json')), 'bundle')

const APP_MOUNT_OPTIONS_ID = 'virtual:archive-app-mount-options'
const RESOLVED_APP_MOUNT_OPTIONS_ID = `/__resolved__${APP_MOUNT_OPTIONS_ID}`

function getOptimizeDep(entry: string) {
  return {
    entries: [entry],
    exclude: ['@idux/archive', '@idux/archive-app', '@idux/archive-app/vue', '@idux/archive-app/components'],
  }
}

const HMR_SCRIPT = `;if(__import_meta_hot__){__import_meta_hot__.accept(() => {__import_meta_hot__.invalidate()})}`
function updateModule(server: ViteDevServer, id: string) {
  const mod = server.moduleGraph.getModuleById(id)
  if (!mod) {
    return
  }
  server.moduleGraph.invalidateModule(mod)
  server.reloadModule(mod)
}

async function createCommonViteConfig(
  archiveConfig: ResolvedArchiveConfig,
  mode: 'build' | 'dev',
): Promise<InlineConfig> {
  const userViteConfigFile = await loadConfigFromFile({ command: mode === 'dev' ? 'serve' : 'build', mode })
  const userViteConfig = mergeConfig(userViteConfigFile?.config ?? {}, {
    configFile: false,
    define: {
      __DEV__: mode === 'dev',
      __BASE_URL__: userViteConfigFile?.config.base,
    },
    server: { port: 8080 },
  })

  const plugins: Plugin[] = []

  plugins.push(createArchiveMdPlugin(archiveConfig.markdownOptions))
  plugins.push(
    createArchivePlugin({
      root: archiveConfig.root,
      loaders: getPluginLoaders(archiveConfig.pageLoaders, archiveConfig.demoLoaders),
    }),
  )
  plugins.push({
    name: 'archive-app-mount-options',
    resolveId(id) {
      if (id.startsWith(APP_MOUNT_OPTIONS_ID)) {
        return RESOLVED_APP_MOUNT_OPTIONS_ID
      }
    },

    configureServer(server) {
      const update = () => updateModule(server, RESOLVED_APP_MOUNT_OPTIONS_ID)

      archiveConfig.watchNavConfig(update)
    },

    // TODO: hmr
    load(id) {
      if (id.startsWith(RESOLVED_APP_MOUNT_OPTIONS_ID)) {
        const { resolvedNavRecords, routeRecords } = archiveConfig.getResolvedRecords()
        const navRecordsScript = genNavRecordsScript(resolvedNavRecords)
        const { setupFile } = archiveConfig

        return `${setupFile ? `import setupContext from ${JSON.stringify(setupFile)}` : ''}
        
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
                  'setupApp: setupContext?.setupApp',
                  'setupOptions: setupContext?.options',
                  'renderers: setupContext?.renderers',
                ].join(',')
              : ''
          }
        }${HMR_SCRIPT}`
      }
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
  const entry = join(BUNDLE_PATH, `${target}-${archiveConfig.theme.themeStyle}.js`)

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
        input: entry,
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

      return {
        optimizeDeps: getOptimizeDep(entry),
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
        optimizeDeps: getOptimizeDep(join(BUNDLE_PATH, `app-${archiveConfig.theme.themeStyle}.js`)),
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
