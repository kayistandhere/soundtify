<template>
  <div>
      <div class="col-12 p-2 text-white" >
        <div class="d-flex justify-content-between" >
          <div>
            <img :src="this.profileUrl" class="rounded" alt="" height="50" width="50" />
            <span class="fs-6 fw-bold ms-3">{{this.profileName}}</span>
          </div>
          <div class="p-2">
            <span class="material-symbols-rounded fs-2">more_horiz</span>
          </div>
        </div>
        <p>{{ sentiment.content }}</p>
        <audio controls class="col-12 bg-module" src=""></audio>
        <div class="d-flex align-items-center">
          <div>
            <span class="material-symbols-rounded p-3 fs-4 text-danger">favorite</span>
            <span>{{ sentiment.meta_data.total_reaction }}</span>
          </div>
          <div>
            <span class="material-symbols-rounded p-3 fs-4">chat_bubble</span>
            <span>{{ sentiment.meta_data.total_comment }}</span>
          </div>
          <span class="material-symbols-rounded p-3 fs-4">send</span>
        </div>
      </div>
    </div>
</template>

<script>
import firebase from "@/firebase";
import { ref } from "firebase/storage";
import { uploadSingleFile } from "@/firebase/storage/storageQuery";
import { convertFireStorageUrl } from "@/util/download_url_parse";
import { useToast } from "vue-toastification";
import { mapState } from "pinia";
import { useAuthStoreStore } from "@/store/authStore";
import { getAllSentiment, getArtistById, getUserById } from "@/firebase/fireStore/fireQuery";
export default {
    props :{
        sentiment : Object,
    },
    data(){
        return{
            isLoading : true,
            profileUrl: '',
            profileName : '',
        }
    },
    created(){
        this.initalize();
    },
    methods:{
        async initalize() {
            await this.getProfile();
            this.isLoading = false;
        },
        async getProfile() {
            switch(this.sentiment.profile.type) {
                case "user":
                    let user = await getUserById(this.sentiment.profile.profileId);
                    this.profileUrl = user.avatar;
                    this.profileName = user.name;
                    console.log("sda",user.avatar);
                    break;
                case "artist" :
                    let artist = await getArtistById(this.sentiment.profile.profileId);
                    this.profileUrl = artist.thumbnail;
                    this.profileName = artist.name;
                    break;
                default: 
                this.profileUrl = "";
                this.profileName = "Robot";
                break;
            }
        }
    }

}
</script>

<style>

</style>