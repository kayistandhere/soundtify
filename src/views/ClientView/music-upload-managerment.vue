<template>
  <div class="container-fluid bg-module text-white" style="height: 100vh;">
    <navbar-fisrt></navbar-fisrt>
    <div>
      <div class="d-flex">
          <!-- formData -->
          <div class="p-2 col-lg-6">
            <form class="row g-3" @submit.prevent="uploadDetailSong">
              <div class="d-flex align-items-center justify-content-between">
                <div class="col-lg-8 px-1">
                  <div class="my-2 d-flex justify-content-center">
                    <div class="custom-form">
                      <input type="text" name="text" id="email" required class="bg-module-1" v-model="this.formData.name"/>
                      <label for="text" class="label-name">
                        <span class="content-name text-dark"> Name Track </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 px-1">
                  <div class="custom-form">
                    <select id="inputState" class="custom-form bg-module-1 border-0 text-white" v-model="this.formData.category">
                      <option selected>Category</option>
                      <option>Pop</option>
                      <option>Jazz</option>
                      <option>Rock</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="d-flex align-items-center justify-content-between">
                <div class="col-lg-4 px-1">
                  <div class="custom-form">
                    <select id="inputState" class="custom-form bg-module-1 border-0 text-white" v-model="this.formData.artistId">
                      <option :key="artist.id" v-for="artist in allArtist" >{{ artist.id }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-8 px-1">
                  <div class="my-2 d-flex justify-content-center">
                    <div class="custom-form">
                      <input type="text" name="text" id="email" required class="bg-module-1"/>
                      <label for="text" class="label-name">
                        <span class="content-name text-dark"> Orther Artist </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <textarea class="col-12 " placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px" v-model="this.formData.description"></textarea>
              </div>
              <div class="col-12 d-flex">
                <button-lg-radius :customContent="cancel"></button-lg-radius>
                <button-md-radius :customContent="create" type="submit" class="mx-3"></button-md-radius>
              </div>
            </form>
          </div>
          <!-- Lyric with img -->
          <div class="p-2 col-lg-6 d-flex">
            <input type="file" name="" id="fileImage" accept="image/*" @change="uploadImage">
            <input type="file" name="" id="fileLyric" @change="uploadLyric()">
          </div>
     </div>
     <div class="row">
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
import { ref , uploadBytes} from 'firebase/storage';
import {  uploadSingleFile , getSong , getAvatarSong} from '@/firebase/storage/storageQuery';
import { convertFireStorageUrl } from "@/util/download_url_parse";
import { uploadSong , getAllArtist } from '@/firebase/fireStore/fireQuery';
export default {
  components: {
    sideBar,
    buttonMdRadius,
    buttonLgRadius,
    navbarFisrt
  },
  data() {
    return {
      formData: {
        name: "",
        description: "",
        category: "",
        cover: null,
        lyric: null,
        url: null,
        otherArtist: [],
        // dynamic data
        id: "",
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
  created(){
    getAllArtist().then((res) =>{
      this.allArtist = res;
      console.log("allArtist = " , res);
    });
    
  },
  methods: {

    async uploadSong(){
      const fileSong = document.getElementById("fileSong").files[0];
        const storageRef = ref(firebase.storage , `Song/${firebase.auth.currentUser.uid}/` + fileSong.name);
        const uploadResource = await uploadSingleFile(storageRef,fileSong);
        this.formData.token = uploadResource.token;
        convertFireStorageUrl(uploadResource);
      await uploadBytes(storageRef , fileSong).then((snapshot) => {
              console.log("Upload nhạc thành công!" , snapshot);
      }).catch((error) =>{
        console.log("Upload song false!" , error);
      }); 
      await getSong().then((res) =>{
        this.formData.url = res;
        console.log("url = " ,this.formData.url);
      }).catch((error) =>{
        console.log(error);
      })
      await this.getDataSong();
    },
    async uploadImage(){
      const fileImage = document.getElementById("fileImage").files[0];
      // const fileLyric = document.getElementById("fileLyric")
        const storageRef = ref(firebase.storage , `Song/${firebase.auth.currentUser.uid}/avatar/` + fileImage.name);
        const uploadResource = await uploadSingleFile(storageRef,fileImage);
        convertFireStorageUrl(uploadResource);
        await uploadBytes(storageRef , fileImage).then((snapshot) => {
              console.log("Upload ảnh thành công!" , snapshot);

      }).catch((error) =>{
        console.log("Upload image false!" , error);
      }); ; 
      await this.getDataAvatarSong();
    },
    async uploadLyric(){
      const fileLyric = document.getElementById("fileLyric").files[0];
        const storageRef = ref(firebase.storage , `Song/${firebase.auth.currentUser.uid}/lyric/` + fileLyric.name);
        const uploadResource = await uploadSingleFile(storageRef,fileLyric);
        convertFireStorageUrl(uploadResource);
        await uploadBytes(storageRef , fileLyric).then((snapshot) => {
              console.log("Upload lyric thành công!" , snapshot);
      }).catch((error) =>{
        console.log("Upload lyric false!" , error);
      }); ; 
    },
    async getDataSong(){
      this.audio.src = await this.formData.url;
      console.log("audio src = ", this.audio.src);
      this.formData.duration = await this.audio.duration;
      console.log("duration" ,this.audio.duration);
    },
    getDataAvatarSong(){
      getAvatarSong().then((res) =>{
      this.formData.cover = res
    })
    },
    uploadDetailSong(){
      const detailSong = {
            "artistId":this.formData.artistId ,
            "cover":this.formData.cover,
            "description":this.formData.description,
            "duration":this.formData.duration,
            "id": v4() ,
            "listenCount":this.formData.listenCount,
            "lyric":this.formData.lyric,
            "name":this.formData.name,
            "otherArtist":this.formData.otherArtist,
            "token":this.formData.token,
            "uploadTime":this.formData.uploadTime,
            "url":this.formData.url,
            }
            console.log("FormData = ", detailSong);
            console.log("FormData = ", this.formData);
        uploadSong(detailSong).then((res) =>{
            console.log("upload detailSong successful" , res);
            this.$router.push({name : "trackManagerment"})
        }).catch((error) =>{
          console.log("upload detailSong false" , error);
        })
    }
  },
  
}

</script>

<style>
/*  */

</style>