<template>
  <div class="container-fluid text-secondary bg-module rounded" style="height: 100vh;">
    <div class="d-flex justify-content-center align-items-center">
      <div class="col-lg-5 bg-black rounded text-center row justify-content-center mt-5">
        <!-- Sign up with email password -->
        <form @submit.prevent="register" class=" row justify-content-center">
          <span class="fs-2 fw-bold text-white my-5"> Sign up to Soundtify </span>
          <div class="my-3 d-flex justify-content-center">
            <div class="custom-form">
              <input type="text" name="text" autocomplete="off" v-model="formData.name"  @blur="Validator"/>
              <label for="text" class="label-name">
                <span class="content-name"> Name </span>
              </label>
            </div>
          </div>
          <span class="fs-8 p-0 " v-if="!isCheckValidation">{{ this.error.name }}</span>
          <div class="my-3 d-flex justify-content-center">
            <div class="custom-form">
              <input type="text" name="text" autocomplete="off" v-model="formData.email"  @blur="Validator"/>
              <label for="text" class="label-name">
                <span class="content-name"> Email </span>
              </label>
            </div>
          </div>
          <span class="fs-8 p-0 " v-if="!isCheckValidation">{{ this.error.email }}</span>
          <div class="my-3 d-flex justify-content-center">
            <div class="custom-form">
              <input type="text" name="text" autocomplete="off" v-model="formData.password"  @blur="Validator"/>
              <label for="text" class="label-name">
                <span class="content-name"> Mật khẩu </span>
              </label>
            </div>
          </div>
          <span class="fs-8 p-0 " v-if="!isCheckValidation">{{ this.error.password }}</span>
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
import auth from '../../service/auth/auth.js'
import regex from '../../util/regex.js'
export default {
  components: {
    customBtn1
  },
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
      },
      error:{
          name : "",
          email: "",
          password: "",
        },
      isCheckValidation : true,
      SignUptext: "Sign up",
    };
  },
  methods: {
    register() {
        auth.signUp(this.formData.name,this.formData.email, this.formData.password)
          .then((res) => {
            this.$router.push({name : "login.view"});
            console.log("dangky thanh cong ", res);
          // ...
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log("test2", errorMessage);
          // ..
        });

    },
    Validator(){
      if(regex.isRequired(this.formData.name)){
        this.error.name = "Please enter this field"
        this.isCheckValidation = false;
      }else if(regex.isUsername(this.formData.name)){
        this.error.name = "Please enter 3 or more characters"
        this.isCheckValidation = false;
      }else {
        this.error.name = "";
      }
      if(regex.isRequired(this.formData.email)){
        this.error.email = "Please enter this field"
         this.isCheckValidation = false;
      }else if(regex.isEmail(this.formData.email)){
        this.error.email = "Enter incorrect email format";
         this.isCheckValidation = false;
      }else {
        this.error.email = "";
      }
      if(regex.isRequired(this.formData.password)){
        this.error.password = "Please enter this field";
         this.isCheckValidation = false;
      }else if(regex.isPassword(this.formData.password)){
        this.error.password = "Enter incorrect password format";
         this.isCheckValidation = false;
      }else {
        this.error.password = "";
      }
      return this.isCheckValidation;
    },
  },
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