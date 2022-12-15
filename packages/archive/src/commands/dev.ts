/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import chokidar from 'chokidar'
import pc from 'picocolors'

import { type ServeOptions, serve } from '../serve'

export async function devCommand(options: ServeOptions): Promise<void> {
  let stop: (() => Promise<void>) | null

  async function start() {
    const { server, configFilePath, close } = await serve(options)
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

  async function restart(source: string) {
    if (stop) {
      console.log(pc.blue(`${source} config changed, restarting...`))
      await stop()
      stop = null // Don't call stop again until new start() is done
      stop = await start()
    }
  }

  stop = await start()
}
