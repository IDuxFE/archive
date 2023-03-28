/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ArchiveConfig, ResolvedArchiveConfig } from '@idux/archive-types'
import type { SetOptional, SetRequired } from 'type-fest'

import { existsSync } from 'fs'
import { pathToFileURL } from 'node:url'

import { dirname, join, parse } from 'pathe'

import { getNavFromDirectory } from '@idux/archive-utils'

import { resolveRecords } from './resolveRecords'
import { watchDir } from '../utils'

export const configFileNames = ['archive.config.js']

export function defineConfig(config: ArchiveConfig): ArchiveConfig {
  return config
}

export async function loadConfig(cwd: string = process.cwd()): Promise<{
  config: ArchiveConfig | undefined
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

export function resolveConfig(config?: ArchiveConfig): ResolvedArchiveConfig {
  const { setupFile, navConfig, watchNavConfig, theme, pageLoaders, demoLoaders, markdownOptions, dist, root } =
    mergeConfig(config)

  const getResolvedRecords = () => {
    const navRecords = navConfig(root)
    return resolveRecords(navRecords, pageLoaders, demoLoaders)
  }

  return {
    setupFile,
    pageLoaders,
    demoLoaders,
    getResolvedRecords,
    watchNavConfig,
    theme,
    markdownOptions,
    dist,
    root,
  }
}

function mergeConfig(
  config?: ArchiveConfig,
): SetOptional<
  Required<ArchiveConfig & { theme: SetRequired<SetRequired<ArchiveConfig, 'theme'>['theme'], 'themeStyle'> }>,
  'setupFile'
> {
  const { setupFile, navConfig, watchNavConfig, theme, pageLoaders, demoLoaders, markdownOptions, dist, root } =
    config ?? {}
  const resolvedRoot = root ?? process.cwd()

  const defaultWatcher = navConfig
    ? () => {}
    : (update: () => void) => {
        watchDir(resolvedRoot, update)
      }

  return {
    setupFile,
    navConfig: navConfig ?? getNavFromDirectory,
    watchNavConfig: watchNavConfig ?? defaultWatcher,
    pageLoaders: pageLoaders ?? [],
    demoLoaders: demoLoaders ?? [],
    theme: {
      themeStyle: theme?.themeStyle ?? 'default',
      ...(theme ?? {}),
    },
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
