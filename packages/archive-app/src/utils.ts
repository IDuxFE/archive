type TreeTypeData<V extends Record<string, any> = Record<string, any>, C extends string = 'children'> = {
  [key in C]?: ArrayLike<TreeTypeData<V, C>>
} & V

export function traverseTree<V extends TreeTypeData<Record<string, any>, C>, C extends string>(
  data: ArrayLike<V>,
  childrenKey: C,
  fn: (item: V, parents: ArrayLike<V>) => void,
  traverseStrategy: 'pre' | 'post' = 'pre',
): void {
  const traverse = (_data: ArrayLike<V>, parents: ArrayLike<V>) => {
    for (let idx = 0; idx < _data.length; idx ++) {
      const item = _data[idx]
      traverseStrategy === 'pre' && fn(item, parents)
      if (item[childrenKey]) {
        traverse(item[childrenKey]!, [item, ...[].slice.call(parents)])
      }
      traverseStrategy === 'post' && fn(item, parents)
    }
  }

  traverse(data, [])
}

export function mapTree<
  V extends TreeTypeData<Record<string, any>, C>,
  R extends TreeTypeData<Record<string, any>, C>,
  C extends string,
>(data: V[], childrenKey: C, fn: (item: V, parents: V[]) => R): R[] {
  const map = (_data: V[], parents: V[]) => {
    return _data.map(item => {
      const mappedItem = fn(item, parents)
      if (item[childrenKey]) {
        const mappedChildren = map(item[childrenKey]!, [item, ...parents])
        mappedItem[childrenKey] = mappedChildren as R[C]
      }

      return mappedItem
    })
  }
  return map(data, [])
}
