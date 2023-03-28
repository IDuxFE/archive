/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

/* eslint-disable vue/no-deprecated-destroyed-lifecycle */

import Vue, { type Component } from 'vue'

const props = {
  to: {
    type: HTMLElement,
    required: true,
  },
  component: {
    type: Object,
    retuired: true,
  },
}

export default Vue.extend({
  name: 'Teleport',
  props,
  mounted() {
    if (this.moveComponent()) {
      return
    }

    const observer = new MutationObserver(() => {
      this.moveComponent()
      observer.disconnect()
    })
    observer.observe(this.$el, {
      childList: true,
      subtree: true,
    })
  },
  beforeDestroy() {
    this.removeComponent()
  },
  methods: {
    moveComponent() {
      const componentEl = (this.$refs.component as Vue)?.$el

      if (!componentEl || Array.from(this.to.childNodes).includes(componentEl)) {
        return false
      }

      const fragment = document.createDocumentFragment()
      fragment.appendChild(componentEl)

      this.to.appendChild(fragment)

      return true
    },
    removeComponent() {
      const componentEl = (this.$refs.component as Vue)?.$el

      if (!componentEl || !Array.from(this.to.childNodes).includes(componentEl)) {
        return
      }

      this.to.removeChild(componentEl)
    },
  },
  render(h) {
    const component = this.component as Component

    return h('div', { style: { display: 'none' } }, [h(component, { ref: 'component' })])
  },
})
