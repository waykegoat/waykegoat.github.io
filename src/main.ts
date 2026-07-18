import { createApp } from 'vue'
import '@fontsource-variable/unbounded'
import '@fontsource-variable/manrope'
import App from './App.vue'
import { router } from './router'
import './assets/styles/main.css'

createApp(App).use(router).mount('#app')
