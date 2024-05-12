<template>
  <!-- Button trigger modal -->
<div class="d-flex align-items-center fs-8 fw-bold" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
  <span class="material-symbols-rounded fs-6 me-2">star</span>
    Upgrade to Artist
</div>

<!-- Modal -->
<div class="modal fade " id="staticBackdrop1" aria-labelledby="staticBackdropLabel">
  <div class="modal-dialog ">
    <div class="modal-content bg-module">
      <div class="modal-header border-0">
        <h5 class="modal-title" id="staticBackdropLabel text-center">INFORMATION ARTIST</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form @submit.prevent="createArtists">
      <div class="modal-body">
        
        <div class="row">
            <img :src="this.formData.avatarArtist" alt="" class="custom-img preview-box">
            <input type="file" id="input-file" name="input-file" accept="image/*" @change="handleChange()" hidden>
            <label class="btn-upload" for="input-file" role="button">
              Upload Thumbnail
            </label>
        </div>
            <div class="col-md-12">
              <div class="border border-dark m-2">
            <div class="custom-form">
              <input type="text" name="text" autocomplete="off" required v-model="this.formData.artistName"/>
              <label for="text" class="label-name">
                <span class="content-name text-dark"> Name </span>
              </label>
            </div>
          </div>
          </div>
          <div class="col-md-12">
              <div class="border border-dark m-2">
            <div class="custom-form">
              <input type="text" name="text" autocomplete="off" required v-model="this.formData.description"/>
              <label for="text" class="label-name">
                <span class="content-name text-dark"> Description </span>
              </label>
            </div>
          </div>
          </div>
      </div>
      <div class=" border-0 d-flex justify-content-center px-2 pb-3">
        <button-lg-radius :customContent="cancel" data-bs-dismiss="modal"></button-lg-radius>
        <button-md-radius :customContent="create" type="submit"></button-md-radius>
      </div>
    </form>
    </div>
  </div>
</div>
</template>

<script>
import buttonMdRadius from '../button/button_md_radius.vue';
import buttonLgRadius from '../button/button_lg-radius.vue';
import { getUser, registerAsArtist} from '@/firebase/fireStore/fireQuery';
import { v4 } from "uuid"
import { ref } from 'firebase/storage';
import firebase from '../../firebase.js';
import { getAvatarArtist, uploadSingleFile } from '@/firebase/storage/storageQuery';
import { convertFireStorageUrl } from "@/util/download_url_parse";
import { useAuthStoreStore } from '@/store/authStore';
import { mapStores, mapWritableState} from 'pinia';
import { defaultAvatar } from '@/util/global';
import { useToast } from 'vue-toastification';
export default {
  components :{
      buttonLgRadius,
      buttonMdRadius,
    },
  data(){
    return {
      formData:{
        artistName : "",
        description: "",
        avatarArtist : null ,
        follower : 0,
        following: 0,
        totalListenCount : 0,
      },
        create : "Create",
        cancel : "cancel"
    }
  },
  created(){
    getAvatarArtist().then((res) =>{
        this.formData.avatarArtist = res;
      }).catch((error)=>{
        this.formData.avatarArtist = defaultAvatar(this.formData.avatarArtist);
      });
  },
  methods:{
      async createArtists(){
        const user = await getUser();
        const toast = useToast();
        const id = v4();
        const test = {"id":id ,
        "name":this.formData.artistName , 
        "description":this.formData.description, 
        "thumbnail":this.formData.avatarArtist 
        ,"follower":this.formData.follower,
        'following':this.formData.following ,
        'totalListenCount':this.formData.totalListenCount 
      }
      console.log("xem nghe si", test);
        await registerAsArtist({"id":id ,"name":this.formData.artistName , "description":this.formData.description, "thumbnail":this.formData.avatarArtist ,"follower":this.formData.follower,'following':this.formData.following ,'totalListenCount':this.formData.totalListenCount },user).then(()=>{
          toast.success("create artist successfull", {position: "top-left"})
        }).catch(()=>{
          toast.error("create asrtist have error", {position: "top-left"})
        })
      },
      async handleChange() {
      const fileUploader = document.querySelector('#input-file');
      const getFile = fileUploader.files
      if (getFile.length !== 0) {
        const fileImage = getFile[0];
        const storageRef = ref(firebase.storage, `User/${firebase.auth.currentUser.uid}/artist/` + fileImage.name);
        const uploadResource = await uploadSingleFile(storageRef, fileImage);
        const img = convertFireStorageUrl(uploadResource);
        this.formData.avatarArtist = img
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
  computed: {
    ...mapWritableState(useAuthStoreStore, ['isArtist'])
  }
   
}
</script>

<style scoped>
.custom-img {
  height: 300px;
  object-fit: cover;
}
</style>