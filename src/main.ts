import '@/assets/styles/index.css'
import '@fontsource-variable/inter'
import '@/component-variants'

import { extendIcons as extendIconsNext } from '@wisemen/vue-core-components'
import { createApp as createVueApp } from 'vue'

import App from '@/App.vue'
import { configureZod } from '@/configs/zod.config.ts'
import { icons } from '@/icons/icons.ts'
import { i18nPlugin } from '@/plugins/i18n.plugin.ts'
import { piniaPlugin } from '@/plugins/pinia.plugin.ts'
import { routerPlugin } from '@/plugins/router.plugin.ts'
import { vueQueryPlugin } from '@/plugins/vueQuery.plugin.ts'

extendIconsNext(icons)
configureZod()

const app = createVueApp(App)

app.use(i18nPlugin)
app.use(piniaPlugin)
app.use(routerPlugin)
app.use(vueQueryPlugin)

app.mount('#app')
