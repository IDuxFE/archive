import fs from 'node:fs'
import { dirname, resolve } from 'pathe'
import { fileURLToPath } from 'node:url'
import sade from 'sade'

const __dirname = dirname(fileURLToPath(import.meta.url))

const { version } = JSON.parse(fs.readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))

process.env.NODE_ENV = 'development'

const program = sade('archive')
program.version(version)

program.command('dev')
  .describe('open in your browser for development')
  .option('-p, --port <port>', 'Listening port of the server')
  .action(async (options) => {
    const { devCommand } = await import('./commands/dev.js')
    return devCommand(options)
  })

program.command('build')
  .describe('build the app you can deploy')
  .action(async () => {
    const { buildCommand } = await import('./commands/buildApp.js')
    return buildCommand()
  })

program.command('build:app')
  .describe('build the app you can deploy')
  .action(async () => {
    const { buildCommand } = await import('./commands/buildApp.js')
    return buildCommand()
  })

program.command('build:pages')
  .describe('build the pages components you can use in vue projects')
  .action(async () => {
    const { buildCommand } = await import('./commands/buildPages.js')
    return buildCommand()
  })

program.parse(process.argv)
