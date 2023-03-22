import mountOptions from 'virtual:archive-app-mount-options'

import { createAllPageComponent } from '../dist/createAllPageComponent.js'

import '../dist/themes/seer/page.css'

export const pages = createAllPageComponent(mountOptions)
export const navRecords = mountOptions.navRecords
