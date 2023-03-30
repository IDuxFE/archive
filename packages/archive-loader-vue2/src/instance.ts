/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import Vue from 'vue'

import { type ArchiveLoaderVue2Instance, instanceCompProps } from './types'

export default Vue.extend({
  name: 'ArchiveInstance',
  props: instanceCompProps,
  watch: {
    instance(instance, formerInstance) {
      this.mountInstance(instance, formerInstance)
    },
  },
  mounted() {
    this.mountInstance(this.instance)
  },
  methods: {
    async mountInstance(instance: ArchiveLoaderVue2Instance, formerInstance?: ArchiveLoaderVue2Instance) {
      while (!this.$el) {
        await this.$nextTick()
      }

      this.onInstanceMountedChange?.(false)
      await formerInstance?.unmount()

      const observer = new MutationObserver(mutations => {
        if (mutations.findIndex(m => m.type === 'childList') > -1 && this.$el?.children.length) {
          this.onInstanceMountedChange?.(true)
          observer.disconnect()
        }
      })
      observer.observe(this.$el, {
        childList: true,
        subtree: false,
        attributes: false,
      })

      await instance.mount(this.$el as HTMLElement)
    },
  },
  render: h => h('div'),
})
