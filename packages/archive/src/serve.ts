/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import { type ViteDevServer, createServer } from 'vite'

import { loadConfig, resolveConfig } from './config'
import { createDevViteConfig } from './vite'

export interface ServeOptions {
  port?: number
  root?: string
}

export async function serve(options: ServeOptions): Promise<{
  server: ViteDevServer
  configFilePath: string | undefined
  close: () => Promise<void>
}> {
  const { port, root } = options
  const { config, configFilePath } = await loadConfig(root)

  console.log('config loaded', configFilePath)
  const resolvedConfig = resolveConfig(config)
  const viteConfig = await createDevViteConfig(resolvedConfig)

  console.log('vite config loaded')

  const server = await createServer(viteConfig)

  console.log('server created')
  await server.listen(port ?? server.config.server.port)

  async function close() {
    await server.close()
  }

  return {
    server,
    configFilePath,
    close,
  }
}
