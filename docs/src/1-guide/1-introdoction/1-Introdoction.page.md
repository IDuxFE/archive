# 介绍

## Idux Archive 是什么？

Idux Archive 为组件文档静态站点快速搭建而生，可用于搭建组件库或业务组件交互式文档。

## 特性

- 基于 Idux Design 以及组件
- 完全使用 TypeScript 开发，提供完整的类型定义
- Monorepo 管理模式：`archive`, `archive-app`, `archive-collector-collector`...
- 为你的项目创建交互式文档
- 维护基于 vue 的 demo 以及任何其他类型的 demo
- 高可扩展性
- 深度自定义
- 强大的主题自定义

## 相关 npm 包

- `@idux/archive`: 核心模块
- `@idux/archive-app`: web UI应用，同时暴露了 app 用到的 vue，用于用户自定义渲染
- `@idux/archive-vite-plugin`: 负责项目 demo 收集和管理的 vite 插件
- `@idux/archive-vite-markdown-plugin`: 用于将 `.md` 文件加载为 vue 组件的 vite 插件
- `@idux/archive-page-loader-vue`: 用于将 vue 组件 加载作为文档页面的模块
- `@idux/archive-collector-vue`: 用于收集和处理 vue SFC 格式的 demo
- `@idux/archive-utils`: 工具函数集合
- `@idux/archive-types`: 公共类型

## 如何贡献

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/IDuxFE/archive/pulls)

在任何形式的参与前，请先阅读 [贡献者文档](https://github.com/IDuxFE/archive/blob/main/Contributing.zh.md)。如果你希望参与贡献，欢迎 [Pull Request](https://github.com/IDuxFE/archive/pulls)，或给我们 [报告 Bug](https://github.com/IDuxFE/archive/issues)。


## 💖 特别感谢

许多功能的灵感来自于以下优秀的开源项目。  

- [Histoire](https://github.com/histoire-dev/histoire)
- [VitePress](https://github.com/vuejs/vitepress)

## 🚩 开发计划

- 添加 Vue2 demo 的加载器
- API 文档自动生成
- 更好的热更新支持
- 更好的日志
- 引入插件体系用来封装常用的自定义内容
- 引入控件方便在 Web UI 上交互式得修改 demo 参数
- 支持文档元信息提取以及搜索
- Typescript 格式配置文件支持
- 支持编写文档首页

## ☀️ 授权协议

[MIT](https://github.com/IDuxFE/archive/blob/main/LICENSE) © 2022-present IDuxFE