# Demo编写简介

Idux Archive 底层通过 vite 插件 `@idux/archive-vite-plugin` 配合多个收集器收集 demo，因此可以支持不同框架的 demo。

收集到的 demo 有以下几个核心属性：

- id：即 demo ID
- filename: demo 文件名
- path: demo 文件路径
- sourceCodes: demo 源码
- component: demo 组件加载脚本

除了内置的 demo 收集器，也可以自定义收集器来支持不同格式的 demo, 详情请查看 // TODO