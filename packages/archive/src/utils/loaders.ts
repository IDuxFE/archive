/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

const PAGE_LOADER_PREFIX = 'archive-page:'
const DEMO_LOADER_PREFIX = 'archive-demo:'

import type { Loader } from '@idux/archive-vite-plugin'

export function findMatchedPageLoader(src: string, loaders: Loader[]): Loader | undefined {
  return loaders.find(loader => loader.matched(src))
}

export function getImportScript(src: string, loaders: Loader[]): string | undefined {
  const loader = findMatchedPageLoader(src, loaders)

  return loader ? `() => import("${loader.prefix + src}")` : undefined
}

export function getPluginLoaders(pageLoaders: Loader[], demoLoaders: Loader[]): Loader[] {
  return [
    ...pageLoaders.map(loader => ({ ...loader, prefix: PAGE_LOADER_PREFIX })),
    ...demoLoaders.map(loader => ({ ...loader, prefix: DEMO_LOADER_PREFIX })),
  ]
}
