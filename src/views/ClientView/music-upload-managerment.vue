<template>
  <div class="container-fluid bg-module text-white" style="height: 100vh;">
    <navbar-fisrt></navbar-fisrt>
    <div class="d-flex">
      <div class="p-2 col-lg-6">
  <div class="custom-card bg-module-1">
    <div class="drop_box">
      <header>
        <h4 class="text-white fw-bold">Select File here</h4>
      </header>
      <p>Files Supported: Audio , Images , Mutifile</p>
      <input type="file" hidden id="fileId">
      <button class="btn" @click="clickInput">Choose File</button>
    </div>
</div>
      </div>
      <div class="p-2 col-lg-6">
        <form class="row g-3">
          <div class="col-md-6">
            <div class="my-2 d-flex justify-content-center">
              <div class="custom-form">
                <input type="text" name="text" id="email" class="bg-module-1" />
                <label for="text" class="label-name">
                  <span class="content-name"> Name </span>
                </label>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="custom-form">
              <select id="inputState" class="custom-form bg-module-1 border-0 text-white">
              <option selected>Choose...</option>
              <option>Singapor</option>
              <option>VietNam</option>
              <option>Campuchia</option>
            </select>
            </div>
          </div>
          <div class="col-10">
            <div class="my-2 d-flex justify-content-center">
              <div class="custom-form">
                <input type="text" name="text" id="email" class="bg-module-1" />
                <label for="text" class="label-name">
                  <span class="content-name"> Email </span>
                </label>
              </div>
            </div>
          </div>
          <div class="col-md-2">
            <div class="my-2 d-flex justify-content-center">
              <div class="custom-form">
                <input type="text" name="text" id="email" class="bg-module-1" />
                <label for="text" class="label-name">
                  <span class="content-name"> Email </span>
                </label>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="my-2 d-flex justify-content-center">
              <div class="custom-form">
                <input type="text" name="text" id="email" class="bg-module-1" />
                <label for="text" class="label-name">
                  <span class="content-name"> Email </span>
                </label>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="my-2 d-flex justify-content-center">
              <div class="custom-form">
                <input type="text" name="text" id="email" class="bg-module-1" />
                <label for="text" class="label-name">
                  <span class="content-name"> Email </span>
                </label>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="custom-form">
              <select id="inputState" class="custom-form bg-module-1 border-0 text-white">
              <option selected>Choose...</option>
              <option>Singapor</option>
              <option>VietNam</option>
              <option>Campuchia</option>
            </select>
            </div>
          </div>
          <div class="col-md-8">
            <div class="my-2 d-flex justify-content-center">
              <div class="custom-form">
                <input type="text" name="text" id="email" class="bg-module-1" />
                <label for="text" class="label-name">
                  <span class="content-name"> Email </span>
                </label>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="custom-form">
              <select id="inputState" class="custom-form bg-module-1 border-0 text-white">
              <option selected>Choose...</option>
              <option>Singapor</option>
              <option>VietNam</option>
              <option>Campuchia</option>
            </select>
            </div>
           
          </div>

          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck">
              <label class="form-check-label" for="gridCheck">
                Check me out
              </label>
            </div>
          </div>
          <div class="col-12 d-flex">
            <button-lg-radius :customContent="cancel"></button-lg-radius>
            <button-md-radius :customContent="create" class="mx-3"></button-md-radius>
          </div>
        </form>
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
import {ref , uploadBytes } from "firebase/storage";
export default {
  data() {
    return {
      create: "Create",
      cancel: "Cancel"
    }
  },
  methods:{
  },
  components: {
    sideBar,
    buttonMdRadius,
    buttonLgRadius,
    navbarFisrt
  },
  computed: {

  },
  watch: {

  }
}

</script>

<style scoped>
.custom-form {
  width: 100%;
  position: relative;
  height: 50px;
  overflow: hidden;
}

.custom-form input {
  width: 100%;
  height: 100%;
  color: #000000;
  padding-top: 20px;
  border-radius: 2px;
  padding-left: 10px;
  font-size: 14px;
  border: none;
}

.custom-form label {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-bottom: 1px solid white;
}

.custom-form label::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-bottom: 2px solid #000000;
  transform: translateX(-100%);
  transition: all 0.3s ease;
}

.content-name {
  position: absolute;
  bottom: 0px;
  left: 5px;
  font-size: 13px;
  padding-left: 10px;
  padding-bottom: 10px;
  margin-bottom: 5px;
  transition: all 0.3s ease;
}

.custom-form input:focus {
  outline: none;
}

.custom-form input:focus+.label-name .content-name,
.custom-form input:valid+.label-name .content-name {
  transform: translateY(-60%);
  font-size: 11px;
  left: 0px;
  color: #000000;
}

.custom-form input:focus+.label-name::after,
.custom-form input:valid+.label-name::after {
  transform: translateX(0%);
}

.custom-font-size {
  font-size: 14px;
}

.custom-font-size-1 {
  font-size: 12px;
}

.custom-color-logo {
  color: #4267b2;
}

.form-message {
  font-size: 1.2rem;
  line-height: 1.6rem;
  padding: 4px 0 0;
}

/*  */

.custom-card {
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.3);
  width: 100%;
  padding: 10px 10px 10px 10px;
}

.drop_box {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 3px dotted #a3a3a3;
}

.drop_box h4 {
  font-size: 16px;
  font-weight: 400;
  color: #2e2e2e;
}

.drop_box p {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 12px;
  color: #a3a3a3;
}

.btn {
  text-decoration: none;
  background-color: #0d110e;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  outline: none;
  border-radius: 20px;
  transition: 0.3s;
}

.btn:hover{
  text-decoration: none;
  background-color: #26a11b;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
}
#fileID {
  margin: 10px 0;
  width: 100%;
  background-color: #292424;
  border: none;
  outline: none;
  padding: 12px 20px;
  border-radius: 4px;
}

</style>