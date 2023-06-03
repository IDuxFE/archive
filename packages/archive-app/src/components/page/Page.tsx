/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import {
  type DefineComponent,
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
} from 'vue'

import { findOverflowParent } from '@idux/archive-utils/client'
import { IxAffix } from '@idux/components/affix'
import { IxMessageProvider } from '@idux/components/message'
import { IxRadioGroup } from '@idux/components/radio'

import { type InnerPageProps, innerPageProps } from '@idux/archive-types'

import { usePageRender } from '../../composables/usePageRender'
import { appContextToken, breakpointsToken, pageContextToken, themeToken } from '../../token'
import DemosContent from './DemosContent'
import PageContent from './PageContent'

export default defineComponent({
  props: innerPageProps,
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
    const demoImports = computed(() => props.pageData.demoImports)
    const pageImport = computed(() => props.pageData.import)

    const tabs = computed(() => props.pageData.tabs?.filter(tab => tab.import || tab.demoImports) ?? [])
    const tabsRadioData = computed(() =>
      tabs.value.map(tab => ({
        label: tab.name,
        value: tab.id,
      })),
    )
    const showTabs = computed(() => !demoImports.value?.length && tabs.value.length > 0)

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

      if (demoImports.value) {
        children = <DemosContent visible={true} demoImports={demoImports.value} />
      } else if (pageImport.value) {
        children = <PageContent visible={true} pageImport={pageImport.value} />
      } else {
        children = tabs.value.map(tab => {
          const visible = activeTabId.value === tab.id
          if (tab.demoImports) {
            return <DemosContent v-show={visible} visible={visible} demoImports={tab.demoImports} />
          }

          return <PageContent v-show={visible} visible={visible} pageImport={tab.import!} />
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
}) as DefineComponent<InnerPageProps>
