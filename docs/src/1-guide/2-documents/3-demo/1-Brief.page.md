<script setup>
  import { createComponent } from '@idux/archive-loader-vue/client'
  import { createDemoInstance } from '@idux/archive-app/components'

  import sourceCodeDemoItem from 'archive-demo:@demos/SourceCode.vue'
  import dependenciesDemoItem from 'archive-demo:@demos/Dependencies.vue'
  import controlDemoItem from 'archive-demo:@demos/Control.vue'

  const SourceCodeDemo = createComponent(createDemoInstance(sourceCodeDemoItem))
  const DependenciesDemo = createComponent(createDemoInstance(dependenciesDemoItem))
  const ControlDemo = createComponent(createDemoInstance(controlDemoItem))
</script>

# Demo编写简介

Idux Archive 底层通过 vite 插件 `@idux/archive-vite-plugin` 配合多个Loader支持不同类型的实例加载，作为页面或者demo，因此可以支持不同框架的 demo。

详情参考：[Loader 相关内容](/loader/Brief/)

## Demo 特性

### 源码展示

通过对应loader的处理，可以支持demo源码的展示。

<SourceCodeDemo style="width: 960px" />

### 源码依赖文件

源码不是唯一的，可以将依赖文件的源码一同展示，依赖文件的配置可以参考不同loader的配置内容。

<DependenciesDemo style="width: 960px" />

### 控件

Demo 默认支持交互式控件，原理是控制 demo 组件暴露的参数。

支持不同配置的控件，例如 `input`，`number`，`select`，`radio` 等，详细的配置需要参考不同loader的配置内容。

<ControlDemo style="width: 960px" />

除了基础提供的 vue3 和 vue2 的Loader，也可以自定义Loader来支持基于不同框架的demo与页面, 详情请查看 [Loader](/loader/Brief/)