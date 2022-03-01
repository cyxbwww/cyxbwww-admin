import { createApp } from 'vue'
import App from './App.vue'
import { intialize } from '@/utils/initialize'

const app = createApp(App)

await intialize(app)

createApp(App).mount('#app')
