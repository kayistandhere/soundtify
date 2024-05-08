<template>
    <div class="custom_card d-flex align-items-center">
      <img class="custom_Img" :src="this.images" alt="" srcset="" width="50" height="50">
      <div class="custom_LineHeight">
          <p class=" fs-8    mt-3">{{ nameSong }}</p>
          <p class=" fs-9 ">{{ artistName }}</p> 
      </div>
    </div>
  </template>
  
  <script>
import { getArtistById } from '@/firebase/fireStore/fireQuery';

  export default {
    props: {
      artistId : String,
      nameSong : String,
      images : File
    },
    data(){
      return {
        artistName :"",
      }
    },
    created(){
      this.getArtist();
    },
    methods:{
      getArtist(){
        getArtistById(this.artistId).then((res) =>{
        this.artistName = res.name;
      })
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
    object-fit: cover;
    margin-right: 5px;
  }
  .custom_LineHeight {
    line-height: 0px;
  }

  </style>