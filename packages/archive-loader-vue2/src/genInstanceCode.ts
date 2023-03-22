/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

export function genPrependCode(absolutePath: string, setup?: string): string {
  return [
    `import { createInstance } from '@idux/archive-loader-vue2/client'`,
    `import Component from ${JSON.stringify(absolutePath)}`,
    setup && `import setup from ${JSON.stringify(setup)}`,
  ]
    .filter(Boolean)
    .join('\n')
}

export function genInstanceCode(factoryId: string, setup?: string): string {
  return `createInstance(${JSON.stringify(factoryId)}, Component${setup ? ', setup' : ''})`
}
