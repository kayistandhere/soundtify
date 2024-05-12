<template>
  <div class="container-fluid bg-module text-white" style="height: 100vh;">
    <navbar-fisrt></navbar-fisrt>
    <div>
      <div class="d-flex">
        <!-- songData -->
        <div class="col-6 border">
          <form class="row g-3" @submit.prevent="uploadDetailSong">
            <div class="d-flex align-items-center justify-content-between">
              <div class="col-lg-12 px-1">
                <div class="my-2 d-flex justify-content-center">
                  <div class="custom-form">
                    <input type="text" name="text" id="email" required class="bg-module-1"
                      v-model="this.songData.name" />
                    <label for="text" class="label-name">
                      <span class="content-name text-dark"> Name Track </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex align-items-center justify-content-between">
              <div class="col-lg-4 px-1">
                <div class="custom-form">
                  <select id="inputState" class="custom-form bg-module-1 border-0 text-white"
                    v-model="this.songData.artistId">
                    <option :key="artist.id" v-for="artist in allArtist" :value="artist.id" selected>{{ artist.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-lg-8 px-1">
                <div class="my-2 d-flex justify-content-center">
                  <div class="custom-form">
                    <input type="text" name="text" id="email" required class="bg-module-1" />
                    <label for="text" class="label-name">
                      <span class="content-name text-dark"> Orther Artist </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <tag-input :onValueChange="onValueChange"></tag-input>
            </div>
            <div class="col-12">
              <textarea class="col-12 " placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"
                v-model="this.songData.description"></textarea>
            </div>
            <div class="col-12 d-flex">
              <button-lg-radius :customContent="cancel"></button-lg-radius>
              <button-md-radius :customContent="create" type="submit" class="mx-3"></button-md-radius>
            </div>
          </form>
        </div>
        <!-- Lyric with img -->
        <div class="col-6 d-flex">
          <div class="col-6 border rounded position-relative">
            <input type="file" id="input-file" name="input-file" accept="image/*" @change="handleChange()" hidden />
            <div class="bg-green position-absolute top-50 start-50">
              <span class="material-symbols-rounded">upload</span>
              <label class="btn-upload" for="input-file" role="button">
              Upload Thumbnail
            </label>
            </div>
            
            <div class="preview-box"></div>
          </div>
          <div class="col-6 border">
              <input type="file" name="" id="fileLyric" @change="uploadLyric()">
          </div>
        </div>
      </div>
      <div class="border">
        <input type="file" name="" id="fileSong" accept="audio/*" @change="uploadSong()">

      </div>

    </div>

  </div>
</template>

<script>
import buttonLgRadius from '@/components/button/button_lg-radius.vue';
import buttonMdRadius from '@/components/button/button_md_radius.vue';
import sideBar from '../../components/sidebar/sidebar.vue'
import navbarFisrt from '@/components/navbar/navbar_fisrt.vue';
import firebase from '../../firebase.js'
import { v4 } from "uuid"
import { ref, uploadBytes } from 'firebase/storage';
import { uploadSingleFile } from '@/firebase/storage/storageQuery';
import { convertFireStorageUrl } from "@/util/download_url_parse";
import { uploadSong, getAllArtist } from '@/firebase/fireStore/fireQuery';
import tagInput from '@/components/input/tag_input.vue';
import uploadImg from '@/components/upload/upload-img.vue';
export default {
  components: {
    sideBar,
    buttonMdRadius,
    buttonLgRadius,
    navbarFisrt,
    tagInput,
    uploadImg,
  },
  data() {
    return {
      songData: {
        name: "",
        description: "",
        cover: null,
        lyric: null,
        url: null,
        otherArtist: [],
        tags: [],
        // dynamic data
        id: v4(),
        duration: 0,
        listenCount: 0,
        artistId: "",
        token: "",
        uploadTime: Date.now()
      },
   
      create: "Create",
      cancel: "Cancel",
      allArtist: {},
      audio: new Audio(),
    }
  },
  created() {
    getAllArtist().then((res) => {
      this.allArtist = res;
    });

  },
  methods: {
    async uploadSong() {
      const fileSong = document.getElementById("fileSong").files[0];
      const storageRef = ref(firebase.storage, `Song/${firebase.auth.currentUser.uid}/` + fileSong.name);
      const uploadResource = await uploadSingleFile(storageRef, fileSong);
      this.songData.url = uploadResource.url
      this.songData.token = uploadResource.token;
      this.audio.src = convertFireStorageUrl(uploadResource);
      this.audio.load();
      this.audio.onloadedmetadata = (() =>{
        this.songData.duration = this.audio.duration * 1000;
      });
      
    },
    async uploadLyric() {
      const fileLyric = document.getElementById("fileLyric").files[0];
      const storageRef = ref(firebase.storage, `Song/${firebase.auth.currentUser.uid}/lyric/` + fileLyric.name);
      const uploadResource = await uploadSingleFile(storageRef, fileLyric);
      convertFireStorageUrl(uploadResource);
      await uploadBytes(storageRef, fileLyric).then((snapshot) => {
        console.log("Upload lyric thành công!", snapshot);
      }).catch((error) => {
        console.log("Upload lyric false!", error);
      });
    },
    async uploadDetailSong() {
      if(this.songData.url == null 
        || this.songData.cover == null
        || this.songData.name == null) return;
      await uploadSong(this.songData).then((res) => {
        console.log("upload detailSong successful", res);
        this.$router.push({ name: "trackManagerment" })
      }).catch((error) => {
        console.log("upload detailSong false", error);
      })
    },
    onValueChange(value) {
      this.songData.tags = [...value]
    },
    async handleChange() {
      const fileUploader = document.querySelector('#input-file');
      const getFile = fileUploader.files
      if (getFile.length !== 0) {
        const fileImage = getFile[0];
        const storageRef = ref(firebase.storage, `Song/${firebase.auth.currentUser.uid}/avatar/` + fileImage.name);
        const uploadResource = await uploadSingleFile(storageRef, fileImage);
        const img = convertFireStorageUrl(uploadResource);
        this.songData.cover = img
        await this.readFile(fileImage);
      }
    },
    readFile(uploadedFile) {
      if (uploadedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          const parent = document.querySelector('.preview-box');
          parent.innerHTML = `<img class="preview-content img-thumbnail" src=${reader.result} />`;
        };
        reader.readAsDataURL(uploadedFile);
      }
    }
  },
}

</script>

<style scoped>
/*  */
</style>