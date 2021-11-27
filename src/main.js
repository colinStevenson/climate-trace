import { createApp } from 'vue'
import App from './App.vue'
import { store } from '@/store/store'
import router from '@/router'
import BootstrapVue3 from 'bootstrap-vue-3'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(BootstrapVue3)

app.mount('#app')
