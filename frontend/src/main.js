import { createApp } from 'vue'
import router from "./router";

import App from './App.vue'
import NavBar from './components/NavBar.vue'

const app = createApp(App)
app.component('nav-bar', NavBar)
app.use(router)
app.mount('#app')