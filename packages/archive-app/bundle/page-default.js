import mountOptions from 'virtual:archive-app-mount-options'

import { createAllPageComponents } from '../dist/index.js'

import '../dist/themes/default/page.css'

export const pages = createAllPageComponents(mountOptions)
export const navRecords = mountOptions.navRecords
