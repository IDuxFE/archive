import type { CollectedDemo, SourceCode } from './types'
import type { SetOptional } from 'type-fest'

// export const BASIC_HMR_SCRIPT = `;if(__import_meta_hot__){__import_meta_hot__.accept(() => {__import_meta_hot__.invalidate()})}`
export const BASIC_HMR_SCRIPT = ''

export function defaultDemoScriptGenerator(demo: CollectedDemo): string {
  const _demo = { ...demo } as SetOptional<CollectedDemo, 'component' | 'sourceCodes'>
  delete _demo.component
  delete _demo.sourceCodes

  const sourceCodes = demo.sourceCodes.map(
    sourceCode => `{
    ${JSON.stringify(
      (() => {
        const _sourceCode = { ...sourceCode } as SetOptional<SourceCode, 'code' | 'parsedCode'>
        delete _sourceCode.code
        delete _sourceCode.parsedCode
        return _sourceCode
      })(),
    ).slice(1, -1)},
    code: ${sourceCode.code},
    parsedCode: ${sourceCode.parsedCode}
  }`,
  )
  return `{
    ${JSON.stringify(_demo).slice(1, -1)},
    component: ${demo.component},
    sourceCodes: [${sourceCodes.join(',')}]
  }`
}

export function genDemoDataScript(demo: CollectedDemo, genDemoScript: (demo: CollectedDemo) => string): string {
  return `export default ${genDemoScript(demo)}${BASIC_HMR_SCRIPT}`
}

export function genAllDemoDataScript(
  allDemos: CollectedDemo[],
  genDemoScript: (demo: CollectedDemo) => string,
): string {
  return `export default {${allDemos
    .map(demo => `${JSON.stringify(demo.id)}: ${genDemoScript(demo)}`)
    .join(',')}}${BASIC_HMR_SCRIPT}`
}
