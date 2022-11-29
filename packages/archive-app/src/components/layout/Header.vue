<template>
  <header class="archive-app__header">
    <IxRow class="archive-app__header__row">
      <IxCol xs="22" sm="7" md="6" lg="5" xl="4"> </IxCol>
      <IxCol xs="2" sm="17" md="18" lg="19" xl="20" class="archive-app__header__right">
        <template v-if="isXs">
          <IxDropdown>
            <IxIcon name="normal" />
            <template #overlay>
              <HeaderNavigationVue />
            </template>
          </IxDropdown>
        </template>
        <template v-else>
          <HeaderNavigationVue mode="horizontal" />
        </template>
      </IxCol>
    </IxRow>
  </header>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { appContextToken } from '../../token'

import HeaderNavigationVue from './HeaderNavigation.vue'

export default defineComponent({
  components: { HeaderNavigationVue },
  setup() {
    const { breakpoints } = inject(appContextToken)!

    const isXs = computed(() => breakpoints.xs)
    const isSm = computed(() => breakpoints.sm)
    return { isXs, isSm }
  },
})
</script>
