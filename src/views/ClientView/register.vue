<template>
  <div class="container-fluid text-secondary bg-module rounded" style="height: 100vh;">
    <div class="d-flex justify-content-center align-items-center">
      <div class="col-lg-5 bg-black rounded text-center row justify-content-center mt-5">
        <!-- Sign up with email password -->
        <form @submit.prevent="register" class=" row justify-content-center">
          <span class="fs-2 fw-bold text-white my-5"> Sign up to Soundtify </span>
          <div class="my-3 d-flex justify-content-center">
            <div class="custom-form">
              <input type="text" name="text" autocomplete="off" v-model="formdata.name" />
              <label for="text" class="label-name">
                <span class="content-name"> Name </span>
              </label>
            </div>
          </div>
          <div class="my-3 d-flex justify-content-center">
            <div class="custom-form">
              <input type="text" name="text" autocomplete="off" v-model="formdata.email" />
              <label for="text" class="label-name">
                <span class="content-name"> Email </span>
              </label>
            </div>
          </div>
          <div class="my-3 d-flex justify-content-center">
            <div class="custom-form">
              <input type="text" name="text" autocomplete="off" v-model="formdata.password" />
              <label for="text" class="label-name">
                <span class="content-name"> Mật khẩu </span>
              </label>
            </div>
          </div>
          <div class="px-3 py-2">
            <custom-btn-1 :customContent="SignUptext" type="submit"></custom-btn-1>
          </div>
          <!-- Điều Khoản -->
          <div class="pb-2 col-7">
            <span class="custom-font-size-1 px-2">By signing up, you agree to the 
              <span class="text-decoration-underline">Term of use </span>and
              <span class="text-decoration-underline">Privacy Policy</span>.
            </span>
          </div>
          <div class="border-top border-secondary col-9 my-5 "></div>
          <div class=" px-2 py-2 ">
            <span class="custom-font-size">Bạn đã có tài khoản? Hãy <router-link :to="'/'"
                class="text-link fw-bold txt-green">đăng nhập</router-link> </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import customBtn1 from '../../components/button/button_md_radius.vue'
import auth from '../../firebase.js'
import {createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
export default {
  components: {
    customBtn1
  },
  data() {
    return {
      formdata: {
        name: "",
        email: "",
        password: "",

      },
      SignUptext: "Sign up",
    };
  },
  methods: {
    register() {
        createUserWithEmailAndPassword(auth.auth, this.formdata.email, this.formdata.password)
          .then((userCredential) => {
          // Signed up 
          updateProfile(auth.auth.currentUser,{displayName: this.formdata.name })
          const user = userCredential.user;
          console.log("test", user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("test2", error.message);
          // ..
        });

    }
  }
}
</script>
<style scoped>
.form {
  width: 70%;
  position: relative;
  height: 50px;
  overflow: hidden;
}

.form input {
  width: 100%;
  height: 100%;
  color: #000000;
  padding-top: 20px;

  padding-left: 10px;
  font-size: 14px;
  border: none;
  background-color: #ffffff;
}

.form label {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-bottom: 1px solid white;
}

.form label::after {
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
  font-weight: 600;
  padding-left: 10px;
  padding-bottom: 10px;
  margin-bottom: 5px;
  transition: all 0.3s ease;
}

.form input:focus {
  outline: none;
}

.form input:focus+.label-name .content-name,
.form input:valid+.label-name .content-name {
  transform: translateY(-60%);
  font-size: 11px;
  left: 0px;
  color: #000000;
}

.form input:focus+.label-name::after,
.form input:valid+.label-name::after {
  transform: translateX(0%);
}

.custom-font-size {
  font-size: 14px;
}

.custom-font-size-1 {
  font-size: 12px;
}
</style>