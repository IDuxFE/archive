import mountOptions from 'virtual:archive-app-mount-options'

import { createAllPageInstance } from '../dist/createAllPageInstance.js'

import '../dist/themes/default/page.css'

export const instances = createAllPageInstance(mountOptions)
export const navRecords = mountOptions.navRecords
