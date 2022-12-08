import type { ResolvedPageData, PageAnchorOptions, AppSetupOptions, Renderers } from '../../types'
import { pageContextToken } from '../../token'
import { type PropType, type VNodeChild, defineComponent, computed, provide, ref, watch, onMounted, VNode } from 'vue'

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
    options: Object as PropType<AppSetupOptions>,
    renderers: Object as PropType<Renderers>
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
      options: props.options ?? {},
      renderers: props.renderers ?? {},
    })

    const title = computed(() => props.pageData.title)
    const description = computed(() => props.pageData.description)
    const pageDemoIds = computed(() => props.pageData.demoIds)

    const tabs = computed(() => props.pageData.tabs?.filter(tab => tab.component || tab.demoIds) ?? [])
    const tabsRadioData = computed(() =>
      tabs.value.map(tab => ({
        label: tab.name,
        value: tab.id,
      })),
    )
    const showTabs = computed(() => !pageDemoIds.value?.length && tabs.value.length > 0)

    const activeTabId = ref(tabs.value[0]?.id)
    const setActiveTabId = (tab: string) => {
      activeTabId.value = tab
    }
    watch(
      () => props.pageData,
      () => {
        activeTabId.value = tabs.value[0]?.id
      },
    )

    const headerCls = computed(() => [
      'archive-app__page__header',
      headerFixed.value ? 'archive-app__page__header--fixed' : undefined,
    ])

    const renderHeader = () => {
      const children = [
        <h1 class="archive-app__page__title">{title.value}</h1>,
        <p class="archive-app__page__description">{description.value}</p>,
        showTabs.value && (
          <IxRadioGroup
            value={activeTabId.value}
            dataSource={tabsRadioData.value}
            size="lg"
            mode="primary"
            gap={4}
            buttoned
            onUpdate:value={setActiveTabId}
          />
        ),
      ].filter(Boolean) as VNode[]
      const contentNode = (
        <section ref={headerRef} class={headerCls.value}>
          {props.renderers?.pageHeader
            ? props.renderers.pageHeader(
                {
                  title: title.value,
                  description: description.value,
                  tabs: tabs.value,
                  activeTabId: activeTabId.value,
                  setActiveTabId,
                },
                children,
              )
            : children}
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
      if (pageDemoIds.value) {
        children = <DemosContent visible={true} demoIds={pageDemoIds.value} />
      } else {
        children = tabs.value.map(tab => {
          const visible = activeTabId.value === tab.id
          if (tab.demoIds) {
            return <DemosContent v-show={visible} visible={visible} demoIds={tab.demoIds} />
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
