## 数据批量导入

满足批量录入数据的场景，是将本地数据快速维护到线上平台的一种方式。

### 使用场景

1. 业务数据的快速初始化。通过Excel完成初始数据的快速梳理，然后批量导入到平台；
2. 数据迁移。将其他平台的数据导出后，快速导入到目标系统；
3. 数据批修改和维护。通过Excel表格强大的数据编辑能力，实现大量数据的调整和修改后导入。

### 流程分析

![图片1](/assets/bulkImport/1.png)

### 方案说明

#### 步骤1：前置配置

操作方式：在页面中点击“导入”操作，即打开以下导入弹窗

| 顺序 | 名称 | 说明 |
| :-: | --- | ---- |
| 1 | 下载模板 | 方便没有模板的新用户获取模板。 |
| 2 | 上传模板 | 将填好的线下表格上传，限一份文件，再次上传则替换前一份文件。 |
| 3 | 其他设置（可选） | 可以是导入冲突的规则，也可以是其他配置。若存在默认冲突规则，也可不需要出现，视使用场景而定。 |
| 4 | 开始导入 | 在页面中点击“导入”操作，即打开以下导入弹窗。 |

![图片2](/assets/bulkImport/2.png)

#### 步骤2：导入中

在步骤1中点击“导入”按钮后，来到“导入中”。

![图片3](/assets/bulkImport/3.png)

文件类型：导入场景下的文件类型一般为.xls/.xlsx，故而提供两种标准格式的图标。使用时可根据实际情况变更。

#### 步骤3：导入结果

当导入执行完毕后，呈现以下导入结果。

| 序号 | 类型 | 说明 |
| :-: | --- | ---- |
| 1 | 支持在线编辑（推荐） | 方便没有模板的新用户获取模板。 |
| 2 | 不支持在线编辑 | 将填好的线下表格上传，限一份文件，再次上传则替换前一份文件。 |

- **类型1：支持在线编辑**

导入成功：当全部数据导入成功时（跳过/覆盖的数据不计为失败）：

![图片4](/assets/bulkImport/4.png)

**文字说明（可修改）**

若有冲突产生：N条成功，N条数据因与原信息冲突跳过；若无冲突产生：N条成功数据导入成功

**操作按钮**

若有冲突产生：①下载冲突报告 ；若无冲突产生：无操作按钮

导入完毕：当存在导入≥1条导入失败的数据时：

![图片5](/assets/bulkImport/5.png)

**文字说明（可修改）**

N条成功，N条失败，N条数据因与原信息冲突跳过

**操作按钮**

①下载错误报告（包括冲突）

导入失败：当导入成功的数据为0时：

![图片6](/assets/bulkImport/6.png)

**文字说明（可修改）**

N条失败，可能是文件格式有误，请不要删改模板列和顺序

**操作按钮**

①下载错误报告（包括冲突）

- **类型2**

导入成功：当全部数据导入成功时（跳过/覆盖的数据不计为失败）：

![图片7](/assets/bulkImport/6.png)

**文字说明（可修改）**

N条成功，N条数据因与原信息冲突跳过

**操作按钮**

若有冲突产生：①下载冲突报告 ②关闭；若无冲突产生：①关闭

导入完毕：当存在导入≥1条导入失败的数据时：

![图片8](/assets/bulkImport/6.png)

**文字说明（可修改）**

N条失败，文件格式有误，请不要删改模板列和顺序

**操作按钮**

①下载错误报告（包括冲突）②重新导入②重新导入

### 贡献人

潘媛、李亚朦、杨友皓、徐佳丽、Idux Team

```vue
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from '../src/components/HelloWorld.vue'
</script>

<template>
  <div>
    <h1>Demo111</h1>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
```

### IxButton

#### ButtonProps

> 当 `mode` 不为 `link` 时，除以下表格之外还支持原生 `button` 元素的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button)。  
> 当 `mode` 为 `link` 时，除以下表格之外还支持原生 `a` 元素的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `block` | 将按钮宽度调整为自适应其父元素的宽度 | `boolean` | - | - |- |
| `danger` | 设置危险状态 | `boolean` | - | - |- |
| `disabled` | 设置禁用状态 | `boolean` | - | - |- |
| `ghost` | 设置幽灵状态 | `boolean` | - | - |- |
| `icon` | 设置图标类型 | `string` | - | - | `loading` 为 `true` 时无效 |
| `loading` | 设置加载中状态 | `boolean` |  - | - |- |
| `mode` | 设置按钮种类 | `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` | `'default'` | - |- |
| `shape` | 设置按钮形状 | `'square' \| 'circle' \| 'round'` | - | - |- |
| `size` | 设置按钮大小 | `'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs'` | `'md'` | - |- |
| `type` | 原生 `button` 的 `type` 属性 | `'button' \| 'submit' \| 'reset'` | `'button'` | - | 参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) |

#### ButtonSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `icon` | 自定义图标 | - | - |

### IxButtonGroup

#### ButtonGroupProps

> 除以下表格之外还支持原生 `Space` 组件的[所有属性](/components/space/zh?tab=api#SpaceProps)。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `gap` | 设置按钮组的 gap 配置 | `number \| string` | `0` | - | 也就是 `Space` 的 `size` |
| `mode` | 设置组内按钮种类 | `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` | - | - |- |
| `shape` | 设置组内按钮形状 | `'circle' \| 'round'` | - | - |- |
| `size` | 设置组内按钮大小 | `'lg' \| 'md' \| 'sm'` | - | - |- |
