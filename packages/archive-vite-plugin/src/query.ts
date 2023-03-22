/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

export function parseRequest(id: string): {
  path: string
  query: Record<string, string | true>
} {
  const [path, rawQuery] = id.split(`?`, 2)
  const query = Object.fromEntries(new URLSearchParams(rawQuery)) as Record<string, string | true>
  Object.keys(query).forEach(key => {
    if (query[key] !== null) {
      query[key] = true
    }
  })

  return {
    path,
    query,
  }
}
