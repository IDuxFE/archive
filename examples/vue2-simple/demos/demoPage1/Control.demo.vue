<script lang="ts">
export default {
  props: {
    numberCtr: { type: Number, default: 1 },
    stringCtr: { type: String, default: 'string' },
    booleanCrt: { type: Boolean, default: true },
    inputCtr: { type: String, default: 'input' },
    textareaCtr: { type: String, default: 'line1 \n line2' },
    jsonCtr: {
      type: Object,
      default: () => ({
        a: 1,
        b: 2,
      }),
    },
    selectCtr: { type: String, default: 'option1' },
    radioCtr: { type: String, default: 'option2' },
    checkboxCtr: { type: Array, default: () => ['value1'] },
  },

  computed: {
    controlValueText() {
      return JSON.stringify(
        {
          numberCtr: this.numberCtr,
          stringCtr: this.stringCtr,
          booleanCrt: this.booleanCrt,
          inputCtc: this.inputCtr,
          textareaCtr: this.textareaCtr,
          jsonCtr: this.jsonCtr,
          selectCtr: this.selectCtr,
          radioCtr: this.radioCtr,
          checkboxCtr: this.checkboxCtr,
        },
        undefined,
        2,
      )
    },
  },
}
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
