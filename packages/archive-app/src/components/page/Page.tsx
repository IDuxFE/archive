/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { AppRenderers, AppSetupOptions, ResolvedAppThemeOptions, ResolvedPageData } from '@idux/archive-types'

import { findOverflowParent } from '@idux/archive-utils/client'
import { IxAffix } from '@idux/components/affix'
import { IxMessageProvider } from '@idux/components/message'
import { IxRadioGroup } from '@idux/components/radio'

import {
  type PropType,
  VNode,
  type VNodeChild,
  computed,
  defineComponent,
  inject,
  normalizeClass,
  onMounted,
  provide,
  ref,
  watch,
} from '@idux/archive-app/vue'

import { usePageRender } from '../../composables/usePageRender'
import { appContextToken, breakpointsToken, pageContextToken, themeToken } from '../../token'
import AsyncContent from './AsyncContent'
import DemosContent from './DemosContent'

export default defineComponent({
  props: {
    pageData: { type: Object as PropType<ResolvedPageData>, required: true },
    theme: { type: Object as PropType<ResolvedAppThemeOptions>, required: true },
    options: Object as PropType<AppSetupOptions>,
    renderers: Object as PropType<AppRenderers>,
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

    const appContext = inject(appContextToken, null)
    const theme = inject(themeToken)!
    const breakpoints = inject(breakpointsToken)!

    const render = usePageRender({
      theme,
      breakpoints,
      route: appContext?.route,
      activeRecords: appContext?.activeRecords,
    })

    const anchorOptions = computed(() => ({
      enabled: props.theme.page.enableAnchor,
      maxLevel: props.theme.page.anchorMaxLevel,
    }))

    const pageCls = computed(() => {
      const prefixCls = 'archive-app__page'

      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-xs`]: breakpoints.xs,
        [`${prefixCls}-sm`]: breakpoints.sm,
        [`${prefixCls}-md`]: breakpoints.md,
        [`${prefixCls}-lg`]: breakpoints.lg,
        [`${prefixCls}-xl`]: breakpoints.xl,
      })
    })

    onMounted(() => {
      if (props.theme.page.headerAffix) {
        headerAffixTarget.value = findOverflowParent(wrapperRef.value!)
      }
      headerHeight.value = headerRef.value?.getBoundingClientRect().height ?? 0
    })

    provide(pageContextToken, {
      headerFixed,
      headerHeight,
      anchorOptions,
      options: props.options ?? {},
      renderers: props.renderers ?? {},
      render,
    })

    const title = computed(() => props.pageData.title)
    const description = computed(() => props.pageData.description)
    const pageDemoIds = computed(() => props.pageData.demoIds)
    const pageComponent = computed(() => props.pageData.component)

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
      if (!title.value && !description.value && !tabs.value.length) {
        return
      }

      const contentNode = (
        <section ref={headerRef} class={headerCls.value}>
          {render(
            {
              title: title.value,
              description: description.value,
              tabs: tabs.value,
              activeTabId: activeTabId.value,
              setActiveTabId,
            },
            props.renderers?.pageHeader,
            () =>
              [
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
              ].filter(Boolean) as VNode[],
          )}
        </section>
      )

      if (props.theme.page.headerAffix) {
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
      } else if (pageComponent.value) {
        children = <AsyncContent visible={true} component={pageComponent.value} />
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
        <article ref={wrapperRef} class={pageCls.value}>
          {renderHeader()}
          {renderContent()}
        </article>
      </IxMessageProvider>
    )
  },
})
