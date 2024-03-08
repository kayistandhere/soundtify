import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/ClientView/home_view.vue'  
import Register from '../views/ClientView/register.vue'
import Login from '../views/ClientView/login.vue'  
import songDetail from '../views/ClientView/song_detail.vue'
const routes = [
  {
    path: '/',
    name: 'login.vue',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register.view',
    component: Register
  },
  {
    path: '/songDetail',
    name: 'songdetail.list',
    component: songDetail
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
