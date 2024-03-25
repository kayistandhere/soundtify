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
        <form @submit.prevent="login" id="form-1">
          <div class="my-2 d-flex justify-content-center">
            <div class="custom-form">
              <input type="text" name="text" id="email"  v-model="formData.email" @blur="Validator"/>
              <label for="text" class="label-name">
                <span class="content-name"> Email </span>
              </label>
            </div>
          </div>
          <span class="fs-8 p-0 " v-if="!isCheckValidation">{{ this.error.email }}</span>
          

          <div class="my-3 d-flex justify-content-center">
            <div class="custom-form">
              <input type="text" name="text" id="password" v-model="formData.password" @blur="Validator"/>
              <label for="text" class="label-name">
                <span class="content-name"> Mật khẩu </span>
              </label>
            </div>
          </div>
         
          <span class="fs-8 p-0 " v-if="!isCheckValidation">{{ this.error.password }}</span>
          <div class="px-3 py-2">
            <!-- <button class="custom_btn_1 py-2" type="submit">
              Log in
            </button> -->
            <btn-Md-Radius :customContent="logintext" ></btn-Md-Radius>
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
import regex from '../../util/regex.js'
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
      isCheckValidation : true,
      logintext: "Log in",
      loginwidthGoogle: "Login With Google"
    };
  },
  methods: {
    login() {
      if(!this.isCheckValidation){
        auth.signIn(this.formData.email,this.formData.password)
        .then(() => {
          this.$router.push({name: "home.view"});
        })
        .catch((error) => {
          console.log("lỗi", error);
        });
      }else{
        alert("Please check validate form");
      }
    },
   async loginWithGoogle(){
    await  auth.signWithGoogle().then(()=>{
          this.$router.push({name: "home.view"});
      }).catch((error)=>{
        console.log(error);
      })
      
    },
    Validator(){
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
  computed:{
    
    },
    watch:{
     
    }
  
   
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
  .form-message {
      font-size: 1.2rem;
      line-height: 1.6rem;
      padding: 4px 0 0;
    }
</style>
