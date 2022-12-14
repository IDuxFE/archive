/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

import { dirname, resolve } from 'pathe'
import sade from 'sade'

const __dirname = dirname(fileURLToPath(import.meta.url))

const { version } = JSON.parse(fs.readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))

process.env.NODE_ENV = 'development'

const program = sade('archive')
program.version(version)

program
  .command('dev')
  .describe('open in your browser for development')
  .option('-p, --port <port>', 'Listening port of the server')
  .action(async options => {
    const { devCommand } = await import('./commands/dev')
    return devCommand(options)
  })

program
  .command('build')
  .describe('build the app you can deploy')
  .action(async () => {
    const { buildCommand } = await import('./commands/buildApp')
    return buildCommand()
  })

program
  .command('build:app')
  .describe('build the app you can deploy')
  .action(async () => {
    const { buildCommand } = await import('./commands/buildApp')
    return buildCommand()
  })

program
  .command('build:pages')
  .describe('build the pages components you can use in vue projects')
  .action(async () => {
    const { buildCommand } = await import('./commands/buildPages')
    return buildCommand()
  })

program.parse(process.argv)
