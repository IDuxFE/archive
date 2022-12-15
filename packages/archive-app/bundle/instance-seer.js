import mountOptions from 'virtual:archive-app-mount-options'

import { createAllPageInstance } from '../dist/index.js'

import '../dist/themes/seer/page.css'

export const instances = createAllPageInstance(mountOptions)
export const navRecords = mountOptions.navRecords
