/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ArchiveLoaderVueInstance, ArchiveLoaderVueSetup } from './types'
import type { InstanceProp, InstancePropTypes } from '@idux/archive-vite-plugin'

import {
  type App,
  type DefineComponent,
  type Prop,
  type PropType,
  Teleport,
  type VNodeTypes,
  createApp,
  createVNode,
  markRaw,
  reactive,
  ref,
} from 'vue'

import { isArray, isFunction, isNil, isPlainObject } from 'lodash-es'

export interface InstanceData<P = any> {
  key: string | number | symbol
  el: HTMLElement
  props: P | undefined
  component: DefineComponent<P>
}

export type InstanceFactory = <P extends object>(component: DefineComponent<P>) => ArchiveLoaderVueInstance<P>

export function createInstanceFactory(setup?: ArchiveLoaderVueSetup): InstanceFactory {
  let instanceMountApp: App | null = null
  let instanceDataKeySeed = 0

  const instanceDataRefs = ref<Set<InstanceData>>(new Set())

  const renderInstances = () => {
    return [...instanceDataRefs.value.values()].map(({ key, el, component, props }) =>
      createVNode(
        Teleport as unknown as VNodeTypes,
        { to: el, key },
        {
          default: () => [createVNode(component, props)],
        },
      ),
    )
  }

  const mountApp = () => {
    if (instanceMountApp) {
      return
    }

    instanceMountApp = createApp({
      render: () => (setup?.renderApp ? setup.renderApp(renderInstances()) : renderInstances()),
    })
    setup?.setupApp?.(instanceMountApp)

    const div = document.createElement('div')
    document.body.appendChild(div)
    instanceMountApp.mount(div)
  }

  const mountInstance = <P>(el: HTMLElement, component: DefineComponent<P>, data?: P): InstanceData<P> => {
    mountApp()

    const instanceData = reactive({ component, props: data ?? {}, key: `instance-${instanceDataKeySeed++}`, el })
    instanceDataRefs.value.add(instanceData as InstanceData<any>)

    return instanceData as InstanceData<P>
  }

  const unmountInstance = (instanceData?: InstanceData) => {
    instanceData && instanceDataRefs.value.delete(instanceData)
  }

  return <P extends object>(component: DefineComponent<P>): ArchiveLoaderVueInstance<P> => {
    let instanceData: InstanceData<P>
    const watchCallbacks = new Set<() => void>()
    const runCallbacks = () => {
      watchCallbacks.forEach(cb => {
        cb()
      })
    }

    function watchData(callback: (data: P | undefined) => void): () => void
    function watchData<K extends keyof P>(key: K, callback: (value: P[K] | undefined) => void): () => void
    function watchData<K extends keyof P>(
      key: K | ((data: P | undefined) => void),
      callback?: (value: P[K] | undefined) => void,
    ): () => void {
      let cb: () => void
      if (isFunction(key)) {
        cb = () => {
          key(instanceData.props)
        }
      } else {
        cb = () => {
          callback?.(instanceData.props?.[key])
        }
      }

      watchCallbacks.add(cb)

      return () => {
        watchCallbacks.delete(cb)
      }
    }

    function parsePropType(type?: PropType<unknown> | true | null): InstancePropTypes | undefined {
      if (!type || type === true) {
        return
      }

      const _type = isArray(type) ? type[0] : type

      switch (_type) {
        case Boolean:
          return 'boolean'

        case String:
          return 'string'

        case Number:
          return 'number'

        case Object:
          return 'object'

        case Array:
          return 'array'

        default:
          return
      }
    }

    return {
      mount(el, data) {
        instanceData = mountInstance(el, markRaw(component), data)

        const instanceProps = this.getProps()

        const defaultData = instanceProps.reduce((res, control) => {
          if (!isNil(control.default)) {
            res[control.key] = control.default
          }

          return res
        }, {} as P)

        if (Object.keys(defaultData).length > 0) {
          this.setData(defaultData)
        }
      },
      unmount() {
        unmountInstance(instanceData)
      },
      getProps() {
        if (!('props' in component)) {
          return []
        }

        const props = component.props as Record<string, Prop<any>> | undefined
        const instanceProps: InstanceProp<P>[] = []

        props &&
          Object.entries(props).forEach(([key, prop]) => {
            let propType: InstanceProp<P>['type'] | undefined
            let defaultValue
            if (isPlainObject(prop) && 'type' in prop) {
              propType = parsePropType(prop.type) as InstanceProp<P>['type']
              defaultValue = isFunction(prop.default) ? prop.default() : prop.default
            } else {
              propType = parsePropType(prop as PropType<unknown>) as InstanceProp<P>['type']
            }

            if (propType) {
              instanceProps.push({
                key: key as keyof P,
                type: propType,
                default: defaultValue,
              })
            }
          })

        return instanceProps
      },
      getData() {
        return instanceData.props
      },
      setData(data) {
        if (!data) {
          instanceData.props = undefined
        }

        const _props = { ...(instanceData.props ?? {}), ...data } as P
        instanceData.props = _props

        runCallbacks()
      },
      watchData,
    }
  }
}
