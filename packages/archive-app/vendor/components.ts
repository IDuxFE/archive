/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import Demo from '../src/components/demo'

export * from '@idux/components/tooltip'
export * from '@idux/components/button'
export * from '@idux/components/icon'
export { createDemoInstance } from '@idux/archive-app/createDemoInstance' // eslint-disable-line import/no-unresolved

export const DemoComp = Demo
export type { DemoProps } from '../src//components/demo/Demo'
