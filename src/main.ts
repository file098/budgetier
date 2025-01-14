import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import WaveUI from 'wave-ui'

const app = createApp(App)

app.use(WaveUI, {})
app.use(createPinia())
app.use(router)

app.mount('#app')
