<template>
  <div class="bg-module">
    <navbar-first></navbar-first>
    <!-- POST -->
    <section>
      <div class="col-12 p-2 text-white">
        <div class="">
          <div @click="profileSocial"> <img :src="this.indexUser.avatar" class="rounded custom-objectfit-cover"
              alt="avatar-user" height="50" width="50">
            <span class="fs-6 fw-bold ms-3">{{ this.indexUser.name }}</span>
          </div>
          <div class="my-2 d-flex justify-content-center">
            <div class="custom-form">
              <input type="password" name="text" id="email" class="bg-module-1" autocomplete="none"
                data-bs-toggle="modal" data-bs-target="#exampleModal" />
              <label for="text" class="label-name">
                <span class="content-name text-dark"> Post short audio here! ... </span>
              </label>
            </div>
          </div>
          <div class="modal fade" id="exampleModal" aria-labelledby="staticBackdropLabel">
            <div class="modal-dialog modal-xl">
              <div class="modal-content bg-module">
                <div class="modal-header border-0">
                  <h5 class="modal-title" id="staticBackdropLabel text-center">POST SHORT SONG</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="createArtists">
                  <div class="modal-body">
                    <div class="col-md-12">
                      <div class="border border-dark m-2">
                        <div class="custom-form">
                          <input type="text" name="text" autocomplete="off" required />
                          <label for="text" class="label-name">
                            <span class="content-name text-dark"> Post ... </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-center">
                      <div class="col-5 rounded position-relative">
                        <input type="file" id="input-file" name="input-file" accept="image/*" @change="handleChange()"
                          hidden />
                        <div class="d-flex justify-content-center align-items-center">
                          <div class="position-absolute top-50 start-50">
                            <p class="text-danger"><span class="material-symbols-rounded ">upload</span>
                              <label class="btn-upload" for="input-file" role="button">
                                Upload Thumbnail
                              </label>
                            </p>
                          </div>
                        </div>
                        <div class="preview-box"></div>
                      </div>
                      <div class="col-7 border-start">
                        <div class=" m-2">
                          <span class="multi-range">
                            <input type="range" min="0" max="100" value="0" step="1" id="lower"
                              v-model="this.lowerValue" @input="handleLowerInput">
                            <input type="range" min="0" max="100" value="100" step="1" id="upper"
                              v-model="this.upperValue" @input="handleUpperInput">
                            <h3>{{ this.lowerValue }}</h3>
                            <h3>{{ this.upperValue }}</h3>
                          </span>
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
        </div>
      </div>
    </section>
    <!-- REACTION POST -->
    <section>
      <div class="col-12 p-2 text-white" :key="post" v-for="post in sentimentAll">
        <div class="d-flex justify-content-between">
          <div>
            <img src="" class="rounded" alt="" height="50" width="50">
            <span class="fs-6 fw-bold ms-3">{{  }}</span>
          </div>
          <div class="p-2">
            <span class="material-symbols-rounded fs-2">more_horiz</span>
          </div>
        </div>
        <p>{{ post.content }}
        </p>
        <audio controls class="col-12 bg-module" src="">
        </audio>
        <div class="d-flex">
          <div>
            <span class="material-symbols-rounded p-3 fs-4 text-danger">favorite</span>
            <span>{{ post.meta_data.total_reaction }}</span>
          </div>

          <div>
            <span class="material-symbols-rounded p-3 fs-4">chat_bubble</span>
            <span>{{ post.meta_data.total_comment }}</span>
          </div>

          <span class="material-symbols-rounded p-3 fs-4">send</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import buttonMdRadius from '../../components/button/button_md_radius.vue';
