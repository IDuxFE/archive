/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

import type { DemoControl, ResolvedDemoItem } from '@idux/archive-types'

import { type PropType, defineComponent } from 'vue'

import { IxIcon } from '@idux/components/icon'
import { IxTooltip } from '@idux/components/tooltip'

import BoolCtrl from './BoolCtrl'
import CheckboxCtr from './CheckboxCtr'
import InputCtrl from './InputCtrl'
import JsonCtrl from './JsonCtrl'
import NumberCtrl from './NumberCtrl'
import RadioCtr from './RadioCtr'
import SelectCtrl from './SelectCtrl'
import TextareaCtrl from './TextareaCtrl'
import { defineCtrComponent } from './defineCtrComponent'

export default defineComponent({
  props: {
    instance: { type: Object as PropType<ResolvedDemoItem<Record<string, any>>['instance']>, required: true },
    controls: { type: Array as PropType<DemoControl[]>, required: true },
  },
  setup(props) {
    const prefixCls = 'archive-app-demo__control'

    function renderControl(control: DemoControl) {
      const ControlComponent = (() => {
        switch (control.type) {
          case 'boolean':
            return BoolCtrl
          case 'input':
            return InputCtrl
          case 'number':
            return NumberCtrl
          case 'textarea':
            return TextareaCtrl
          case 'select':
            return SelectCtrl
          case 'radio':
            return RadioCtr
          case 'checkbox':
            return CheckboxCtr
          case 'json':
            return JsonCtrl
          default:
            break
        }
      })() as ReturnType<typeof defineCtrComponent<any, any>>

      return ControlComponent ? <ControlComponent control={control} instance={props.instance} /> : undefined
    }

    return () => (
      <div class={prefixCls}>
        {props.controls?.map(item => {
          const controlNode = renderControl(item)
          return (
            controlNode && (
              <div class={`${prefixCls}__item`}>
                <div class={`${prefixCls}__item__label`} title={item.label ?? item.key}>
                  <span>{item.label ?? item.key}: </span>
                  {item.description && (
                    <IxTooltip title={item.description} class={`${prefixCls}__item__tooltip`} placement="rightStart">
                      <IxIcon class={`${prefixCls}__item__tooltip-icon`} name="info-circle" />
                    </IxTooltip>
                  )}
                </div>
                <div class={`${prefixCls}__item__control`}>{renderControl(item)}</div>
              </div>
            )
          )
        })}
      </div>
    )
  },
})
