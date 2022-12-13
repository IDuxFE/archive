import { buildPages } from '../build.js'

export async function buildCommand () {
  await buildPages()

  // @TODO remove when https://github.com/vitejs/vite/issues/6815 is fixed
  process.exit(0)
}
