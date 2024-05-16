import { createRouter, createWebHistory } from 'vue-router'
import firebase from '../firebase.js'
import HomeView from '../views/ClientView/home_view.vue'  
import Register from '../views/ClientView/register.vue'
import Login from '@/views/ClientView/login.vue'  
import songDetail from '../views/ClientView/song_detail.vue'
import forgotPassword from '../views/ClientView/forgot_password.vue'
import resetPassword from '../views/ClientView/confirm_reset_password.vue'
import errorPage from '../views/ClientView/error_page.vue'
import profileUser from '../views/ClientView/profile_user.vue'
import payment from '../views/ClientView/payment.vue'
import musicUploadManagerment from '../views/ClientView/music-upload-managerment.vue'
import searchTrackArtistsAlbums from '../views/ClientView/search_track_artists_albums.vue'
import upgradePackage from '@/views/ClientView/upgrade-package.vue'
import trackManagerment from '@/views/ClientView/track-managerment.vue'
import audioSocial from '@/views/ClientView/audio-social.vue'
import artistAllbums from '@/views/ClientView/artist-allbums.vue'
import paymentResult from '@/views/ClientView/payment-result.vue'
import playList from '@/views/ClientView/playlist.vue'
import profileSocial from '@/views/ClientView/profile-social.vue'
const routes = [
  {
    path: '/',
    name: 'login.view',
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
    path: '/songDetail/',
    name: 'songdetail.list',
    component: songDetail
  },
  {
    path: '/artistAllbums',
    name: 'artistAllbums',
    component: artistAllbums
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: playList
  },
  {
    path: '/forgotpassword',
    name: 'forgot.password',
    component: forgotPassword,
    meta :{
      ignoreAuth: true
    }
  },
  {
    path: '/deeplinks/action/',
    name: 'resetPassword.view',
    component: resetPassword,
    meta :{
      ignoreAuth: true
    }
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
  {
    path: '/payment',
    name: 'payment',
    component: payment
  },
  {
    path: '/upgradePackage:',
    name: 'upgradePackage',
    component: upgradePackage
  },
  {
    path: '/musicUploadManagerment',
    name: 'musicUpload',
    component: musicUploadManagerment
  },
  {
    path: '/trackManagerment',
    name: 'trackManagerment',
    component: trackManagerment
  },
  {
    path: '/paymentResult',
    name: 'paymentResult',
    component: paymentResult
  },
  {
    path: '/audioSocial',
    name: 'audioSocial',
    component: audioSocial
  },
  {
    path: '/profileSocial',
    name: 'profileSocial',
    component: profileSocial
  },
]

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

