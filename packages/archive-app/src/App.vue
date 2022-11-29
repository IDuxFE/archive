<template>
  <div class="archive-app__root-wrapper">
    <HeaderVue></HeaderVue>
    <div class="archive-app__main-wrapper">
      <IxRow>
        <IxCol xs="0" sm="7" md="6" lg="5" xl="4" class="archive-app__main-menu">
          <IxAffix v-if="!breakpoints.xs" style="width: unset">
            <SidbarVue class="archive-app__sidebar"></SidbarVue>
          </IxAffix>
          <IxDropdown v-else>
            <IxIcon name="menu"></IxIcon>
            <template #overlay>
              <HeaderNavigationVue />
            </template>
          </IxDropdown>
        </IxCol>
        <IxCol xs="24" sm="17" md="18" lg="19" xl="20" class="main-content">
          <router-view></router-view>
        </IxCol>
      </IxRow>
    </div>
  </div>
  <div v-if="breakpoints.xs" class="archive-app__root-drawer">
    <div class="archive-app__root-drawer__handle" @click="isDrawerOpen = !isDrawerOpen">
      <IxIcon name="menu-fold"></IxIcon>
    </div>
    <IxDrawer
      v-model:visible="isDrawerOpen"
      class="archive-app__root-drawer"
      :closable="false"
      placement="start"
      :width="200"
    >
      <SidbarVue></SidbarVue>
    </IxDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { appContextToken } from './token'

import HeaderNavigationVue from './components/layout/HeaderNavigation.vue'
import HeaderVue from './components/layout/Header.vue'
import SidbarVue from './components/layout/Sidebar.vue'

const { breakpoints } = inject(appContextToken)!
const isDrawerOpen = ref(false)
</script>
