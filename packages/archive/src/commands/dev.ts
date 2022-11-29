import chokidar from 'chokidar'
import pc from 'picocolors'
import { serve } from '../server.js'

export interface DevOptions {
  port: number
}

export async function devCommand (options: DevOptions) {
  let stop: (() => Promise<void>) | null

  async function start () {
    const { server, configFilePath, close } = await serve(options.port)
    server.printUrls()

    let watcher: chokidar.FSWatcher
    if (configFilePath) {
      watcher = chokidar.watch(configFilePath, {
        ignoreInitial: true,
      })
      watcher.on('change', () => {
        restart('Vite')
      })
    }

    return async () => {
      await watcher?.close()
      await close()
    }
  }

  async function restart (source: string) {
    if (stop) {
      console.log(pc.blue(`${source} config changed, restarting...`))
      await stop()
      stop = null // Don't call stop again until new start() is done
      stop = await start()
    }
  }

  stop = await start()
}
