import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/ClientView/home_view.vue'  
import Register from '../views/ClientView/register.vue'
import Login from '../views/ClientView/login.vue'  
import songDetail from '../views/ClientView/song_detail.vue'
import forgotPassword from '../views/ClientView/forgot_password.vue'
import resetPassword from '../views/ClientView/confirm_reset_password.vue'
import testplayer from '../views/ClientView/testplayer.vue'
const routes = [
  {
    path: '/',
    name: 'login.vue',
    component: Login
  },
  {
    path: '/home',
    name: 'home.view',
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
  },
  {
    path: '/forgotpassword',
    name: 'forgot.password',
    component: forgotPassword
  },
  {
    path: '/auth/action',
    name: 'resetPassword.view',
    component: resetPassword
  },
  {
    path: '/testplayer',
    name: 'testplayer.view',
    component: testplayer
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
