/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, never>, Record<string, never>, any>
  export default component
}

declare module '*.svg' {
  const svg: string
  export default svg
}

declare module '__External_Vue__' {
  export * from 'vue'
}

declare module 'external:@idux/archive-loader-vue/client' {
  export * from '@idux/archive-loader-vue/client'
}

declare module 'archive-demo:all-data' {
  import type { ResolvedDemoItem } from '@idux/archive-types'
  const demos: Record<string, ResolvedDemoItem>
  export default demos
}

declare module 'archive-demo:*' {
  import type { ResolvedDemoItem } from '@idux/archive-types'
  const demo: ResolvedDemoItem
  export default demo
}
