<template>
    <div class="custom_card d-flex align-items-center" :key="allbum.id" v-for="allbum in allbumData" @click="allbumsDetail(allbum.id)">
      <img class="custom_Img" :src="allbum.avatarPlaylist" alt="" srcset="" width="50" height="50">
      <div>
          <p class=" fs-8 fw-bold">{{ allbum.name }}</p>
          <p class=" fs-9 custom_LineHeight">{{ userName }}</p> 
      </div>
    </div>
  </template>
  
  <script>
import { getAllPlaylist, getUserById } from '@/firebase/fireStore/fireQuery';
import firebase from '@/firebase.js';
  export default {
    data(){
      return {
        allbumData : {},
        userName : ""
      }
    },
    created(){
      this.getAllbums();
    },
    methods:{
      getAllbums(){
        getAllPlaylist().then((res) =>{
            this.allbumData = res;
        });
        const id = firebase.auth.currentUser.uid;
        getUserById(id).then((res) =>{
          this.userName = res.name;
        })
      },
      allbumsDetail(id){
        const playlistId = {
          "id" : id
        }
          this.$router.push({path : `/playlist` , query :  playlistId });
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