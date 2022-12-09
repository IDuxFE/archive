type TreeTypeData<V extends Record<string, any> = Record<string, any>, C extends string = 'children'> = {
  [key in C]?: TreeTypeData<V, C>[]
} & V

export function traverseTree<V extends TreeTypeData<Record<string, any>, C>, C extends string>(
  data: V[],
  childrenKey: C,
  fn: (item: V, parents: V[]) => void,
  traverseStrategy: 'pre' | 'post' = 'pre',
): void {
  const traverse = (_data: V[], parents: V[]) => {
    _data.forEach(item => {
      traverseStrategy === 'pre' && fn(item, parents)
      if (item[childrenKey]) {
        traverse(item[childrenKey]!, [item, ...parents])
      }
      traverseStrategy === 'post' && fn(item, parents)
    })
  }

  traverse(data, [])
}

export function mapTree<
  V extends TreeTypeData<Record<string, any>, C>,
  R extends TreeTypeData<Record<string, any>, C>,
  C extends string,
>(data: V[], childrenKey: C, fn: (item: V, parents: V[]) => R | undefined): R[] {
  const map = (_data: V[], parents: V[]) => {
    return _data
      .map(item => {
        const mappedItem = fn(item, parents)
        if (!mappedItem) {
          return
        }

        if (item[childrenKey]) {
          const mappedChildren = map(item[childrenKey]!, [item, ...parents])
          mappedItem[childrenKey] = mappedChildren as R[C]
        }

        return mappedItem
      })
      .filter(Boolean) as R[]
  }
  return map(data, [])
}

export function normalizePath(path: string) {
  return path.replace(/\/(\/)+/g, '/')
}

export function genObjectScript(obj: Record<string, any>, modifiers?: Record<string, string>) {
  const temp = { ...obj }
  const modifierKeys = Object.keys(modifiers ?? {})

  modifierKeys.forEach(key => {
    delete temp[key]
  })

  try {
    const jsonStr = JSON.stringify(temp)

    if (!modifierKeys.length) {
      return jsonStr
    }

    const innerJsonStr = jsonStr.slice(1, -1)
    return `{${innerJsonStr}${innerJsonStr ? ',' : ''}${modifierKeys.map(key => `${key}: ${modifiers![key]}`)}}`
  } catch (err) {
    // TODO log
    return '{}'
  }
}
