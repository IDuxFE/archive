
const { readFileSync, writeFileSync } = require('node:fs')
const { resolve, dirname } = require('node:path')

const vueTemplateIndexPath = resolve(dirname(require.resolve('vue-template-compiler')), 'index.js')


writeFileSync(vueTemplateIndexPath, readFileSync(vueTemplateIndexPath, 'utf-8').replace('vueVersion && vueVersion !== packageVersion', 'false'))