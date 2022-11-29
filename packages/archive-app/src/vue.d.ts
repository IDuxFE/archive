declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'virtual:archive-demo-all' {
  import type { DemoInstance } from '@idux/archive-plugin'
  const demos: Record<string, DemoInstance>
  export default demos
}

declare module 'virtual:archive-demo-all-data' {
  import type { ResolvedDemo } from '@idux/archive-plugin'
  const demos: Record<string, ResolvedDemo>
  export default demos
}