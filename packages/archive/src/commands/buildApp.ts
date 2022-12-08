import { buildApp } from '../build.js'

export async function buildCommand () {
  await buildApp()

  // @TODO remove when https://github.com/vitejs/vite/issues/6815 is fixed
  process.exit(0)
}
