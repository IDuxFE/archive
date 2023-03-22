import { watch } from 'chokidar'

export function watchDir(dir: string, cb: () => void): () => void {
  const watcher = watch(dir, { ignoreInitial: true })

  watcher.on('add', cb)
  watcher.on('unlink', cb)

  return () => watcher.close()
}