import { createServer } from 'vite'
import { createDevViteConfig } from './vite'
import { loadConfig, resolveConfig } from './config'

export async function serve(port?: number) {
  const { config, configFilePath } = await loadConfig()
  const resolvedConfig = resolveConfig(config)
  const viteConfig = await createDevViteConfig(resolvedConfig)

  const server = await createServer(viteConfig)
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
