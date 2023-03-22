import mountOptions from 'virtual:archive-app-mount-options'

import { createAllPageComponent } from '../dist/createPageComponent.js'

import '../dist/themes/default/page.css'

export const pages = createAllPageComponent(mountOptions)
export const navRecords = mountOptions.navRecords
