<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn bg-green d-flex align-items-center" data-bs-toggle="modal"
    data-bs-target="#staticBackdrop">
    <span class="material-symbols-rounded me-2">stars</span>Faculty upgrades {{ this.isArtist}}
  </button>

  <!-- Modal -->
  <div class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog ">
      <div class="modal-content bg-module">
        <div class="modal-header border-0">
          <h5 class="modal-title" id="staticBackdropLabel text-center">INFORMATION ARTIST</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="createArtists">
          <div class="modal-body">

            <div class="row">
              <img :src="this.formData.avatarArtist" alt="" class="img">
              <input type="file" name="" id="file" accept="image/*" @change="uploadAvatarArtist">
            </div>
            <div class="col-md-12">
              <div class="border border-dark m-2">
                <div class="custom-form">
                  <input type="text" name="text" autocomplete="off" required v-model="formData.artistName" />
                  <label for="text" class="label-name">
                    <span class="content-name text-dark"> Name </span>
                  </label>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="border border-dark m-2">
                <div class="custom-form">
                  <input type="text" name="text" autocomplete="off" required v-model="formData.description" />
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
import { getUser, registerAsArtist } from '@/firebase/fireStore/fireQuery';
import { v4 } from "uuid";
import { ref, uploadBytes } from 'firebase/storage';
import firebase from '../../firebase.js';
import { getAvatarArtist, uploadSingleFile } from '@/firebase/storage/storageQuery';
import { convertFireStorageUrl } from "@/util/download_url_parse";
import { useAuthStoreStore } from '@/store/authStore';
import { mapStores, mapWritableState} from 'pinia';
export default {
  components: {
    buttonLgRadius,
    buttonMdRadius,
  },
  data() {
    return {
      formData: {
        artistName: "",
        description: "",
        avatarArtist: null,
      },
      create: "Create",
      cancel: "cancel"
    }
  },
  created() {
    getAvatarArtist().then((res) => {
      this.formData.avatarArtist = res;
    })
  },
  methods: {
    async createArtists() {
      const user = await getUser();
      console.log("getUser", user);
      const id = v4();
      await registerAsArtist({ "id": id, "name": this.formData.artistName, "description": this.formData.description, "thumbnail": this.formData.avatarArtist }, user).then(() => {
        console.log("create Artist successfully");
      }).catch((error) => {
        console.log("Create failed", error);
      })
    },
    async uploadAvatarArtist() {
      const file = document.getElementById("file").files[0];
      const storageRef = ref(firebase.storage, `User/${firebase.auth.currentUser.uid}/artist/` + file.name);
      const uploadResource = await uploadSingleFile(storageRef, file);
      convertFireStorageUrl(uploadResource);
      await uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Upload ảnh thành công!", snapshot);
      });
    }
  },
  computed: {
    ...mapWritableState(useAuthStoreStore, ['isArtist'])
  },

}
</script>

<style></style>