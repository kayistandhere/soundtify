import { defineStore, acceptHMRUpdate } from 'pinia'
import { onAuthStateChanged } from 'firebase/auth';
export  const useAuthStoreStore = defineStore('authStore', {
 state: () => ({
  isLoggedIn: false,
  user: null,
  count : 0,
 }),
 setup(){
  this.onAuthStateChanged();
 },
 getters: {
  doubleCount(state) {
    return state.count * 2
  },
 },
 actions: {
  login(state, user) {
    state.isLoggedIn = true;
    state.user = user;
  },
  logout(state) {
    state.isLoggedIn = false;
    state.user = null;
  },
  onAuthStateChanged() {
    onAuthStateChanged((user) => {
      if(user){
        this.$patch({
          user
        });
        state.user = user;
        state.isLoggedIn = true;
      }else {
        this.$patch({
          user
        });
        state.isLoggedIn = false;
      }
    })
  }
 },
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useAuthStoreStore, import.meta.hot))
}
