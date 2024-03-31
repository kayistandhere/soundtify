import { createRouter, createWebHistory } from 'vue-router'
import authStore from '../store/authStore.js'
import firebase from '../firebase.ts'
import HomeView from '../views/ClientView/home_view.vue'  
import Register from '../views/ClientView/register.vue'
import Login from '../views/ClientView/login.vue'  
import songDetail from '../views/ClientView/song_detail.vue'
import forgotPassword from '../views/ClientView/forgot_password.vue'
import resetPassword from '../views/ClientView/confirm_reset_password.vue'
import errorPage from '../views/ClientView/error_page.vue'
import profileUser from '../views/ClientView/profile_user.vue'
import searchTrackArtistsAlbums from '../views/ClientView/search_track_artists_albums.vue'

const routes = [
  {
    path: '/',
    name: 'login.vue',
    component: Login,
    meta :{
      ignoreAuth: true
    },
  },
  {
    path: '/home',
    name: 'home.view',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register.view',
    component: Register,
    meta :{
      ignoreAuth: true
    }
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
    path: '/profile',
    name: 'editProfile.view',
    component: profileUser
  },
  {
    path: '/search',
    name: 'search.view',
    component: searchTrackArtistsAlbums
  },
  {
    path: '/error',
    name: 'NotFound',
    component: errorPage
  },
]
// router.beforeEach(async (to, from) => {
//   return {name : 'register'}
// })

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  // Should update method to check user logged in from auth_store
  if(firebase.auth.currentUser == null) {
    /// Prevent user routing to other page without ignoreAuth
    if(to.meta.ignoreAuth) {
      next();
      return;
    }
    next({path: "/"})
    return;
  } else {
    //Implement case to prevent routing if the user is logged in.
    switch(to.path) {
      case "/":
      case "/register":
        next({path: "/home"});
      break;
      default: next();
    }
  }
});
export default router

