import { type PropType, computed, defineComponent, onMounted, ref, inject } from 'vue'
import type { AnchorData } from '../../types'
import { pageContextToken } from '../../token'

import { type AnchorInstance, IxAnchor, IxAnchorLink } from '@idux/components/anchor'

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
