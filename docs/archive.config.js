import { basename, dirname, resolve } from 'path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'

import { defineConfig } from '@idux/archive'
import { createVuePageLoader } from '@idux/archive-page-loader-vue'
// import { createVueCollector } from '@idux/archive-collector-vue'
import { getNavFromDirectory } from '@idux/archive-utils'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: resolve(__dirname, './src'),
  theme: {
    themeStyle: 'default',
    layout: {
      type: 'both',
      siderCollapsable: false,
    },
    page: {
      anchorMaxLevel: 6
    }
  },
  navConfig(demos, root) {
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

    const navRecords = getNavFromDirectory(demos, root, {
      getPageInfo(file, isDir) {
        const { id, name, title, description } = getMetaInfo(file, isDir)

        return {
          id,
          name,
          title,
          description,
        }
      },
      // mapRecords: (_, records) =>
      //   records
      //     .sort((rec1, rec2) => idPageMetaMap.get(rec1.id).idx - idPageMetaMap.get(rec2.id).idx)
      //     .map(record => (record.type === 'sub' ? { ...record, type: 'group' } : record)),
    })

    // navRecords.forEach(record => {
    //   if (record.type === 'group') {
    //     record.type = 'sub'
    //   }
    // })

    return navRecords
  },
  pageLoaders: [createVuePageLoader()],
  // collectors: [createVueCollector({ matchPattern: '**/*.demo.vue' })],
})

function getBaseName(dir) {
  return basename(dir).replace(/^([0-9]*)-/, '')
}

function getIndex(dir) {
  const _idx = basename(dir).match(/^([0-9]*)-/)?.[1]
  return _idx ? Number(_idx) : 0
}
