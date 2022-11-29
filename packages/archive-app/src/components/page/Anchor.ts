import { type PropType, defineComponent, h, VNodeChild } from 'vue'
import type { AnchorData } from '../../types'

import { IxAnchor, IxAnchorLink } from '@idux/components/anchor'

export default defineComponent({
  name: 'Anchor',
  props: {
    data: {
      type: Array as PropType<AnchorData[]>,
      required: true,
    },
  },
  setup(props) {
    const renderLinks = (data: AnchorData[]): VNodeChild => {
      return data.map(item => {
        return h(IxAnchorLink, { title: item.title, href: item.href }, { default: () => renderLinks(item.children)! })
      })
    }

    return () => h(IxAnchor, { offsetTop: 16 }, { default: () => renderLinks(props.data)! })
  },
})
