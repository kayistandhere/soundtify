import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/sass/style.css'
import draggable from 'vuedraggable'
createApp(App)
.use(store)
.use(draggable)
.use(router).mount('#app')
