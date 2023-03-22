/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */

export function normalizePath(path: string): string {
  return path.replace(/\/(\/)+/g, '/')
}
