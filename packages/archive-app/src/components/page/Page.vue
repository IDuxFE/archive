<template>
  <IxMessageProvider>
    <article class="archive-app__page">
      <section class="archive-app__page__header">
        <h1 class="archive-app__page__title">{{ title }}</h1>
        <div class="archive-app__page__description"> {{ description }} </div>
        <IxRadioGroup v-if="showTabs" v-model:value="selectedTab" :dataSource="tabsRadioData" size="lg" buttoned />
      </section>
      <section v-if="pageDemos" class="archive-app__page__content">
        <DemosContent :visible="!!pageDemos" :demos="pageDemos" />
      </section>
      <section v-else class="archive-app__page__content">
        <template v-for="tab in tabs">
          <DemosContent
            v-if="tab.demos"
            v-show="selectedTab === tab.id"
            :visible="selectedTab === tab.id"
            :demos="tab.demos"
          />
          <AsyncContent
            v-else
            v-show="selectedTab === tab.id"
            :visible="selectedTab === tab.id"
            :component="tab.component!"
          />
        </template>
      </section>
    </article>
  </IxMessageProvider>
</template>
<script setup lang="ts">
import type { ResolvedPageData, PageAnchorOptions } from '../../types'
import { pageContextToken } from '../../token'
import { computed, provide, ref, watch } from 'vue'

import DemosContent from './DemosContent.vue'
import AsyncContent from './AsyncContent.vue'

const props = defineProps<{
  pageData: ResolvedPageData
  pageAnchor: PageAnchorOptions | boolean
}>()

provide(pageContextToken, {
  pageAnchor: props.pageAnchor,
})

const title = computed(() => props.pageData.title)
const description = computed(() => props.pageData.description)
const pageDemos = computed(() => props.pageData.demos)

const tabs = computed(() => props.pageData.tabs?.filter(tab => tab.component || tab.demos) ?? [])
const tabsRadioData = computed(() =>
  tabs.value.map(tab => ({
    label: tab.name,
    value: tab.id,
  })),
)
const showTabs = computed(() => !pageDemos.value?.length && tabs.value.length > 0)

const selectedTab = ref(tabs.value[0]?.id)
watch(
  () => props.pageData,
  () => {
    selectedTab.value = tabs.value[0]?.id
  },
)
</script>
