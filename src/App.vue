<template>
  <div class="container-fluid m-0 bg-black p-0 align-items-center justify-content-center">
    <section class="d-flex" :style="`height: ${this.currentSong ? '92vh' : '100vh'}`">
      <!-- Start Colums Left -->
      <div class="col-lg-3 overflow-hidden rounded px-2" v-if="this.masterPage" >
        <side-bar ></side-bar>
      </div>
      <div :class="{ 'col-lg-9 overflow-auto ': this.masterPage, 'col-lg-12 ': !this.masterPage }">
          <router-view />
      </div>
    </section>
      <bottom-navigation-bar class="bg-black" v-if="this.currentSong" :style="`height: ${this.currentSong ? '8vh' : '0vh'}`"></bottom-navigation-bar>
  </div>
</template>

<script>
import BottomNavigationBar from '@/components/BottomNavigationBar/Bottom-Navigation-Bar.vue'
import sideBar from './components/sidebar/sidebar.vue';
import firebase from "@/firebase.js"
import { mapActions ,mapWritableState } from 'pinia';
import { useAuthStoreStore } from './store/authStore';
import { usePlayerStoreStore } from './store/playerStore';

export default {
  components: {
    BottomNavigationBar,
    sideBar,
  },
   created() {
    if (firebase.auth.currentUser) {
      this.masterPage = true
    } else {
      this.masterPage = false
    }
     this.setup();
  },
  methods: {
    ...mapActions(useAuthStoreStore, ['setup']),
  },
  computed: {
    ...mapWritableState(usePlayerStoreStore , ["isPlaying" , "currentSong"])
  }

}
</script>
<style>
.slider {
  /* -webkit-appearance:none; */
  width: 100%;
  height: 5px;
  border-radius: 10px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background: #ffffff;
  cursor: pointer;
  border-radius: 50%;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #ffffff;
  cursor: pointer;
  border-radius: 50%;
}

.custom-opacity {
  opacity: 0.7;
  cursor: pointer;
}

.custom-opacity:hover {
  opacity: 1;
}
.custom-height-100 {
  height: 100vh;
}
.custom-height-90 {
  height: 90vh
}
</style>
