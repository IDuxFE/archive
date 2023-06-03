/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { LoadedItem, Loader, Options, ResolvedLoader, ResolvedOptions, Storage } from './types'
import type { Plugin, ResolvedConfig, ViteDevServer } from 'vite'

import { parseRequest } from './query'
import { genDataScript } from './scriptGen'
import { createStorage } from './storage'

const DEFAULT_PREFIX = 'archive:'
const RESOLVED_PREFIX = '/archive__resolved'
const RESOLVED_AFFIX = `__resolved`

const defaultResolve = (absolutePath: string) => {
  return Promise.resolve({
    instanceScript: `() => import(${JSON.stringify(absolutePath)})`,
  })
}

function resolveOptions(config: ResolvedConfig, options?: Options): ResolvedOptions {
  const { root, loaders } = options ?? {}

  const resolvedLoaders = loaders?.length
    ? loaders.map(loader => resolveLoader(loader))
    : [resolveLoader({ name: 'default', matched: (path: string) => path.endsWith('.vue') })]

  return {
    root: root ?? config.root,
    loaders: resolvedLoaders,
  }
}
function resolveLoader(loader: Loader): ResolvedLoader {
  const { name, matched, resolve, prefix } = loader

  return {
    name,
    prefix: prefix ?? DEFAULT_PREFIX,
    resolve: resolve ?? defaultResolve,
    matched,
  }
}

export function createArchivePlugin(options?: Options): Plugin {
  let config: ResolvedConfig
  let storage: Storage
  let resolvedOptions: ResolvedOptions

  const parseId = (resolvedId: string): string => {
    const id = resolvedId.slice(RESOLVED_PREFIX.length, resolvedId.length - RESOLVED_AFFIX.length)

    return id
  }
  const resolveIdByLoaders = (id: string) => {
    for (const _loader of resolvedOptions.loaders) {
      if (!id.startsWith(_loader.prefix)) {
        continue
      }

      const _path = id.replace(_loader.prefix, '')
      if (_loader.matched(_path)) {
        return {
          loader: _loader,
          path: _path,
        }
      }
    }
  }

  return {
    name: 'idux:demo-plugin',

    async configResolved(resolvedConfig) {
      config = resolvedConfig
      resolvedOptions = resolveOptions(config, options)
      storage = createStorage(resolvedOptions)
    },

    async resolveId(id, importer) {
      const resolvedRes = resolveIdByLoaders(id)

      if (!resolvedRes) {
        return
      }

      const resolvedModule = await this.resolve(resolvedRes.path, importer)

      if (!resolvedModule) {
        return null
      }

      return RESOLVED_PREFIX + resolvedRes.loader.prefix + resolvedModule.id + RESOLVED_AFFIX
    },

    async load(resolvedId) {
      if (!resolvedId.startsWith(RESOLVED_PREFIX)) {
        return
      }

      const id = parseId(resolvedId)
      const resolveRes = resolveIdByLoaders(id)

      if (!resolveRes) {
        return
      }

      const { loader, path } = resolveRes
      const { path: requestPath, query } = parseRequest(path)
      const item = storage.exists(requestPath)
        ? await storage.get(requestPath)!
        : await storage.set(requestPath, query, loader)
      return genDataScript(item)
    },

    async transform(code, id) {
      if (storage.exists(id)) {
        const loader = storage.get(id)!.loader

        return loader.transform?.(code)
      }
    },

    handleHotUpdate(updateContext) {
      if (storage.exists(updateContext.file)) {
        const item = storage.get(updateContext.file)!
        storage.set(item.absolutePath, item.query, item.loader)

        const itemModule = getItemModule(updateContext.server, item)!

        return [itemModule, ...updateContext.modules]
      }
    },
  }
}

function getItemModule(server: ViteDevServer, item: LoadedItem) {
  return server.moduleGraph.getModuleById(RESOLVED_PREFIX + item.loader.prefix + item.absolutePath + RESOLVED_AFFIX)
}
