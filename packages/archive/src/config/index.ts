import type { archiveConfig, ResolvedarchiveConfig } from '../types'
import type { CollectedDemo } from '@idux/archive-plugin'

import { parse, join, dirname } from 'pathe'
import { existsSync } from 'fs'
import { pathToFileURL } from 'node:url'

import { resolveRecords } from './resolveRecords'
import { resolveCollectors } from './resolveCollectors'
import { getSidebarRecordsByDirectory } from './getSidebarRecordsByDirectory'

export const configFileNames = ['archive.config.js']

export function defineConfig(config: archiveConfig): archiveConfig {
  return config
}

export async function loadConfig(cwd: string = process.cwd()): Promise<{
  config: archiveConfig | undefined
  configFilePath: string | undefined
}> {
  const configFilePath = findUp(cwd, configFileNames)

  if (!configFilePath) {
    return {
      config: undefined,
      configFilePath: undefined,
    }
  }

  try {
    const result = await import(pathToFileURL(configFilePath).href)

    if (!result.default) {
      throw new Error(`Expected default export in ${configFilePath}`)
    }

    return {
      config: result.default,
      configFilePath,
    }
  } catch (e) {
    console.error(`Error while loading ${configFilePath}`)
    throw e
  }
}

export function resolveConfig(config?: archiveConfig): ResolvedarchiveConfig {
  const { navConfig, sidebarConfig, theme, pageAnchor, collectors, markdownOptions, dist, root } = mergeConfig(config)

  let running = false
  let resolvedRecords: ReturnType<typeof resolveRecords>

  const onDemosCollected = (demos: CollectedDemo[]) => {
    if (running) {
      return
    }

    running = true
    const navRecords = navConfig(demos, root)
    const sidebarRecords = sidebarConfig(demos, root)

    resolvedRecords = resolveRecords(navRecords, sidebarRecords)
    running = false
  }

  const getResolvedRecords = () => resolvedRecords

  return {
    collectors: resolveCollectors(collectors),
    onDemosCollected,
    getResolvedRecords,
    theme,
    pageAnchor,
    markdownOptions,
    dist,
    root,
  }
}

function mergeConfig(config?: archiveConfig): Required<archiveConfig> {
  const { navConfig, sidebarConfig, theme, pageAnchor, collectors, markdownOptions, dist, root } = config ?? {}
  const resolvedRoot = root ?? process.cwd()

  return {
    navConfig: navConfig ?? (() => undefined),
    sidebarConfig: sidebarConfig ?? ((demos, root) => getSidebarRecordsByDirectory(demos, root)),
    collectors: collectors ?? [],
    theme: theme ?? 'default',
    pageAnchor: pageAnchor ?? true,
    markdownOptions: markdownOptions ?? {},
    dist: dist ?? 'dist',
    root: resolvedRoot,
  }
}

export function findUp(cwd: string = process.cwd(), fileNames: string[]): string | undefined {
  let { root } = parse(cwd)
  let dir = cwd

  // Fix for windows, waiting for pathe to fix this: https://github.com/unjs/pathe/issues/5
  if (root === '' && dir[1] === ':') {
    root = dir.substring(0, 2)
  }

  while (dir !== root) {
    for (const fileName of fileNames) {
      const searchPath = join(dir, fileName)
      if (existsSync(searchPath)) {
        return searchPath
      }
    }
    dir = dirname(dir)
  }
}
