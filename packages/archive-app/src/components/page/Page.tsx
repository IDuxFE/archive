import type { ResolvedPageData, PageAnchorOptions } from '../../types'
import { pageContextToken } from '../../token'
import { type PropType, type VNodeChild, defineComponent, computed, provide, ref, watch, onMounted } from 'vue'

import { findOverflowParent } from '../../utils'

import { IxMessageProvider } from '@idux/components/message'
import { IxRadioGroup } from '@idux/components/radio'
import { IxAffix } from '@idux/components/affix'

import DemosContent from './DemosContent'
import AsyncContent from './AsyncContent'

export default defineComponent({
  props: {
    pageData: { type: Object as PropType<ResolvedPageData>, required: true },
    headerAffix: { type: Boolean, required: true },
    anchorOptions: { type: [Object, Boolean] as PropType<PageAnchorOptions | boolean>, required: true },
  },
  setup(props) {
    const wrapperRef = ref<HTMLElement>()
    const headerRef = ref<HTMLElement>()
    const headerAffixTarget = ref<HTMLElement>()
    const headerFixed = ref(false)
    const headerHeight = ref<number>(0)
    const handleAffixChange = (value: boolean) => {
      headerFixed.value = value
    }
    onMounted(() => {
      if (props.headerAffix) {
        headerAffixTarget.value = findOverflowParent(wrapperRef.value!)
      }
      headerHeight.value = headerRef.value?.getBoundingClientRect().height ?? 0
    })

    provide(pageContextToken, {
      headerFixed,
      headerHeight,
      anchorOptions: props.anchorOptions,
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
    const handleSelectedTabChange = (tab: string) => {
      selectedTab.value = tab
    }
    watch(
      () => props.pageData,
      () => {
        selectedTab.value = tabs.value[0]?.id
      },
    )

    const headerCls = computed(() => [
      'archive-app__page__header',
      headerFixed.value ? 'archive-app__page__header--fixed' : undefined,
    ])

    const renderHeader = () => {
      const contentNode = (
        <section ref={headerRef} class={headerCls.value}>
          <h1 class="archive-app__page__title">{title.value}</h1>
          <p class="archive-app__page__description">{description.value}</p>
          {showTabs.value && (
            <IxRadioGroup
              value={selectedTab.value}
              dataSource={tabsRadioData.value}
              size="lg"
              mode="primary"
              gap={4}
              buttoned
              onUpdate:value={handleSelectedTabChange}
            />
          )}
        </section>
      )

      if (props.headerAffix) {
        return (
          <IxAffix
            class="archive-app__page__header-affix"
            target={headerAffixTarget.value}
            onChange={handleAffixChange}
          >
            {contentNode}
          </IxAffix>
        )
      }

      return contentNode
    }

    const renderContent = () => {
      let children: VNodeChild
      if (pageDemos.value) {
        children = <DemosContent visible={true} demos={pageDemos.value} />
      } else {
        children = tabs.value.map(tab => {
          const visible = selectedTab.value === tab.id
          if (tab.demos) {
            return <DemosContent v-show={visible} visible={visible} demos={tab.demos} />
          }

          return <AsyncContent v-show={visible} visible={visible} component={tab.component!} />
        })
      }

      return <section class="archive-app__page__content">{children}</section>
    }

    return () => (
      <IxMessageProvider>
        <article ref={wrapperRef} class="archive-app__page">
          {renderHeader()}
          {renderContent()}
        </article>
      </IxMessageProvider>
    )
  },
})
