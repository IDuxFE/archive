const { readFileSync, readdirSync } = require('node:fs')
const { basename, resolve } = require('path')

const { defineConfig } = require('@idux/archive')

const { createArchiveVuePageLoader, createArchiveVueDemoLoader } = require('@idux/archive-loader-vue')
const { getNavFromDirectory } = require('@idux/archive-utils')

module.exports = defineConfig({
  root: resolve(__dirname, './src'),
  theme: {
    themeStyle: 'default',
    layout: {
      type: 'both',
      siderCollapsable: false,
    },
    page: {
      anchorMaxLevel: 6,
    },
  },
  navConfig(root) {
    const pathPageMetaMap = new Map()
    const idPageMetaMap = new Map()

    const _getDirMeta = dir => {
      let meta
      try {
        const { id, name, title, description } = JSON.parse(readFileSync(resolve(dir, './meta.json'), 'utf-8'))
        meta = {
          idx: getIndex(dir),
          id: id ?? getBaseName(dir),
          description: description ?? '',
        }
        meta.name = name ?? meta.id
        meta.title = title ?? meta.name
      } catch (err) {
        const id = getBaseName(dir)

        meta = {
          id,
          idx: getIndex(dir),
          name: id,
          title: id,
          description: '',
        }
      }

      return meta
    }
    const _getMdMeta = file => {
      const fileBaseName = getBaseName(file)
      let title = fileBaseName
      try {
        title = readFileSync(file, 'utf-8').match(/#\s*(.+)\n/)[1]
      } catch (err) {
        // nothing
      }

      return {
        id: fileBaseName.slice(0, fileBaseName.indexOf('.')),
        idx: getIndex(file),
        name: title,
        title: '',
        description: '',
      }
    }
    const getMetaInfo = (file, isDir) => {
      if (pathPageMetaMap.has(file)) {
        return pathPageMetaMap.get(file)
      }

      let meta
      if (isDir) {
        meta = _getDirMeta(file)
      } else if (file.endsWith('.md')) {
        meta = _getMdMeta(file)
      }

      idPageMetaMap.set(meta.id, meta)
      pathPageMetaMap.set(file, meta)
      return meta
    }

    const navRecords = getNavFromDirectory(root, {
      getPageInfo(file, isDir) {
        const { id, name, title, description } = getMetaInfo(file, isDir)

        let demos = []
        let tabs = []
        if (isDir) {
          const files = readdirSync(file)
          demos = files
            .filter(file => /\.demo\.vue$/.test(file))
            .map(demo => resolve(file, demo))
            .sort((demo1, demo2) => {
              const getIdx = demo => Number(demo.split('-')[1])
              return getIdx(demo1) - getIdx(demo2)
            })

          tabs = files
            .filter(file => /\.tab\.md$/.test(file))
            .map(tab => {
              const src = resolve(file, tab)
              const tabMeta = _getMdMeta(src)

              return {
                ...tabMeta,
                src,
              }
            })
            .sort((tab1, tab2) => {
              return tab1.idx - tab2.idx
            })

          if (demos.length) {
            tabs.push({
              id: 'demos',
              name: '示例',
              demos,
            })
          }
        }

        return {
          id,
          name,
          title,
          description,
          tabs: tabs.length ? tabs : undefined,
          demos: !tabs.length ? demos : undefined,
        }
      },
      mapRecords(_, records) {
        return records.map(record => record.type === 'sub' ? {...record, type: 'group'} : record)
      }
    })

    return navRecords
  },
  pageLoaders: [createArchiveVuePageLoader()],
  demoLoaders: [createArchiveVueDemoLoader()],
})

function getBaseName(dir) {
  return basename(dir).replace(/^([0-9]*)-/, '')
}

function getIndex(dir) {
  const _idx = basename(dir).match(/^([0-9]*)-/)?.[1]
  return _idx ? Number(_idx) : 0
}
