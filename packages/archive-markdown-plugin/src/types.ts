export interface PageData {
  relativePath: string
  title: string
  titleTemplate?: string | boolean
  description: string
  headers: Header[]
  frontmatter: Record<string, any>
  //   lastUpdated?: number
}

export interface Header {
  /**
   * The level of the header
   *
   * `1` to `6` for `<h1>` to `<h6>`
   */
  level: number
  /**
   * The title of the header
   */
  title: string
  /**
   * The slug of the header
   *
   * Typically the `id` attr of the header anchor
   */
  slug: string
  /**
   * Link of the header
   *
   * Typically using `#${slug}` as the anchor hash
   */
  link: string
  /**
   * The children of the header
   */
  children: Header[]
}

export type CleanUrlsMode = 'disabled' | 'without-subfolders' | 'with-subfolders'

export type HeadConfig = [string, Record<string, string>] | [string, Record<string, string>, string]

export const EXTERNAL_URL_RE = /^[a-z]+:/i
