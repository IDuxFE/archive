
import { createRequire } from 'node:module'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'

const _require = createRequire(import.meta.url)
const vueTemplateIndexPath = resolve(dirname(_require.resolve('vue-template-compiler')), 'index.js')


writeFileSync(vueTemplateIndexPath, readFileSync(vueTemplateIndexPath, 'utf-8').replace('vueVersion && vueVersion !== packageVersion', 'false'))