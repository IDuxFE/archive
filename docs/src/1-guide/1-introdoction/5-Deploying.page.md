# 部署

基于上一章[本地调试与打包](/guide/introdoction/DevAndBuilding)，生成的文件可以使用诸如 `nginx` 之类的 web 服务器部署，也可以部署到 **GitHub Pages** 等，这一章将会解决如何部署文档应用到服务端的问题。

部署目标的根路径通常不一定是 `/`, 可以通过修改 `vite.config.ts` 中的 `base` 来修改

## 部署到 GitHub Pages

1. 修改 vite 配置文件，`vite.config.ts`，设置 `base` 为 GitHub 仓库的名字。例如将应用部署到 `http://idux.github.io/docs`，则需要修改 `base` 为 `/docs`。
2. 在 `.github/workflows` 中创建 `deploy.yml` 文件，包含以下内容：

```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: latest

      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: pnpm
      - run: pnpm install

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: /dist
          # cname: example.com # 设置自定义域名
```

详情请查看 [Github Pages](https://docs.github.com/en/pages) 相关文档

