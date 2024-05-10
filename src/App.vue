<template>
  <div class="container-fluid bg-black m-0 p-0 align-items-center justify-content-center">
    <section class="d-flex" style="height: 90vh;" >
      <!-- Start Colums Left -->
      <div class="col-lg-3 overflow-hidden rounded" v-if="this.masterPage">
        <side-bar></side-bar>
        <!-- Button function -->
      </div>
      <div :class="{ 'col-lg-9 overflow-auto': this.masterPage, 'col-lg-12': !this.masterPage }">
        <div :class="{ 'mt-2 me-2': this.masterPage, 'mt-0 me-0': !this.masterPage }">
          <router-view />
        </div>
      </div>
    </section>
    <section class="" style="height:10vh;" v-if="this.masterPage">
      <bottom-navigation-bar></bottom-navigation-bar>
    </section>
  </div>
</template>

<script>
import BottomNavigationBar from './components/BottomNavigationBar/Bottom-Navigation-Bar.vue'
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
    ...mapWritableState(usePlayerStoreStore , ["isPlaying"])
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
