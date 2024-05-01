<template>
  <div class="container-fluid bg-black m-0 p-0">
    <div class="d-flex" style="height:90vh;">
      <!-- Start Colums Left -->
      <div class="col-lg-3 overflow-hidden rounded">
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
        <div class="d-block bg-module text-white mx-2 rounded ">
          <!-- Title Library -->
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex px-2 py-2 align-items-center">
              <span class="material-symbols-rounded mx-3 fs-3">book_4</span>
              <span class="fw-bolder fs-7">Your Library</span>
            </div>
            <div class="rounded p-2">
              <span class="material-symbols-rounded custom-cursor" data-bs-toggle="modal"
                data-bs-target="#ModalPlaylist">add</span>
              <!-- Button trigger modal -->

              <!-- Modal -->
              <div class="modal fade" id="ModalPlaylist" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content bg-module p-2">
            <form action="" class="text-white" @submit.prevent="playList">
              <div class="d-flex justify-content-around position-relative">
                <!-- Form edit your profile -->
                <div class="m-2">
                  <h2>CREATE PLAYLIST</h2>
                  <div class="d-flex justify-content-around align-items-center position-relative">
                    <div class="d-block col-5">
                          <img :src="this.formData.avatarPlaylist" class="m-2 custom-img-animation" width="220" height="220" id="tb-image" />
                          <input type="file" id="fileImage" @change="uploadFile" accept="image/*" />
                      </div>
                      <div class="col-7">  
                      <div class="px-1">
                      <div class="custom-form my-4">
                        <input type="text" name="text" id="email" required class="bg-module-1"
                        v-model="this.formData.namePlaylist"
                          />
                        <label for="text" class="label-name">
                          <span class="content-name text-dark"> Playlist Name </span>
                        </label>
                      </div>
                      <textarea class="col-12 " placeholder="Description a comment here" id="floatingTextarea2" style="height: 150px" v-model="this.formData.descriptionPlaylist"></textarea>
                    </div>
                  </div>
                  
                   
                    
                  </div>
                  <div class="d-flex justify-content-end">
                    <button-lg-radius :customContent="backText" data-bs-dismiss="modal" @click="clearData"></button-lg-radius>
                    <button-md-radius :customContent="saveText" data-bs-dismiss="modal" type="submit" ></button-md-radius>
                  </div>
                  <div class="row py-1">
                    <p class="fs-9 text-secondary">
                      By proceeding, you agree to give Spotify access to the
                      image you choose to upload. Please make sure you have the
                      right to upload the image.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
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
          <div class="d-block overflow-auto" style="height: 70vh">
            <track-item-card-albums class="px-3"></track-item-card-albums>
          </div>
        </div>
      </div>
      <!-- End colums -->
      <!-- Start colums Right -->
      <div class="col-lg-9 overflow-auto">
        <div class="mt-2 me-2">
          <router-view />
        </div>
      </div>
    </div>
    <section class="" style="height:10vh;">
      <div class="d-flex align-items-center justify-content-between">
        <div class="nav-item d-flex align-items-center ps-3">
          <track-item-card-albums-2 class="text-white" :images="audioCurrent.cover" :nameSong="audioCurrent.name"
            :artistId="audioCurrent.artistId"></track-item-card-albums-2>
        </div>
        <div class="nav-item d-block">
          <div class="function_control_music d-flex justify-content-center align-items-center">
            <span class="material-symbols-rounded p-2 text-white fs-4 custom-opacity">shuffle</span>
            <span class="material-symbols-rounded p-2 text-white fs-2 custom-opacity"
              @click="onSeekBackward">replay_10</span>
            <span class="material-symbols-rounded p-2 text-white fs-2 custom-opacity"
              @click="prevousTrack">skip_previous</span>
            
            <span class="material-symbols-rounded p-2 text-white fs-2 custom-opacity " @click="play"
              v-if="!this.playOrPause">play_arrow</span>
            <span class="material-symbols-rounded p-2 text-white fs-2 custom-opacity" @click="pause" v-else>pause</span>
            
            <span class="material-symbols-rounded p-2 text-white fs-2 custom-opacity"
              @click="nextTrack">skip_next</span>
              <span class="material-symbols-rounded p-2 text-white fs-2 custom-opacity"
              @click="onSeekForward">forward_10</span>
            <span class="material-symbols-rounded p-2 text-white fs-4 custom-opacity">replay</span>
          </div>
          <div class="d-flex align-items-center">
            <span class="fs-9 mx-2 text-white"></span>
            <input type="range" class="slider" style="width:30rem" min="0" max="100" step="1" v-model="this.seekingData" :value="this.currentTime"
              @input="onSeekSliderChange">
            <span class="fs-9 ms-2 text-white">{{ this.duration }}</span>
          </div>

        </div>
        <!-- function control music -->
        <div class="nav-item d-flex d-flex align-items-center px-3">
          <span class="material-symbols-rounded p-1 text-white fs-5 custom-opacity">mic</span>
          <span class="material-symbols-rounded p-1 text-white fs-5 custom-opacity">list_alt</span>
          <span class="material-symbols-rounded p-1 text-white fs-5 custom-opacity">devices_other</span>
          <span class="material-symbols-rounded p-1 text-white fs-5 custom-opacity">brand_awareness</span>
          <input type="range" class="slider" min="0" max="1" step="0.01" v-model="this.volumeValue" @input="onVolume">
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
import buttonMdRadius from './components/button/button_md_radius.vue';
import buttonLgRadius from './components/button/button_lg-radius.vue';
import { v4 } from "uuid"
import firebase from "@/firebase.js"
import { ref, uploadBytes  } from "firebase/storage";
import { convertFireStorageUrl } from "@/util/download_url_parse";
import { mapActions, mapWritableState , mapState } from 'pinia';
import { useAuthStoreStore } from './store/authStore';
import { usePlayerStoreStore } from './store/playerStore';
import { createPlaylist } from './firebase/fireStore/fireQuery';
import { getAvatarPlaylist ,uploadSingleFile } from '@/firebase/storage/storageQuery';
import { defaultAvatar } from './util/global';
export default {
  components: {
    btnTopic,
    artistsItemCardAlbums,
    trackItemCardAlbums,
    trackItemCardAlbums2,
    buttonLgRadius,
    buttonMdRadius,
  },
  data() {
    return {
// Props title name button
      Playlist: "Playlist",
      Albums: "Albums",
      Artists: "Artists",
      Podcasts: "Podcasts & Show",
      backText : "back",
      saveText : "save",
// Control player
      debouncedSeekingChange: null,
      seekingData: this.currentTime, 
      volumeValue: 0.5,
      playOrPause: false,
      total: null,
// Playlist Data
      formData :{
        namePlaylist : "",
        avatarPlaylist: null,
        descriptionPlaylist: ""
      }
      
    }
  },
  async created() {
    await this.setup();
    await this.createTracks();
    await this.avatarPlaylist();
  },
  methods: {
    ...mapActions(useAuthStoreStore, ['setup']),
    ...mapActions(usePlayerStoreStore, [
      'created',
      'playControl',
      'pauseControl',
      'volumeControl',
      'seekBackward',
      'seekForward',
      'prevousSong',
      'nextSong',
      'seekingChange',
      'debounce',
      'generateTime'
    ]),
    createTracks() {
      this.created();
    },
    play() {
      this.playControl();
      this.playOrPause = true;
    },
    pause() {
      this.pauseControl();
      this.playOrPause = false;
    },
    onVolume() {
      this.volumeControl(this.volumeValue);
    },
    onSeekBackward() {
      this.seekBackward();
    },
    onSeekForward() {
      this.seekForward();
    },
    prevousTrack() {
      console.log("Prevous Track");
      this.prevousSong();
    },
    nextTrack() {
      console.log("Next Track");
      this.nextSong();
    },
    onSeekSliderChange() {
      console.log("seeking data = ", this.seekingData);
      this.debounce(this.seekingChange(this.seekingData), 1000);
      this.seekingData = this.currentTime
    },
    playList(){
      const playlistData = {
        "id" : v4(),
        "name" : this.formData.namePlaylist,
        "userId" : firebase.auth.currentUser.uid,
        "listentCount" : 0,
        "reactionCount" : 0,
        "songs" : [],
        "avatarPlaylist":this.formData.avatarPlaylist,
        "description":this.formData.descriptionPlaylist,
      };
      console.log("show playlist data" , playlistData);
      createPlaylist(playlistData).then((res) =>{
        console.log("create playlist successfull !", res);
        this.$router.push({path : "home"})
      }).catch((error) =>{
        console.log("create playlist false !" , error);
      })
    },
    async uploadFile() {
      const file = document.getElementById("fileImage").files[0];
      const storageRef = ref(firebase.storage,`Playlist/${firebase.auth.currentUser.uid}/` + file.name);
      const uploadResource = await uploadSingleFile(storageRef, file);
      convertFireStorageUrl(uploadResource);
      await uploadBytes(storageRef , file).then((snapshot) => {
              console.log("Upload ảnh thành công!" , snapshot);
              this.clearData();
              // this.avatarPlaylist();
      }).catch((error) =>{
        console.log("Upload image false!" , error);
      });
    },
    avatarPlaylist(){
      getAvatarPlaylist().then((res) =>{
      this.formData.avatarPlaylist = res
    })
    },
    clearData(){
            this.formData.namePlaylist = "";
            this.formData.descriptionPlaylist = "";
            this.formData.avatarPlaylist = null;
        }
  },
  computed: {
    ...mapWritableState(usePlayerStoreStore, ["audioCurrent"]),
    ...mapState(usePlayerStoreStore, ["currentTime" , "duration"])
    
  },

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
</style>
