<template>
  <div class="container-fluid text-secondary bg-module rounded" style="height: 100vh;">
    <div class="d-flex justify-content-center align-items-center">
      <div class="col-lg-5 bg-black rounded text-center row justify-content-center mt-5">
        <span class="fs-2 fw-bold text-white my-5"> Log in to Soundtify </span>
        <!-- Login with google -->
        <div class="d-flex justify-content-center align-items-center bg-green" @click="loginWithGoogle">
          <i class="bi bi-google p-2"></i>
          <span>Login with google</span>
        </div>
       
        <div class="border-top border-secondary col-9 my-5 "></div>
        <!-- Login with email and password -->
        <form @submit.prevent="login" >
          <div class="my-4 d-flex justify-content-center">
            <div class="custom-form">
              <input type="text" name="text" autocomplete="off" v-model="formData.email" @blur="validate()" v-bind:class="{ 'is-invalid': error.email }" />
              <label for="text" class="label-name">
                <span class="content-name"> Email </span>
              </label>
              <div class="invalid-feedback text-white">{{ error.email }}</div>
            </div>
          </div>
          <div class="my-4 d-flex justify-content-center">
            <div class="custom-form">
              <input type="text" name="text" autocomplete="off" v-model="formData.password" />
              <label for="text" class="label-name">
                <span class="content-name"> Mật khẩu </span>
              </label>
            </div>
          </div>
          <div class="px-3 py-2">
            <!-- <button class="custom_btn_1 py-2" type="submit">
              Log in
            </button> -->
            <custom-btn-1 :customContent="logintext"></custom-btn-1>
          </div>
        </form>

        <div class="pb-2">
          <span class="fs-6 px-2">Or
            <span class="text-decoration-underline  text-link">forgot password</span>
          </span>
        </div>
        <div class="px-2 py-2 row justify-content-center">
          <div class="border-top border-secondary col-9 my-5 "></div>
          <span class="custom-font-size">Don't have an account?
            <router-link class="txt-green" :to="'/register'">Sign up for Soundtify</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import customBtn1 from '../../components/button/button_md_radius.vue'
import auth from "../../service/auth/auth.js";
export default {
  components:{
    customBtn1
  },
  name: "login",
  data() {
    return {
      error:{
          email: "",
          password: "",
        },
      formData: {
        email: "",
        password: "",
      },
      logintext: "Log in",
    };
  },
  methods: {
    validate() {
        let invalid = true;
        this.error = {
          email: "",
          password: "",
        };

        if (!this.formData.email) {
          this.error.email = "Email is required";
          invalid = false;
        } else if (!this.isEmail(this.formData.email)) {
          this.error.email = "Email to wrong";
          invalid = false;
        }
        if (!this.formData.password) {
          this.error.password = "Password is required";
          invalid = false;
        }
        return invalid;
      },
      isEmail(value) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      },
    login() {
      if(this.validate() == true ){
        auth.signIn(this.formData.email,this.formData.password)
        .then((res) => {
          this.$router.push({name: "home.view"});
          console.log(res.user);
        })
        .catch((error) => {
          console.log("lỗi", error);
        });
      }
    },
    loginWithGoogle(){
      auth.signWithGoogle().then((res) => {
        console.log(res);
        this.$router.push({name: "home.view"});
      }).catch((error) => {
        console.log(error);
      })
    }
  },
};
</script>

<style>
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
