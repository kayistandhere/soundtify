<template>
  <div class="container-fluid bg-black m-0 p-0">
    <div class="d-flex" style="height:90vh;">
      <!-- Start Colums Left -->
      <div class="col-lg-3 overflow-hidden rounded" >
        <!-- Button function -->
        <div class="d-block bg-module text-white m-2 rounded">
          <div class="">
            <router-link :to="'/home'" class="custom-router-link d-flex px-2 py-2 align-items-center">
              <span class="material-symbols-rounded mx-3 fs-3">home</span>
              <span class="fw-bolder fs-7">Home</span>
          </router-link>
          </div>
          <div class="">
            <router-link :to="'/search'" class="custom-router-link d-flex px-2 py-2 align-items-center">
              <span class="material-symbols-rounded mx-3 fs-3">search</span>
              <span class="fw-bolder fs-7">Search</span>
          </router-link>
          </div>
        </div>
        <!-- Library -->
        <div class="d-block bg-module text-white mx-2 rounded " >
          <!-- Title Library -->
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex px-2 py-2 align-items-center">
            <span class="material-symbols-rounded mx-3 fs-3">book_4</span>
            <span class="fw-bolder fs-7">Your Library</span>
          </div>
          <div class="rounded p-2">
            <span class="material-symbols-rounded">add</span>
          </div>
          </div>
          <!-- Topic button -->
          <div class="d-flex align-items-center px-2 py-2">
            <btn-topic class="mx-2" :customContent="Playlist"></btn-topic>
            <btn-topic class="mx-2" :customContent="Albums"></btn-topic>
            <btn-topic class="mx-2" :customContent="Artists"></btn-topic>
            <btn-topic class="mx-2" :customContent="Podcasts"></btn-topic>
          </div>
          <div class="d-flex justify-content-between align-items-center ">
            <span class="material-symbols-rounded mx-3 fs-5">search</span>
            <div class="d-flex">
              <span class="fs-8 mx-1">Recents</span>
              <span class="material-symbols-rounded fs-5 ">sort</span>
            </div>
          </div>
          <div class="d-block overflow-auto">
            <div class="" style="height: 100vh;">
            <artists-item-card-albums class="px-3"></artists-item-card-albums>
            <track-item-card-albums class="px-3"></track-item-card-albums>
            <artists-item-card-albums class="px-3"></artists-item-card-albums>
            <artists-item-card-albums class="px-3"></artists-item-card-albums>
            <track-item-card-albums class="px-3"></track-item-card-albums>
            <artists-item-card-albums class="px-3"></artists-item-card-albums>
            <artists-item-card-albums class="px-3"></artists-item-card-albums>
            <track-item-card-albums class="px-3"></track-item-card-albums>
            <artists-item-card-albums class="px-3"></artists-item-card-albums>
            <artists-item-card-albums class="px-3"></artists-item-card-albums>
            <track-item-card-albums class="px-3"></track-item-card-albums>
            <artists-item-card-albums class="px-3"></artists-item-card-albums>
            <artists-item-card-albums class="px-3"></artists-item-card-albums>
            <track-item-card-albums class="px-3"></track-item-card-albums>
            <artists-item-card-albums class="px-3"></artists-item-card-albums>
            <artists-item-card-albums class="px-3"></artists-item-card-albums>
            <track-item-card-albums class="px-3"></track-item-card-albums>
            <artists-item-card-albums class="px-3"></artists-item-card-albums>

          </div>
            
          </div>
        </div>
      </div>
      <!-- End colums -->
      <!-- Start colums Right -->
      <div class="col-lg-9 overflow-auto"> 
            <div class="mt-2 me-2">
              <router-view/>
            </div>
      </div>
  </div>
  <section class="" style="height:10vh;">
    <div class="d-flex align-items-center justify-content-between">
      <div class="nav-item d-flex align-items-center ps-3">
          <track-item-card-albums-2 class="text-white"></track-item-card-albums-2>
      </div>
      <div class="nav-item d-block">
        <div class="function_control_music d-flex justify-content-center align-items-center">
            <span class="material-symbols-rounded p-2 text-white fs-4 custom-opacity">shuffle</span>
            <span class="material-symbols-rounded p-2 text-white fs-2 custom-opacity" @click="prevousTrack">skip_previous</span>
            <span class="material-symbols-rounded p-2 text-white fs-2 custom-opacity" @click="onSeekBackward">replay_10</span>
            <span class="material-symbols-rounded p-2 text-white fs-2 custom-opacity" @click="play" v-if="!this.playOrPause">play_arrow</span>
            <span class="material-symbols-rounded p-2 text-white fs-2 custom-opacity" @click="pause" v-else>pause</span>
            <span class="material-symbols-rounded p-2 text-white fs-2 custom-opacity" @click="onSeekForward">forward_10</span>
            <span class="material-symbols-rounded p-2 text-white fs-2 custom-opacity" @click="nextTrack">skip_next</span>
            <span class="material-symbols-rounded p-2 text-white fs-4 custom-opacity">replay</span>
            
            
            </div>
            <div class="d-flex align-items-center">
              <span class="fs-9 mx-2 text-white"></span>
              <input type="range" class="slider" style="width:30rem" min="0" max="100" step="1" :value="this.seekingData"
              @input="onSeekSliderChange">
              <span class="fs-9 ms-2 text-white">{{ this.total }}</span>
            </div>
          
      </div>
      <!-- function control music -->
      <div class="nav-item d-flex d-flex align-items-center px-3">
      
          <span class="material-symbols-rounded p-1 text-white fs-5 custom-opacity">mic</span>
          <span class="material-symbols-rounded p-1 text-white fs-5 custom-opacity">list_alt</span>
          <span class="material-symbols-rounded p-1 text-white fs-5 custom-opacity">devices_other</span>
          <span class="material-symbols-rounded p-1 text-white fs-5 custom-opacity">brand_awareness</span>
          <input type="range" class="slider" min="0" max="1" step="0.01" v-model="this.volumeValue" @input="test">
          
            
      </div>
    </div>
  </section>
  </div>
 
