import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/style.css'
import Vuex from 'vuex'
import store from './store/index.js'
import authStore from './store/authStore.js'
import global from './util/global.js'
import draggable from 'vuedraggable'
import { onAuthStateChanged } from 'firebase/auth'
import firebase from './firebase.js'


/// Ensure that the firebase has fully finished initialization.
onAuthStateChanged(firebase.auth, (user) => {
    createApp(App)
        .use(store)
        .use(Vuex)
        .use(global)
        .use(authStore)
        .use(draggable)
        .use(router).mount('#app')
})
