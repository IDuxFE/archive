/// <reference types="vite/client" />


declare module 'archive-page:*.vue' {
  import type { ArchiveLoaderVueResolvedItem } from '@idux/archive-loader-vue'

  const item: ArchiveLoaderVueResolvedItem
  export default item
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}