</template>

<script>
import trackItemCardAlbums2 from './components/card/track_item_card_albums_2.vue';
import trackItemCardAlbums from './components/card/track_item_card_albums.vue'
import artistsItemCardAlbums from './components/card/artists_item_card_albums.vue'
import btnTopic from '../src/components/button/button_radius.vue'
import player from './store/player_store/player.js'
// import { onAuthStateChanged } from 'firebase/auth';
// import firebaseAuth from './firebase.js'
import { mapActions ,mapGetters } from 'vuex';
// import { count } from 'firebase/firestore';

  export default {
    components : {
      btnTopic,
      artistsItemCardAlbums,
      trackItemCardAlbums,
      trackItemCardAlbums2
    },
    data(){
      return {
        Playlist :"Playlist",
        Albums :  "Albums",
        Artists :"Artists",
        Podcasts :"Podcasts & Show",

        debouncedSeekingChange: null,
        seekingData : 0 ,
        volumeValue : 0,
        playOrPause: false,
        total :null,
      }
    },
    created(){
      this.createTracks();
      // onAuthStateChanged(firebaseAuth.auth , (user) =>{
      //   this.oncurrentUserChange(user)
      // })
      
    },
    methods:{
      ...mapActions(['increment','plays']),
        createTracks(){
          player.created();
        },
        play(){
          player.playControl();
          this.playOrPause = true;
        },
        pause(){
          player.pauseControl();
          this.playOrPause = false;
        },
        onVolume(){
          player.volumeControl(this.volumeValue);
        },
        onSeekBackward(){
          player.seekBackward();
        },
        onSeekForward(){
          player.seekForward();
        },
        prevousTrack(){
          console.log("Prevous Track");
          player.prevousSong();
        },
        nextTrack(){
          console.log("Next Track");
          player.nextSong();
        },
        onSeekSliderChange(){
          player.debounce(player.seekingChange(this.seekingData),1000);
        },

      },
    computed:{
        ...mapGetters(['count','currentTime']),
       
        test(){
         console.log("Volume" , this.volumeValue);

      }
  },
    watch:{
      
     
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
}
.custom-opacity:hover {
  opacity: 1;
}
</style>
