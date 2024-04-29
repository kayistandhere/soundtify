<template>
  <div class="container-fruid bg-module text-white">
    <navbar-first></navbar-first>
    <!-- Profile Edit -->
    <section class="mt-5 p-2">
      <modal-basic></modal-basic>
      <div class="d-flex text-white align-items-end custom-cursor" data-bs-toggle="modal"
        data-bs-target="#exampleModal">
        <img :src="this.formData.avatar" class="m-2 custom-img-animation" alt="" srcset="" />
        <div class="ms-2">
          <span class="fs-9">Profile</span>
          <h1 class="custom-text-title fw-bolder">
            {{ this.formData.name }}
          </h1>
          <span class="fs-8">Avicii , Mck and more </span>
          <div class="d-flex align-items-center">
            <span class="fs-8">Soundtify</span><span class="material-symbols-rounded fs-8 p-2">blur_on</span>
            <span class="fs-8 mx-2">3 Playlist</span>
            <span class="fs-8"> Folower : 2141</span>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content bg-module p-2">
            <form action="" class="text-white" @submit.prevent="saveForm">
              <div class="d-flex justify-content-around position-relative">
                <div class="d-block">
                  <img :src="this.formData.avatar" class="m-2 custom-img-animation" width="220" height="220" id="tb-image" />
                  <input type="file" id="fileImage" @change="uploadFile" accept="image/*" />
                </div>
                <!-- Form edit your profile -->
                <div class="m-2">
                  <div class="row py-1">
                    <div class="col-6 px-1">
                      <div class="custom-form">
                        <input type="text" name="text" id="email" required class="bg-module-1"
                          v-model="this.formData.name"/>
                        <label for="text" class="label-name">
                          <span class="content-name text-dark"> Name </span>
                        </label>
                      </div>
                    </div>
                    <div class="col-6 px-1">
                      <div class="custom-form">
                        <input type="text" name="text" id="email" required class="bg-module-1"
                          v-model="this.formData.email" />
                        <label for="text" class="label-name">
                          <span class="content-name text-dark"> Email</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="row py-1 ">
                    <!-- phone -->
                    <div class="col-6 px-1">
                      <div class="custom-form">
                        <input type="text" name="text" id="email" required class="bg-module-1"
                          v-model="this.formData.phone" />
                        <label for="text" class="label-name">
                          <span class="content-name text-dark">
                            Phone
                          </span>
                        </label>
                      </div>
                    </div>
                    <!-- age -->
                    <div class="col-3 px-1">
                      <div class="custom-form">
                        <input type="number" name="text" id="email" required class="bg-module-1"
                          v-model="this.formData.age" />
                        <label for="text" class="label-name">
                          <span class="content-name text-dark"> age </span>
                        </label>
                      </div>
                    </div>
                    <!-- gender -->
                    <div class="col-3 px-1">
                      <div class="custom-form">
                        <select id="inputState" class="custom-form bg-module-1 border-0 text-white"
                          v-model="this.formData.gender">
                          <option selected>male</option>
                          <option>male</option>
                          <option>female</option>
                          <option>male</option>
                          <option>male</option>
                          <option>male</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row py-1 ">
                    <div class="col-12 px-1 d-flex">
                      <div class="custom-form">
                        <input type="password" name="text" id="email" required class="bg-module-1"
                          v-model="this.formData.password" />
                        <label for="text" class="label-name">
                          <span class="content-name text-dark"> Password </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end">
                    <button-lg-radius :customContent="backText" data-bs-dismiss="modal"></button-lg-radius>
                    <button-md-radius :customContent="saveText" type="submit"></button-md-radius>
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
    </section>
    <!-- Artists Top -->
    <section class="mt-5 p-2">
      <div class="d-flex justify-content-between mx-2">
        <span class="fs-4 fw-bolder text-white"><a class="custom-text-link" href="#">Top Artists</a></span>
        <span class="fs-9 fw-bold"><a class="custom-text-link" href="#">show all</a></span>
      </div>
      <div class="d-flex">
        <card-items-artists></card-items-artists>
      </div>
    </section>
    <section>
      <div class="mx-2">
        <div class="d-flex justify-content-between mx-2">
          <span class="fs-4 fw-bolder text-white"><a class="custom-text-link" href="#">Top Albums</a></span>
        </div>
        <div class="d-flex">
          <card-items-song></card-items-song>
        </div>
      </div>
    </section>
    <section>
      <footer-1></footer-1>
    </section>
  </div>
</template>
<script>
import cardItemsArtists from "../../components/card/card_item_artists.vue";
import cardItemsSong from "../../components/card/card_item_song.vue";
import navbarFirst from "../../components/navbar/navbar_fisrt.vue";
import tableItemsBorder from "../../components/table/table_items_border.vue";
import modalBasic from "@/components/modal/modal-basic.vue";
import footer1 from "../../components/footer/footer_1.vue";
import buttonLgRadius from "../../components/button/button_lg-radius.vue";
import buttonMdRadius from "../../components/button/button_md_radius.vue";
import firebase from "../../firebase.js";
import { ref, uploadBytes ,  } from "firebase/storage";
import { uploadSingleFile } from "@/firebase/storage/storageQuery";
import { convertFireStorageUrl } from "@/util/download_url_parse";
import { updateUserClient , getUserById } from "@/firebase/fireStore/fireQuery";
import { defaultAvatar } from "@/util/global";
export default {
  name: "Profile",
  components: {
    navbarFirst,
    cardItemsArtists,
    cardItemsSong,
    tableItemsBorder,
    buttonMdRadius,
    buttonLgRadius,
    modalBasic,
    footer1,
  },
  data() {
    return {
      formData: {
        name: "",
        email: "",
        phone: 0,
        age: 0,
        gender: "",
        password: "",
        avatar: null,
      },
      
      backText: "Back",
      saveText: "Save",
      file: null,
    };
  },
  created() {
    this.getProfileUser();
  },
  methods: {
    async uploadFile() {
      const file = document.getElementById("fileImage").files[0];
      const storageRef = ref(firebase.storage,`User/${firebase.auth.currentUser.uid}/avatar/` + file.name);
      const uploadResource = await uploadSingleFile(storageRef, file);
      convertFireStorageUrl(uploadResource);
      await uploadBytes(storageRef , file).then((snapshot) => {
              console.log("Upload ảnh thành công!" , snapshot);

      }).catch((error) =>{
        console.log("Upload image false!" , error);
      }); ;
    },
    getProfileUser() {
      const id = firebase.auth.currentUser.uid;
      getUserById(id).then((res) => {
        console.log("GET USER = ", res);
        this.formData.name = res.name
        this.formData.email = res.email
        this.formData.phone = res.phone
        this.formData.age = res.age
        this.formData.gender = res.gender
        this.formData.avatar = res.avatar ?? defaultAvatar(this.formData.avatar)

      }).catch((error)=>{
        console.log(error);
      });
    },
    saveForm() {
      updateUserClient(
        this.formData.name,
        this.formData.email,
        this.formData.gender,
        this.formData.phone,
        this.formData.age,
        this.formData.avatar
      );
      this.getProfileUser();
    },
  },
};
</script>
<style scoped>
.custom-text-title {
  font-size: 72px;
}

.custom-img-animation {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  transform: scale(100%);
  transition: 0.2s ease-in;
  z-index: 998;
}

.custom-img-animation:hover {
  transform: scale(102%);
}

.custom-btn-play {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #17cf5b;
}

.form-control {
  background-color: var(--color-gray1);
  color: #fff;
  border: none;
}
</style>