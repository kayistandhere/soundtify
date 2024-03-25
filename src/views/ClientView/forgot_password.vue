<template>
    <div class="container-fluid text-secondary bg-module rounded" style="height: 100vh;">
      <div class="d-flex justify-content-center align-items-center">
        <div class="col-lg-5 bg-black rounded text-center row justify-content-center mt-5">

          <!-- Sign up with email password -->
          <form @submit.prevent="forgotPassword" class=" row justify-content-center">
            <span class="fs-2 fw-bold text-white mt-5"> Reset your password </span>
            <div class=" px-2 col-7">
              <span class="custom-font-size">Enter your email address or username, and we'll send you a link to get back into your account.</span>
            </div>
            <div class="my-3 d-flex justify-content-center">
              <div class="custom-form">
                <input type="text" name="text" autocomplete="off" v-model="email" />
                <label for="text" class="label-name">
                  <span class="content-name"> Email address </span>
                </label>
              </div>
            </div>
            <div class="px-3 py-2 col-8 d-flex justify-content-between">
              <router-link :to="'/'"><btn-lg-radius :customContent="backText"></btn-lg-radius></router-link>
              <btn-md-radius :customContent="forgotText"></btn-md-radius>
            </div>
            
            <div class="border-top border-secondary col-9 my-5 "></div>
            
          </form>
        </div>
      </div>
    </div>
  </template>
  <script>
  import btnLgRadius from '../../components/button/button_lg-radius.vue'
  import btnMdRadius from '../../components/button/button_md_radius.vue'
  import auth from "../../service/auth/auth.js";
  export default {
    components: {
      btnMdRadius,
      btnLgRadius
    },
    data() {
      return {
        email: "",
        forgotText: "Send link",
        backText : "Back"
      };
    },
    methods: {
        forgotPassword() {
          auth.sendEmail(this.email).then((res) => {
            console.log("Check Email Now" ,res);
               window.location.href ;
          }).catch((error) => {
            console.log(error);
          })
      }
    }
  }
  </script>
  <style scoped>
  .custom-form {
  width: 70%;
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
  background-color: #ffffff;
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
  </style>