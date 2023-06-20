# 元信息

通过添加 `<archie-meta>...</archie-meta>` block 来设置元信息，内容为 `json` 格式。

## 元信息内容

### title

- 类型: `string`
- 是否可选: 是

demo 标题

### description

- 类型: `string`
- 是否可选: 是

demo 描述

### dependencies

- 类型: `string`
- 是否可选: 是

demo 依赖文件的路径，相对路径或者绝对路径。
如果提供依赖文件，则在源码展示中会将依赖的代码也显示出来。

### controls

- 类型: `Control[]`
- 是否可选: 是

参考 [Loader Item](/loader/Item/)

## 完整示例

```json
<archive-meta lang="json">
{
  "title": "control demo",
  "description": "description",
  "dependencies": ["./dep.vue", "./utils.ts"],
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
```