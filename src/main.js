import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/style.css'
import { createPinia , mapActions } from 'pinia'
import global from './util/global.js'
import draggable from 'vuedraggable'
import { onAuthStateChanged } from 'firebase/auth'
import firebase from './firebase.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
onAuthStateChanged(firebase.auth, (user) => {
    const pinia = createPinia();
    createApp(App)
        .use(pinia)
        .use(VueAxios, axios)
        .use(global)
        .use(draggable)
        .use(router).mount('#app')
})
