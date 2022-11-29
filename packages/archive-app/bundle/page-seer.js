import { createAllPageComponents } from '../dist/index.js'
import mountOptions from 'virtual:archive-app-mount-options'

import '../dist/themes/seer/page.css'

export const pages = createAllPageComponents(mountOptions)
export const navRecords = mountOptions.navRecords
export const sidebarRecords = mountOptions.sidebarRecords