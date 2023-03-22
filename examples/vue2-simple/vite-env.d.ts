/// <reference types="vite/client" />

declare module 'archive-page:*.vue' {
  import type { ArchiveLoaderVue2ResolvedItem } from '@idux/archive-loader-vue2'

  const item: ArchiveLoaderVue2ResolvedItem
  export default item
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
