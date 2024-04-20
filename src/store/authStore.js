import { defineStore, acceptHMRUpdate } from 'pinia'
import { onAuthStateChanged } from 'firebase/auth';
import { getUserById, getArtistById } from '@/firebase/fireStore/fireQuery';
import firebase from '@/firebase.js'
export const useAuthStoreStore = defineStore('authStore', {
  state: () => ({
    user: null,
    artist: null,
    count: 0,
    isSyncing: false,
  }),
  getters: {
    isLoggedIn(state) {
      return state.user != null
    },
    isArtist(state) {
      return this.artist != null;
    },
  },
  actions: {
    setup() {
      onAuthStateChanged(firebase.auth, (user) => {
        if (user) {
          this.syncData(user.uid);
        } else {
          this.user = null;
        }
      });
    },
    login(state, user) {
      state.isLoggedIn = true;
      state.user = user;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    async syncData(uid) {
      if (this.isSyncing) return;
      this.isSyncing = true;
      this.user = await getUserById(uid);
      // Check user profile if has artistId the sync Artist data
      if (this.user.artistId) {
        
        await this.syncArtistData(this.user.artistId);
      }
      this.isSyncing = false;
    },
    async syncArtistData(artistId) {
      this.artist = await getArtistById(artistId);
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStoreStore, import.meta.hot))
}
