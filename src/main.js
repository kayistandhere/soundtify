import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/style.css'
import { createPinia } from 'pinia'
import draggable from 'vuedraggable'
import { onAuthStateChanged } from 'firebase/auth'
import firebase from './firebase.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toast ,{useToast} from 'vue-toastification'
import "vue-toastification/dist/index.css";


onAuthStateChanged(firebase.auth, (user) => {
    const pinia = createPinia();
    createApp(App)
        .use(pinia)
        .use(VueAxios, axios)
        .use(draggable)
        .use(Toast)
        .use(router).mount('#app')
})
