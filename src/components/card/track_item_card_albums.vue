<template>
  <div v-if="!this.isLoading">
    <div class="custom_card d-flex align-items-center custom-cursor" :key="allbum.id" v-for="allbum in allbumData" @click="allbumsDetail(allbum.id)">
      <img class="custom_Img" :src="allbum.avatarPlaylist" alt="" srcset="" width="50" height="50">
      <div>
          <p class=" fs-8 fw-bold">{{ allbum.name }}</p>
          <p class=" fs-9 custom_LineHeight">{{ userName.name }}</p> 
      </div>
    </div>
  </div>
  </template>
  
  <script>
import {  getPlaylistWithUser, getUserById } from '@/firebase/fireStore/fireQuery';
import firebase from '@/firebase.js';
  export default {
    data(){
      return {
        allbumData : {},
        userName : {},
        isLoading : true ,
      }
    },
    created(){
      this.getAllbums();
    },
    methods:{
       async getAllbums(){
        this.isLoading = true;
        this.allbumData =await getPlaylistWithUser(firebase.auth.currentUser.uid);
        const id = firebase.auth.currentUser.uid;
        this.userName = await getUserById(id);
        this.isLoading = false;
      },
      allbumsDetail(id){
        const playlistId = {
          "id" : id
        }
          this.$router.replace({path : `/playlist` , query :  playlistId });
      }
    }
  }
  </script>
  
  <style scoped>
  .custom_card {
    display: flex;
    padding: 5px 3px 5px 3px;
    border-radius: 5px;
    width : 100%;
  }
  .custom_Img {
    border-radius: 5px;
    object-fit :cover;
    margin-right: 5px;
  }
  .custom_LineHeight {
    line-height: 2px;
  }
  </style>