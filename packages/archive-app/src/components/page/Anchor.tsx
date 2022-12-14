/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { AnchorData } from '../../types'

import { type PropType, computed, defineComponent, inject, onMounted, ref } from 'vue'

import { type AnchorInstance, IxAnchor, IxAnchorLink } from '@idux/components/anchor'

import { pageContextToken } from '../../token'
import { findOverflowParent } from '../../utils'

export default defineComponent({
  name: 'Anchor',
  props: {
    data: {
      type: Array as PropType<AnchorData[]>,
      required: true,
    },
  },
  setup(props) {
    const { headerFixed, headerHeight } = inject(pageContextToken)!
    const renderLinks = (data: AnchorData[]) => {
      return data.map(item => (
        <IxAnchorLink title={item.title} href={item.href}>
          {renderLinks(item.children)}
        </IxAnchorLink>
      ))
    }

    const anchorRef = ref<AnchorInstance>()
    const target = ref<HTMLElement>()

    const offsetTop = computed(() => (headerFixed.value ? headerHeight.value + 16 : 16))

    onMounted(() => {
      target.value = findOverflowParent(anchorRef.value?.$el)
    })

    return () => (
      <IxAnchor ref={anchorRef} offsetTop={offsetTop.value} target={target.value}>
        {renderLinks(props.data)}
      </IxAnchor>
    )
  },
})
