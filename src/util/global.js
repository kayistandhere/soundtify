
import authStore from '../store/authStore.js'
export default {
  beforeRouteUpdate(to, from, next) {
    if (authStore.state.currentUser != null) {
      if (to.path === '/') {
        console.log("next false");
        next(false);
      
      } else {
        console.log("next");
        next();
      }
    }else{
      if(to.path === '/home'){
        from();
      }
    }
    next();
  }
}

// if(firebaseAuth.currentUser !== null){
//   const provider = new GoogleAuthProvider();
//   to();
//   return signInWithRedirect(auth, provider);
// }
