<template>
  <div class="container-fluid text-secondary bg-module rounded" style="height: 100vh;">
    <div class="d-flex justify-content-center align-items-center">
      <div class="col-lg-5 bg-black rounded text-center row justify-content-center mt-5">
        <span class="fs-2 fw-bold text-white my-5"> Log in to Soundtify </span>
        <!-- Login with google -->
        <div class="row justify-content-center"  @click="loginWithGoogle">
          <btn-logo-radius :customContent="loginwidthGoogle"></btn-logo-radius>
        </div>
       
        <div class="border-top border-secondary col-9 my-5 "></div>
        <!-- Login with email and password -->
        <form @submit.prevent="login" >
          <div class="my-4 d-flex justify-content-center">
            <div class="custom-form">
              <input type="text" name="text"  v-model="formData.email" @blur="!isValidEmail" v-bind:class="{ 'is-invalid': error.email }" />
              <label for="text" class="label-name">
                <span class="content-name"> Email </span>
              </label>
              
            </div>
            <span v-if="!isValidEmail">Please enter a valid email address.</span>
          </div>
          <div class="my-4 d-flex justify-content-center">
            <div class="custom-form">
              <input type="text" name="text"  v-model="formData.password" />
              <label for="text" class="label-name">
                <span class="content-name"> Mật khẩu </span>
              </label>
            </div>
            <span v-if="!isValidPassword">Password must be at least 6 characters long.</span>
          </div>
          <div class="px-3 py-2">
            <!-- <button class="custom_btn_1 py-2" type="submit">
              Log in
            </button> -->
            <btn-Md-Radius :customContent="logintext" :disabled="!isValidForm" ></btn-Md-Radius>
          </div>
        </form>

        <div class="pb-2">
          <span class="fs-6 px-2">Or
            <span class="text-decoration-underline fs-7 "><router-link class="txt-green fs-7" :to="'/forgotpassword'">forgot password</router-link></span>
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
import btnMdRadius from '../../components/button/button_md_radius.vue'
import btnLogoRadius from '../../components/button/button_logo_radius.vue'
import auth from "../../service/auth/auth.js";
export default {
  components:{
    btnLogoRadius,
    btnMdRadius,
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
      loginwidthGoogle: "Login With Google"
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
      if(this.isValidForm){
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
  computed: {
    isValidEmail() {
      // Simple email validation
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email);
    },
    isValidPassword() {
      // Password length validation
      return this.formData.password.length >= 6;
    },
    isValidForm() {
      // Check if both email and password are valid
      return this.isValidEmail && this.isValidPassword;
    }
  },
};
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
