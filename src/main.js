import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/style.css'
import { createPinia , mapActions } from 'pinia'
import store from './store/index.js'
import global from './util/global.js'
import draggable from 'vuedraggable'
import { onAuthStateChanged } from 'firebase/auth'
import firebase from './firebase.js'
onAuthStateChanged(firebase.auth, (user) => {
    const pinia = createPinia();
    createApp(App)
        .use(store)
        .use(pinia)
        .use(global)
        .use(draggable)
        .use(router).mount('#app')
})
