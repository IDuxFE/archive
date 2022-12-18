/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '*.vue' {
  import type { DefineComponent } from '@idux/archive-app/vue'
  const component: DefineComponent<Record<string, never>, Record<string, never>, any>
  export default component
}

declare module '*.svg' {
  const svg: string
  export default svg
}

declare module 'virtual:archive-demo-all' {
  import type { DemoInstance } from '@idux/archive-vite-plugin'
  const demos: Record<string, DemoInstance>
  export default demos
}

declare module 'virtual:archive-demo-all-data' {
  import type { ResolvedDemo } from '@idux/archive-vite-plugin'
  const demos: Record<string, ResolvedDemo>
  export default demos
}