import buttonLgRadius from '../../components/button/button_lg-radius.vue';
import navbarFirst from '@/components/navbar/navbar_fisrt.vue';
import firebase from '@/firebase';
import { ref } from 'firebase/storage';
import { uploadSingleFile } from '@/firebase/storage/storageQuery';
import { convertFireStorageUrl } from "@/util/download_url_parse";
import { useToast } from 'vue-toastification';
import { mapState } from 'pinia';
import { useAuthStoreStore } from '@/store/authStore';
import { getAllSentiment, getUserById } from '@/firebase/fireStore/fireQuery';
export default {
  components: {
    navbarFirst,
    buttonMdRadius,
    buttonLgRadius,
  },
  data() {
    return {
      lowerValue: 0,
      upperValue: 100,
      create: 'create',
      cancel: 'cancel',
      sliderSpace: 20,
      userProfile: {},
      sentimentAll: [],
      profileSentiment: {},
    }
  },
  created() {
    this.getAllPost();
  },
  methods: {
    profileSocial() {
      const id = {
        'id': firebase.auth.currentUser.uid
      }
      this.$router.push({ path: "/profileSocial", query: id });
    },
    handleUpperInput() {
      if (this.upperValue < this.sliderSpace) {
        this.upperValue = this.sliderSpace;
        return;
      }
      if (this.upperValue < parseInt(this.lowerValue) + parseInt(this.sliderSpace)) {
        this.lowerValue = this.upperValue - this.sliderSpace
      }
    },
    handleLowerInput() {
      if (this.lowerValue > 100 - parseInt(this.sliderSpace)) {
        this.lowerValue = 100 - parseInt(this.sliderSpace);
        return;
      }
      if (this.lowerValue > parseInt(this.upperValue) - parseInt(this.sliderSpace)) {
        this.upperValue = parseInt(this.lowerValue) + parseInt(this.sliderSpace);
      }
    },
    async handleChange() {
      const fileUploader = document.querySelector('#input-file');
      const getFile = fileUploader.files
      if (getFile.length !== 0) {
        const fileImage = getFile[0];
        const storageRef = ref(firebase.storage, `Sentiment/${firebase.auth.currentUser.uid}/` + fileImage.name);
        const uploadResource = await uploadSingleFile(storageRef, fileImage);
        const img = convertFireStorageUrl(uploadResource);
        await this.readFile(fileImage);
      }
    },
    readFile(uploadedFile) {
      if (uploadedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          const parent = document.querySelector('.preview-box');
          parent.innerHTML = `<img class="img-thumbnail" src=${reader.result} />`;
        };
        reader.readAsDataURL(uploadedFile);
      }
    },
    async getAllPost() {
      this.sentimentAll = await getAllSentiment();
    },

  },
  computed: {
    ...mapState(useAuthStoreStore , ['user']),
    indexUser(){
      return {
        avatar: this.user?.avatar,
        name : this.user?.name
      }
    },

  },
  watch: {
    upperValue(newValue, oldValue) {
      console.log(` s1 =${newValue}, s2 =${oldValue}`);
    }
  }
}
</script>

<style scoped>
input[type=range] {
  box-sizing: border-box;
  appearance: none;
  width: 400px;
  margin: 0;
  padding: 0 2px;
  overflow: hidden;
  border: 0;
  border-radius: 1px;
  outline: none;
  background: linear-gradient(grey, grey) no-repeat center;
  background-size: 100% 2px;
  pointer-events: none;
}

input[type=range]:active,
input[type=range]:focus {
  outline: none;
}

input[type=range]::-webkit-slider-thumb {
  height: 18px;
  width: 18px;
  border-radius: 28px;
  background-color: #fff;
  position: relative;
  margin: 5px 0;
  cursor: pointer;
  appearance: none;
  pointer-events: all;
  box-shadow: 0 1px 4px 0.5px rgba(0, 0, 0, 0.25);
}

input[type=range]::-webkit-slider-thumb::before {
  content: ' ';
  display: block;
  position: absolute;
  top: 13px;
  left: 100%;
  width: 2000px;
  height: 2px;
}

.multi-range {
  position: relative;
  height: 50px;
}

.multi-range input[type=range] {
  position: absolute;
}

.multi-range input[type=range]:nth-child(1)::-webkit-slider-thumb::before {
  background-color: red;
}

.multi-range input[type=range]:nth-child(2) {
  background: none;
}

.multi-range input[type=range]:nth-child(2)::-webkit-slider-thumb::before {
  background-color: grey;
}
</style>