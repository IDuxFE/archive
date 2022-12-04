import { createServer } from 'vite'
import { createDevViteConfig } from './vite'
import { loadConfig, resolveConfig } from './config'

export async function serve(port?: number) {
  const { config, configFilePath } = await loadConfig()

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
