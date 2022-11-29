import { type Plugin, type ResolvedConfig, type ViteDevServer, createFilter } from 'vite'
import type {
  CollectedDemo,
  Options,
  ResolvedOptions,
  DemoStorage,
  Collector,
  ResolvedCollector,
} from './types'

import { readFileSync } from 'fs'
import { basename } from 'pathe'

import {
  BASIC_HMR_SCRIPT,
  defaultDemoScriptGenerator,
  genDemoDataScript,
  genAllDemoDataScript,
} from './scriptGen'
import { createDemoStorage, watchDemos, collectAllDemos } from './demoStorage'

const ALL_DEMO_ID = 'virtual:archive-demo-all'
const RESOLVED_ALL_DEMO_ID = `/__resolved__${ALL_DEMO_ID}`

const ALL_DEMO_DATA_ID = `${ALL_DEMO_ID}-data`
const RESOLVED_ALL_DEMO_DATA_ID = `/__resolved__${ALL_DEMO_DATA_ID}`

const DEMO_ID_PREFIX = 'virtual:archive-demo:'
const RESOLVED_DEMO_ID_PREFIX = `/__resolved__${DEMO_ID_PREFIX}`

const DEMO_DATA_ID_PREFIX = 'virtual:archive-demo-data:'
const RESOLVED_DEMO_DATA_ID_PREFIX = `/__resolved__${DEMO_DATA_ID_PREFIX}`

const defaultResolver = (absolutePath: string) => {
  const code = readFileSync(absolutePath, 'utf-8')
  return Promise.resolve({
    component: `() => import(${JSON.stringify(absolutePath)})`,
    sourceCodes: [
      {
        filename: basename(absolutePath),
        code: `() => ${JSON.stringify(code).trim()}`,
        parsedCode: `() => ${JSON.stringify(code).trim()}`,
      },
    ],
  })
}

function resolveOptions(config: ResolvedConfig, options?: Options): ResolvedOptions {
  const { root, demoScriptGenerator, collectors } = options ?? {}

  const resolvedDemoScriptGenerator = demoScriptGenerator ?? defaultDemoScriptGenerator

  const resolvedCollectors = collectors?.length
    ? collectors.map(collector => resolveCollector(collector, resolvedDemoScriptGenerator))
    : [resolveCollector({ name: 'default', matchPattern: '**/*.vue' }, resolvedDemoScriptGenerator)]

  const findCollector = (path: string) => resolvedCollectors.find(collector => collector.filter(path))

  return {
    root: root ?? config.root,
    onDemosCollected: options?.onDemosCollected ?? (() => {}),
    demoScriptGenerator: resolvedDemoScriptGenerator,
    collectors: resolvedCollectors,
    findCollector,
  }
}
function resolveCollector(
  collector: Collector,
  demoScriptGenerator: (demo: CollectedDemo) => string,
): ResolvedCollector {
  const { name, matchPattern, ignorePattern, resolver, demoRenderer } = collector
  const resolvedIgnorePattern = ignorePattern ?? ''

  return {
    name,
    matchPattern,
    ignorePattern: ignorePattern ?? '',
    resolver: resolver ?? defaultResolver,
    demoRenderer: demoRenderer ?? demoScriptGenerator,
    filter: createFilter(matchPattern, resolvedIgnorePattern),
  }
}

export function createArchivePlugin(options?: Options): Plugin {
  let config: ResolvedConfig
  let demoStorage: DemoStorage
  let resolvedOptions: ResolvedOptions

  const findDemoByResolvedId = (resolvedId: string, prefix: string): CollectedDemo | undefined => {
    const demoId = resolvedId.slice(prefix.length)

    if (demoStorage.exists(demoId)) {
      return demoStorage.get(demoId)
    }
  }

  return {
    name: 'idux:demo-plugin',

    async configResolved(resolvedConfig) {
      config = resolvedConfig
      resolvedOptions = resolveOptions(config, options)
      demoStorage = createDemoStorage(resolvedOptions)

      if (config.command !== 'build') {
        watchDemos(resolvedOptions, demoStorage)
      } else {
        await collectAllDemos(resolvedOptions, demoStorage)
        resolvedOptions.onDemosCollected(demoStorage.getAll())
      }
    },

    configureServer(server) {
      demoStorage.onListChange(() => updateModule(server, RESOLVED_ALL_DEMO_DATA_ID))
      demoStorage.onListChange(() => updateModule(server, RESOLVED_ALL_DEMO_ID))
      demoStorage.onListChange(() => resolvedOptions.onDemosCollected(demoStorage.getAll()))
      demoStorage.onDemoChange(demo => updateModule(server, `${RESOLVED_DEMO_DATA_ID_PREFIX}${demo.id}`))
      demoStorage.onDemoChange(demo => updateModule(server, `${RESOLVED_DEMO_ID_PREFIX}${demo.id}`))
    },

    async resolveId(id) {
      if (id === ALL_DEMO_ID) {
        return RESOLVED_ALL_DEMO_ID
      }

      if (id === ALL_DEMO_DATA_ID) {
        return RESOLVED_ALL_DEMO_DATA_ID
      }

      if (
        id.startsWith(DEMO_ID_PREFIX) ||
        id.startsWith(DEMO_DATA_ID_PREFIX)
      ) {
        return `/__resolved__${id}`
      }
    },

    async load(id) {
      if (id === RESOLVED_ALL_DEMO_DATA_ID) {
        return genAllDemoDataScript(demoStorage.getAll(), resolvedOptions.demoScriptGenerator)
      }

      if (id.startsWith(RESOLVED_DEMO_DATA_ID_PREFIX)) {
        const demo = findDemoByResolvedId(id, RESOLVED_DEMO_DATA_ID_PREFIX)
        if (demo) {
          return genDemoDataScript(demo, resolvedOptions.demoScriptGenerator)
        }
      }

      if (id.startsWith(RESOLVED_DEMO_ID_PREFIX)) {
        const demo = findDemoByResolvedId(id, RESOLVED_DEMO_ID_PREFIX)
        const collector = demo && resolvedOptions.findCollector(demo.path)
        if (!collector) {
          return
        }

        return `${collector.demoRenderer(demo)}${BASIC_HMR_SCRIPT}`
      }

      if (id === RESOLVED_ALL_DEMO_ID) {
        const demos = demoStorage.getAll()

        return `${demos.map((demo, idx) => `import DemoComp${idx} from 'virtual:archive-demo:${demo.id}'\n`).join('')}
        export default {
          ${demos.map((demo, idx) => `${JSON.stringify(demo.id)}: DemoComp${idx}`).join(',')}
        }
        ${BASIC_HMR_SCRIPT}
        `
      }
    },

    handleHotUpdate(updateContext) {
      const demo = demoStorage.get(updateContext.file)
      if (demo) {
        demoStorage.notifyDemoChange(demo)
      }
    },
  }
}

function updateModule(server: ViteDevServer, id: string) {
  const mod = server.moduleGraph.getModuleById(id)
  if (!mod) {
    return
  }
  server.moduleGraph.invalidateModule(mod)

  // Send HMR update
  const timestamp = Date.now()
  mod.lastHMRTimestamp = timestamp
  server.ws.send({
    type: 'update',
    updates: [
      {
        type: 'js-update',
        acceptedPath: mod.url,
        path: mod.url,
        timestamp: timestamp,
      },
    ],
  })
}
