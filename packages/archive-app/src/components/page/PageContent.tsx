/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ResolvedItem } from '@idux/archive-vite-plugin'

import { type PropType, defineComponent, inject, ref } from '@idux/archive-app/vue'

import BaseContent from './BaseContent'
import { useAsyncProp } from '../../composables/useAsyncProp'
import { pageContextToken } from '../../token'
import Instance from '../Instance'

export default defineComponent({
  props: {
    visible: { type: Boolean, required: true },
    pageImport: { type: Function as PropType<() => Promise<{ default: ResolvedItem }>>, required: true },
  },
  setup(props) {
    const dataRef = useAsyncProp(props, 'pageImport')
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
            <Instance instance={dataRef.value?.default.instance} onInstanceMountedChange={onInstanceMountedChange} />,
          ],
        )}
      </BaseContent>
    )
  },
})
