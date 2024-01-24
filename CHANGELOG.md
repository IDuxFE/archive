# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.5.0](https://github.com/IDuxFE/archive/compare/v0.4.2...v0.5.0) (2024-01-24)

### Bug Fixes

- **app:** remove button font-size reset style ([258a08b](https://github.com/IDuxFE/archive/commit/258a08b0a6bc6e0184ad7a8a46fddc2850e2dd0f))

### Features

- **app:** export all idux components ([43b36fc](https://github.com/IDuxFE/archive/commit/43b36fcd1e388deaca57f6b1f1ec5985e6c1badf))

## [0.4.2](https://github.com/IDuxFE/archive/compare/v0.4.0...v0.4.2) (2023-06-29)

### Bug Fixes

- add base url config support ([a10e0ba](https://github.com/IDuxFE/archive/commit/a10e0ba3344c6f9826a7116c6e63698829a07d0b))
- **app,vite-plugin:** hmr runtime in undefined under production ([31f97c3](https://github.com/IDuxFE/archive/commit/31f97c302d8536cf23d6d80161bfd4da5c9be5f9))
- **app:** components shouldn't export vue3 related component ([30fed20](https://github.com/IDuxFE/archive/commit/30fed20fe6a7bc6085648b086a74d9ef471d78f6))
- **app:** default logo link should be baseUrl ([850cc22](https://github.com/IDuxFE/archive/commit/850cc221c3f90cc444218055de0b03c6d82639d1))
- **app:** remove unecessary reset style ([a344375](https://github.com/IDuxFE/archive/commit/a344375bc22a59b706cb8f4ec248ac179b49a162))
- **archive, archive-app:** group type navRecord should have path ([a2988b4](https://github.com/IDuxFE/archive/commit/a2988b417329bf2f2904f5437d49af3823d480ec))
- **loader-vue,loader-vue2:** sourceCode lang should be infered ([0acb9a0](https://github.com/IDuxFE/archive/commit/0acb9a02657109ffdf2c036d71d7d560873357ee))
- **markdown-plugin,app:** markdown code copy not working ([754173f](https://github.com/IDuxFE/archive/commit/754173f392ed899763f69e7a8aab9db9cf5a1c88))

## [0.4.1](https://github.com/IDuxFE/archive/compare/v0.4.0...v0.4.1) (2023-06-20)

### Bug Fixes

- **app,vite-plugin:** hmr runtime in undefined under production ([31f97c3](https://github.com/IDuxFE/archive/commit/31f97c302d8536cf23d6d80161bfd4da5c9be5f9))
- **app:** components shouldn't export vue3 related component ([30fed20](https://github.com/IDuxFE/archive/commit/30fed20fe6a7bc6085648b086a74d9ef471d78f6))
- **archive, archive-app:** group type navRecord should have path ([a2988b4](https://github.com/IDuxFE/archive/commit/a2988b417329bf2f2904f5437d49af3823d480ec))

# [0.4.0](https://github.com/IDuxFE/archive/compare/v0.3.1...v0.4.0) (2023-06-08)

### Bug Fixes

- **app:** instance build entry error ([806059a](https://github.com/IDuxFE/archive/commit/806059adcf058ec4f6a6ad941b2fc95a375cdd44))
- **archive:** nav record id shoud be encoded ([759d37b](https://github.com/IDuxFE/archive/commit/759d37bdfbf477e1354f3f6ebc0cc4d664b07a89))
- **archive:** setup file import script should be stringified ([52452ae](https://github.com/IDuxFE/archive/commit/52452ae471453d0b78b0a4c87349ab04f46c1f9e))
- cjs didn't work, now `type: module` isn't necessary anymore ([30c8389](https://github.com/IDuxFE/archive/commit/30c83898e921a44d308692193c1b785688c2c650))
- error with the src path on windows ([63ccaca](https://github.com/IDuxFE/archive/commit/63ccaca8862129248ca9aeaaabca4c88e5a530c2))
- update `scripts` filed ([0a1793a](https://github.com/IDuxFE/archive/commit/0a1793a4a8f9746cce3d68b47c680758ea51891a))
- **vue2-loader,vue3-loader:** instance setData not working ([eaea990](https://github.com/IDuxFE/archive/commit/eaea990b3e5db376fb6c6ae3a7de74690925e16e))

### Features

- add component props control ([7fb62bb](https://github.com/IDuxFE/archive/commit/7fb62bb9c882d66a1732c3f24bb241f4f169ba00))
- add controls for demo, supporting auto type detection ([6a80fb0](https://github.com/IDuxFE/archive/commit/6a80fb096a4c2beceff617f28efaf4575409f3db))
- add icon for demo control ([f6dd390](https://github.com/IDuxFE/archive/commit/f6dd3906a42866af9286433e3854b95909bd8db8))
- **app:** add demo instance and component support ([fc0370c](https://github.com/IDuxFE/archive/commit/fc0370cb208159f06badfceb784620109f5698dc))
- **archive-app:** add 4 control type ([89d52cc](https://github.com/IDuxFE/archive/commit/89d52cc14d648843d9d2ca1cc44fdc0b650ddfa1))
- **loader-vue,loader-vue2:** add instance component ([33f6754](https://github.com/IDuxFE/archive/commit/33f67540dc909cf86d9bfc91f05e264d36860cd3))
- **vite-plugin:** add hmr runtime support ([399101c](https://github.com/IDuxFE/archive/commit/399101c02f38b2b6f00074a65dc6dbb7483df698))

## [0.3.2](https://github.com/IDuxFE/archive/compare/v0.3.1...v0.3.2) (2023-03-30)

### Bug Fixes

- **app:** instance build entry error ([806059a](https://github.com/IDuxFE/archive/commit/806059adcf058ec4f6a6ad941b2fc95a375cdd44))
- **archive:** nav record id shoud be encoded ([759d37b](https://github.com/IDuxFE/archive/commit/759d37bdfbf477e1354f3f6ebc0cc4d664b07a89))
- **archive:** setup file import script should be stringified ([52452ae](https://github.com/IDuxFE/archive/commit/52452ae471453d0b78b0a4c87349ab04f46c1f9e))
- cjs didn't work, now `type: module` isn't necessary anymore ([30c8389](https://github.com/IDuxFE/archive/commit/30c83898e921a44d308692193c1b785688c2c650))

## [0.3.1](https://github.com/IDuxFE/archive/compare/v0.3.0...v0.3.1) (2023-03-22)

### Bug Fixes

- archive app options hmr support ([1c2edb7](https://github.com/IDuxFE/archive/commit/1c2edb7b5dc5791e13de43d68e2bf97680f5e59a))
- **loader-vue,loader-vue2:** export item types ([5357cd7](https://github.com/IDuxFE/archive/commit/5357cd7b8a95c3a8e8eeb098aa89162395f8667f))
- update roadmap ([ab02211](https://github.com/IDuxFE/archive/commit/ab02211ca1805685775c5d041b372fdd5c74c612))

# 0.3.0 (2023-03-22)

### Bug Fixes

- **app:** anchor not parsed in AsyncContent ([97126ac](https://github.com/IDuxFE/archive/commit/97126acc40bddf4421b97cbca41cd676d3411982))
- **app:** duplicate nav record id cauase route key error ([0b96259](https://github.com/IDuxFE/archive/commit/0b962590131ce6fcb691d85e1352cdf0d4bd9495))
- **app:** extract component to fix virtual module import error ([c8f7910](https://github.com/IDuxFE/archive/commit/c8f7910fe37c3f6c6a9f6ae5248e3a02f105fb1d))
- **app:** pageComponent should use external vue defineComponent ([fc8b007](https://github.com/IDuxFE/archive/commit/fc8b007c99c93ddd47d195765bdb684cd22e3ffb))
- **archive:** archive app should be excluded from optimized deps ([10c7586](https://github.com/IDuxFE/archive/commit/10c758648068565c62523f66b49538891e277e1e))
- **archive:** exclude archive app from optimize dep ([941ce03](https://github.com/IDuxFE/archive/commit/941ce0341ad795c34d21781511cdfa7ae640f9c8))
- **archive:** vite optimizeDeps entries spelling error ([e7414f2](https://github.com/IDuxFE/archive/commit/e7414f2b7a8c3f2019e2b0a3c5b3fc6182003f23))
- extract shard types to prevent circular dep ([b37d0dc](https://github.com/IDuxFE/archive/commit/b37d0dc5f498150167605add2882e3805bb73862))
- fix eslint errors ([a01f394](https://github.com/IDuxFE/archive/commit/a01f39458f9b70599509f33e818161f90503c14f))
- markdown theme file import ([23393e5](https://github.com/IDuxFE/archive/commit/23393e53a61cc5965010a660f2fc118c4b43d1b2))
- **page-loader-vue:** fix package.json utils dep ([a6c85c3](https://github.com/IDuxFE/archive/commit/a6c85c325fd7981f5fda4eef37854d3e92c83b0f))
- **utils:** getNavFromDirectory ignorePatterns not working ([23445cf](https://github.com/IDuxFE/archive/commit/23445cfd0c27ad27c6839ba0bafa1ebd7d74e56c))
- **vite-md-plugin:** component name error under vue2 loader ([45bda33](https://github.com/IDuxFE/archive/commit/45bda33d5df0a47b425e7c4be14d994d76cafba5))

### Features

- add @idux-archive/utils repo ([956e5a1](https://github.com/IDuxFE/archive/commit/956e5a118a03609edc1b3e6447407903c8e61e1d))
- add loader for vue2 ([ef2c416](https://github.com/IDuxFE/archive/commit/ef2c4165dae90ee7d50333abb84aa7595dcca032))
- add page loader to resolve vue pages ([3c83dbb](https://github.com/IDuxFE/archive/commit/3c83dbbbc3c11527fd1edc19bd4c7a1b2c4c546a))
- **app:** change app layout to ix-pro-layout ([e23f1f5](https://github.com/IDuxFE/archive/commit/e23f1f595c907880767c333ab8ea94ff807d28ed))
- **app:** extract css vars and add more renderers ([7ee2868](https://github.com/IDuxFE/archive/commit/7ee28684ac3e1864702345678c491662873d1c2d))
- **app:** rewrite archive-app to fit new vite plugin ([7cd4102](https://github.com/IDuxFE/archive/commit/7cd4102bdd1c6d448288a4e6dc99481ad692bfd0))
- **archive-app:** support component or md as page ([d5803a8](https://github.com/IDuxFE/archive/commit/d5803a841ef63cfd213b730f56afab4ccb797aad))
- **archive:** rewrite archive core ([108a49c](https://github.com/IDuxFE/archive/commit/108a49c4957080f162a664c6a32ed51ac64d9bd5))
- remove collectors and page-loaders, replace them with newly written loaders ([9d7a1ce](https://github.com/IDuxFE/archive/commit/9d7a1ce04a4bc11b50601b106cef98ee85aaa069))
- support setupFile ([5b9fe15](https://github.com/IDuxFE/archive/commit/5b9fe152d0d0dcd313987970e26b2f093974fdb9))
- **vite-plugin:** rewrite vite plugin ([0d033f8](https://github.com/IDuxFE/archive/commit/0d033f855b32f24980db0481f3c7a04818470e63))

## [0.2.5](https://github.com/IDuxFE/archive/compare/v0.2.4...v0.2.5) (2022-12-19)

### Bug Fixes

- **app:** anchor not parsed in AsyncContent ([97126ac](https://github.com/IDuxFE/archive/commit/97126acc40bddf4421b97cbca41cd676d3411982))
- **app:** pageComponent should use external vue defineComponent ([fc8b007](https://github.com/IDuxFE/archive/commit/fc8b007c99c93ddd47d195765bdb684cd22e3ffb))
- **archive:** exclude archive app from optimize dep ([941ce03](https://github.com/IDuxFE/archive/commit/941ce0341ad795c34d21781511cdfa7ae640f9c8))
- fix eslint errors ([a01f394](https://github.com/IDuxFE/archive/commit/a01f39458f9b70599509f33e818161f90503c14f))

# 0.2.0 (2022-12-18)

### Bug Fixes

- markdown theme file import ([23393e5](https://github.com/IDuxFE/archive/commit/23393e53a61cc5965010a660f2fc118c4b43d1b2))

### Features

- add @idux-archive/utils repo ([956e5a1](https://github.com/IDuxFE/archive/commit/956e5a118a03609edc1b3e6447407903c8e61e1d))
- add page loader to resolve vue pages ([3c83dbb](https://github.com/IDuxFE/archive/commit/3c83dbbbc3c11527fd1edc19bd4c7a1b2c4c546a))
- **app:** change app layout to ix-pro-layout ([e23f1f5](https://github.com/IDuxFE/archive/commit/e23f1f595c907880767c333ab8ea94ff807d28ed))
- **app:** extract css vars and add more renderers ([7ee2868](https://github.com/IDuxFE/archive/commit/7ee28684ac3e1864702345678c491662873d1c2d))
- **archive-app:** support component or md as page ([d5803a8](https://github.com/IDuxFE/archive/commit/d5803a841ef63cfd213b730f56afab4ccb797aad))
- support setupFile ([5b9fe15](https://github.com/IDuxFE/archive/commit/5b9fe152d0d0dcd313987970e26b2f093974fdb9))

# 0.1.0 (2022-12-15)

### Bug Fixes

- markdown theme file import ([23393e5](https://github.com/IDuxFE/archive/commit/23393e53a61cc5965010a660f2fc118c4b43d1b2))

### Features

- add @idux/archive-utils repo ([956e5a1](https://github.com/IDuxFE/archive/commit/956e5a118a03609edc1b3e6447407903c8e61e1d))
- **app:** change app layout to ix-pro-layout ([e23f1f5](https://github.com/IDuxFE/archive/commit/e23f1f595c907880767c333ab8ea94ff807d28ed))
- **app:** extract css vars and add more renderers ([7ee2868](https://github.com/IDuxFE/archive/commit/7ee28684ac3e1864702345678c491662873d1c2d))
- **archive-app:** support component or md as page ([d5803a8](https://github.com/IDuxFE/archive/commit/d5803a841ef63cfd213b730f56afab4ccb797aad))
- support setupFile ([5b9fe15](https://github.com/IDuxFE/archive/commit/5b9fe152d0d0dcd313987970e26b2f093974fdb9))
