import { createApp } from 'vue'
import '@fontsource-variable/unbounded'
import '@fontsource-variable/manrope'
import App from './App.vue'
import { router } from './router'
import { i18n } from './i18n'
import './assets/styles/main.css'

createApp(App).use(router).use(i18n).mount('#app')
