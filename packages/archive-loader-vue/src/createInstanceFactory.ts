/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { ArchiveLoaderVueInstance, ArchiveLoaderVueSetup, EmitItem } from './types'
import type { InstanceProp, InstancePropTypes, Fn } from '@idux/archive-vite-plugin'

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
  type Ref,
  ref,
  h,
} from 'vue'

import { isArray, isFunction, isNil, isPlainObject, capitalize } from 'lodash-es'

export interface InstanceData<P = any> {
  key: string | number | symbol
  el: HTMLElement
  props: P | undefined
  component: DefineComponent<P>
  emitsEvents: EmitItem
}

export type InstanceRef = Record<InstanceData['key'], Ref<HTMLElement & Record<string, Fn>>>;

export type InstanceFactory = <P extends object>(component: DefineComponent<P>) => ArchiveLoaderVueInstance<P>

function getEmitName(funName: string): string {
  if (!funName) {
    return '';
  }
  return `on${capitalize(funName)}`;
}

function mergePropsAndEmitsEvents(props: InstanceData['props'], emitsEvents: EmitItem) {
  const result: InstanceData['props'] = { ...props };

  for (const key in emitsEvents) {
    if (result[key]) {
      const value = result[key];
      if (Array.isArray(value)) {
        value.push(emitsEvents[key]);
      } else {
        result[key] = [value, emitsEvents[key]];
      }
    } else {
      result[key] = emitsEvents[key];
    }
  }

  return result;
}

export function createInstanceFactory(setup?: ArchiveLoaderVueSetup): InstanceFactory {
  let instanceMountApp: App | null = null
  let instanceDataKeySeed = 0

  const instanceDataRefs = ref<Set<InstanceData>>(new Set())

  const instanceRefs = {} as InstanceRef

  const renderInstances = () => {
    return [...instanceDataRefs.value.values()].map(({ key, el, component, props, emitsEvents }) => {
      const instanceRef = ref(null) as unknown as Ref<HTMLElement & Record<string, Fn>>
      const vnode = createVNode(
        Teleport as unknown as VNodeTypes,
        { to: el, key },
        {
          default: () => [
            h(component, {
              ref: instanceRef,
              ...mergePropsAndEmitsEvents(props, emitsEvents),
            }),
          ],
        },
      )
      instanceRefs[key] = instanceRef
      return vnode
    })
  };

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

  const mountInstance = <P>(el: HTMLElement, component: DefineComponent<P>, data?: P, emitsEvents?: EmitItem): InstanceData<P> => {
    mountApp()

    const instanceData = reactive({ component, props: data ?? {}, key: `instance-${instanceDataKeySeed++}`, el, emitsEvents })
    instanceDataRefs.value.add(instanceData as InstanceData<any>)

    return instanceData as InstanceData<P>
  }

  const unmountInstance = (instanceData?: InstanceData) => {
    instanceData && instanceDataRefs.value.delete(instanceData)
  }

  return <P extends object>(component: DefineComponent<P>): ArchiveLoaderVueInstance<P> => {
    let instanceData: InstanceData<P>
    const emitsEvents = {} as EmitItem;
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
        instanceData = mountInstance(el, markRaw(component), data, emitsEvents)

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
      on(EvtName: string, fn: Fn) {
        emitsEvents[getEmitName(EvtName)] = fn;
      },
      getExpose(funName: string) {
        const instanceRef = instanceRefs[instanceData.key];
        if (!instanceRef) {
          return;
        }
        return instanceRef.value?.[funName];
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
