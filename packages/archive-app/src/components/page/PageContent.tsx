/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ResolvedItem } from '@idux/archive-vite-plugin'

import { type PropType, defineComponent, inject, ref } from 'vue'

import { Instance } from '@idux/archive-loader-vue/client'

import { useArchiveItemImport } from '../../composables/useArciveItemImport'
import { pageContextToken } from '../../token'
import BaseContent from './BaseContent'

export default defineComponent({
  props: {
    visible: { type: Boolean, required: true },
    pageImport: { type: Function as PropType<() => Promise<{ default: ResolvedItem }>>, required: true },
  },
  setup(props) {
    const resolvedItem = useArchiveItemImport(props, 'pageImport')
    const {
      render,
      renderers: { pageContent: pageContentRenderer },
    } = inject(pageContextToken)!

    const instanceMounted = ref(false)
    const onInstanceMountedChange = (mounted: boolean) => {
      instanceMounted.value = mounted
    }

    return () => (
      <BaseContent visible={props.visible && instanceMounted.value}>
        {render(
          {
            demos: [],
            visibleDemoIds: [],
            setVisibleDemoIds: () => {},
          },
          pageContentRenderer,
          () => [
            <Instance instance={resolvedItem.value?.instance} onInstanceMountedChange={onInstanceMountedChange} />,
          ],
        )}
      </BaseContent>
    )
  },
})
