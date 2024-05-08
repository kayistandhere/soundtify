<template>
  <div>
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
              <div class="modal fade" id="ModalPlaylist" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                  <div class="modal-content bg-module p-2">
                    <form action="" class="text-white" @submit.prevent="playList">
                      <div class="d-flex justify-content-around position-relative">
                        <!-- Form edit your profile -->
                        <div class="m-2">
                          <h2>CREATE PLAYLIST</h2>
                          <div class="d-flex justify-content-around align-items-center position-relative">
                            <div class="d-block col-5">
                              <img :src="this.playlist.avatarPlaylist" class="m-2 custom-img-animation" width="220"
                                height="220" id="tb-image" />
                              <input type="file" id="fileImage" @change="uploadFile" accept="image/*" />
                            </div>
                            <div class="col-7">
                              <div class="px-1">
                                <div class="custom-form my-4">
                                  <input type="text" name="text" id="email" required class="bg-module-1"
                                    v-model="this.playlist.name" />
                                  <label for="text" class="label-name">
                                    <span class="content-name text-dark"> Playlist Name </span>
                                  </label>
                                </div>
                                <!-- <div class="d-flex my-2">
                                  <div class="form-check me-4">
                                  <input class="form-check-input" type="radio" name="flexRadioDefault"
                                    id="flexRadioDefault1" v-model="this.formData.isPublic" value="true">
                                  <label class="form-check-label" for="flexRadioDefault1">
                                    Public 
                                  </label>
                                </div>
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" name="flexRadioDefault"
                                    id="flexRadioDefault2" v-model="this.isPublic" value="false" checked>
                                  <label class="form-check-label" for="flexRadioDefault2">
                                    Private
                                  </label>
                                </div>
                                </div> -->
                                
                                <textarea class="col-12 " placeholder="Description a comment here"
                                  id="floatingTextarea2" style="height: 150px"
                                  v-model="this.playlist.description"></textarea>
                              </div>
                            </div>
                          </div>
                          <div class="d-flex justify-content-end">
                            <button-lg-radius :customContent="backText" data-bs-dismiss="modal"
                              @click="clearData"></button-lg-radius>
                            <button-md-radius :customContent="saveText" data-bs-dismiss="modal"
                              type="submit"></button-md-radius>
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
            <button-radius class="mx-2" :customContent="Playlist"></button-radius>
            <button-radius class="mx-2" :customContent="Albums"></button-radius>
            <button-radius class="mx-2" :customContent="Artists"></button-radius>
            <button-radius class="mx-2" :customContent="Podcasts"></button-radius>
          </div>
          <div class="d-flex justify-content-between align-items-center ">
            <span class="material-symbols-rounded mx-3 fs-5">search</span>
            <div class="d-flex px-3">
              <span class="fs-8 mx-1">Recents</span>
              <span class="material-symbols-rounded fs-5 ">sort</span>
            </div>
          </div>
          <div class="d-block overflow-auto" style="height: 70vh">
            <track-item-card-albums></track-item-card-albums>
          </div>
        </div>
      </div>
</template>

<script>
import trackItemCardAlbums from '../card/track_item_card_albums.vue';
import buttonMdRadius from '../button/button_md_radius.vue';
import buttonLgRadius from '../button/button_lg-radius.vue';
import buttonRadius from '../button/button_radius.vue';
import { v4 } from "uuid"
import firebase from "@/firebase.js"
import { createPlaylist } from '@/firebase/fireStore/fireQuery';
import { getAvatarPlaylist, uploadSingleFile } from '@/firebase/storage/storageQuery';
import { ref , uploadBytes } from 'firebase/storage';
import { convertFireStorageUrl } from '@/util/download_url_parse';

export default {
    components:{
        trackItemCardAlbums,
        buttonRadius,
        buttonLgRadius,
        buttonMdRadius,
    },
    data(){
        return {
        Playlist: "Playlist",
      Albums: "Albums",
      Artists: "Artists",
      Podcasts: "Podcasts & Show",
      backText: "back",
      saveText: "save",
      // Control player
      // Playlist Data
      playlist: {
        id: v4(),
        isPublic: false,
        name: "",
        listenCount: 0,
        reactionCount: 0,
        extraData: {
          createdAt: Date.now(),
          ownerId: firebase.auth.currentUser?.uid ?? "",
          type : "playlist",
          updatedAt : Date.now(),
        },
        songs: [],
        avatarPlaylist: null,
        description: null,
      },
        }
    },
    created(){
        this.avatarPlaylistEvent();
    },
    methods:{
        playList() {
      createPlaylist(this.playlist).then((res) => {
        console.log("create playlist successfull !", res);
        this.$router.push({ path: "home" })
      }).catch((error) => {
        console.log("create playlist false !", error);
      })
    },
    async uploadFile() {
      const file = document.getElementById("fileImage").files[0];
      const storageRef = ref(firebase.storage, `Playlist/${firebase.auth.currentUser.uid}/` + file.name);
      const uploadResource = await uploadSingleFile(storageRef, file);
      convertFireStorageUrl(uploadResource);
      await uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Upload ảnh thành công!", snapshot);
        this.clearData();
        this.avatarPlaylistEvent();
      }).catch((error) => {
        console.log("Upload image false!", error);
      });
    },
    avatarPlaylistEvent() {
      console.log("tes1");
      getAvatarPlaylist().then((res) => {
        console.log("avatar playlist =", res);
        this.playlist.avatarPlaylist = res;

      })
    },
    clearData() {
      this.formData.namePlaylist = "";
      this.formData.descriptionPlaylist = "";
      this.formData.avatarPlaylist = null;
    }
    }
}
</script>

<style>

</style>