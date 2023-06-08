<script lang="ts" setup>
import { computed } from 'vue'
const props = withDefaults(
  defineProps<{
    numberCtr: number
    stringCtr: string
    booleanCrt: boolean
    inputCtr: string
    textareaCtr: string
    jsonCtr: object
    selectCtr: 'option1' | 'option2'
    radioCtr: 'option1' | 'option2'
    checkboxCtr: ('value1' | 'value2')[]
  }>(),
  {
    numberCtr: 1,
    stringCtr: 'string',
    booleanCrt: true,
    inputCtr: 'input',
    textareaCtr: 'line1 \n line2',
    jsonCtr: () => ({
      a: 1,
      b: 2,
    }),
    selectCtr: 'option1',
    radioCtr: 'option2',
    checkboxCtr: () => ['value1'],
  },
)

const controlValueText = computed(() =>
  JSON.stringify(
    {
      numberCtr: props.numberCtr,
      stringCtr: props.stringCtr,
      booleanCrt: props.booleanCrt,
      inputCtc: props.inputCtr,
      textareaCtr: props.textareaCtr,
      jsonCtr: props.jsonCtr,
      selectCtr: props.selectCtr,
      radioCtr: props.radioCtr,
      checkboxCtr: props.checkboxCtr,
    },
    undefined,
    2,
  ),
)
</script>
<template>
  <pre>{{ controlValueText }}</pre>
</template>
<archive-meta lang="json">
{
  "title": "control demo",
  "description": "description",
  "controls": {
    "inputCtr": {
      "type": "input"
    },
    "selectCtr": {
      "type": "select",
      "label": "select",
      "description": "this is select control",
      "options": [
        {
          "label": "option1",
          "value": "option1"
        },
        {
          "label": "option2",
          "value": "option2"
        }
      ]
    },
    "textareaCtr": {
      "type": "textarea"
    },
    "jsonCtr": {
      "type": "json"
    },
    "radioCtr": {
      "type": "radio",
      "options": [
        {
          "label": "option1",
          "value": "option1"
        },
        {
          "label": "option2",
          "value": "option2"
        }
      ]
    },
    "checkboxCtr": {
      "type": "checkbox",
      "options": [
        {
          "label": "value1",
          "value": "value1"
        },
        {
          "label": "value2",
          "value": "value2"
        }
      ]
    }
  }
}
</archive-meta>
