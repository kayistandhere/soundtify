<template>
  <div class="container-fluid text-secondary bg-module rounded" style="height: 100vh">
    <div class="d-flex justify-content-center align-items-center">
      <div class="col-lg-5 bg-black rounded text-center row justify-content-center mt-5">
        <!-- Sign up with email password -->
        <form @submit.prevent="register" class="row justify-content-center">
          <span class="fs-2 fw-bold text-white my-5">
            Sign up to ...
          </span>

          <div class="d-flex">
            <!-- Name -->
            <div class="col-8 px-1 py-2">
              <div class="custom-form">
                <input type="text" name="text" autocomplete="off" required v-model="formData.name" @blur="Validator"
                  />
                <label for="text" class="label-name">
                  <span class="content-name"> Name </span>
                </label>
              </div>
              <span class="fs-8 p-0" v-if="!isCheckValidation">{{this.error.name}}</span>
            </div>
            
            <!-- Sex -->
            <div class="col-4 px-1 py-2">
              <div class="custom-form">
                    <select id="inputState" class="custom-form bg-module-1 border-0 text-white" v-model="this.formData.gender" @blur="Validator">
                      <option selected>male</option>
                      <option>female</option>
                      <option>Non-binary</option>
                      <option>Prefer Not To Say</option>
                    </select>
                  </div>
              <span class="fs-8 p-0" v-if="!isCheckValidation">{{this.error.gender}}</span>
            </div>
          </div>
          <!-- Email -->
          <div class="px-3 py-2">
              <div class="custom-form">
                <input type="text" name="text" autocomplete="off" required v-model="formData.email" @blur="Validator"
                />
                <label for="text" class="label-name">
                  <span class="content-name"> Email </span>
                </label>
              </div>
              <span class="fs-8 p-0" v-if="!isCheckValidation">{{this.error.email}}</span>
            </div>
          <div class="d-flex">
            <!-- phone -->
            <div class="col-9 px-1 py-2">
              <div class="custom-form">
                <input type="text" name="text" autocomplete="off" required v-model="formData.phone" @blur="Validator"
            />
                <label for="text" class="label-name">
                  <span class="content-name"> Phone </span>
                </label>
              </div>
              <span class="fs-8 p-0" v-if="!isCheckValidation">{{this.error.phone}}</span>
            </div>
            <!-- age -->
            <div class="col-3 px-1 py-2">
              <div class="custom-form">
                <input type="number" autocomplete="off" required v-model="formData.age" @blur="Validator"
                   />
                <label for="text" class="label-name">
                  <span class="content-name"> Age </span>
                </label>
              </div>
              <span class="fs-8 p-0" v-if="!isCheckValidation">{{this.error.age}}</span>
            </div>
          </div>
          <div class="d-flex">
            <!-- Password -->
            <div class="col-6 px-1 py-2">
              <div class="custom-form">
                <input type="password" name="text" autocomplete="off" required v-model="formData.password" @blur="Validator" />
                <label for="text" class="label-name">
                  <span class="content-name"> Password </span>
                </label>
              </div>
              <span class="fs-8 p-0" v-if="!isCheckValidation">{{this.error.password}}</span>
            </div>

            <!-- Comfirm Password -->
            <div class="col-6 px-1 py-2">
              <div class="custom-form">
                <input type="password" name="text" autocomplete="off" required v-model="formData.comfirmPassWord"
                  @blur="Validator" />
                  
                <label for="text" class="label-name">
                  <span class="content-name"> Comfirm password </span>
                </label>
              </div>
              <span class="fs-8 p-0" v-if="!isCheckValidation">{{this.error.comfirmPassWord}}</span>
            </div>
          </div>

          <div class="px-3 py-2">
            <custom-btn-1 :customContent="signUpText" type="submit"></custom-btn-1>
          </div>
          <!-- Điều Khoản -->
          <div class="pb-2 col-7">
            <span class="custom-font-size-1 px-2">By signing up, you agree to the
              <span class="text-decoration-underline">Term of use </span>and
              <span class="text-decoration-underline">Privacy Policy</span>.
            </span>
          </div>
          <div class="border-top border-secondary col-9 my-5"></div>
          <div class="px-2 py-2">
            <span class="custom-font-size">Do you have an account? Let
              <router-link :to="'/'" class="text-link fw-bold txt-green">Login</router-link>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import customBtn1 from "../../components/button/button_md_radius.vue";
import auth from "../../service/auth/auth.js";
import regex from "../../util/regex.js";
import { useToast } from "vue-toastification";
export default {
  components: {
    customBtn1,
  },
  data() {
    return {
      formData: {
        name: "",
        email: "",
        gender: "",
        age: 0,
        phone: "",
        password: "",
        follower : 0 ,
        following : 0 ,
        comfirmPassWord: "",
      },
      error: {
        name: "",
        email: "",
        gender: "",
        age: "",
        phone: "",
        password: "",
        comfirmPassWord: "",
      },
      isCheckValidation: true,
      signUpText: "Sign up",
    };
  },
  methods: {
    register() {
      if(true){
        auth.signUp(this.formData.name, this.formData.email, this.formData.password ,this.formData.gender, this.formData.phone , this.formData.age , this.formData.follower , this.formData.following )
        .then((res) => {
          const toast = useToast();
            toast.success("register a account successfull", {position: "top-left"})
          this.$router.push({ name: "login.view" });
          // ...
        })
        .catch((error) => {
          console.log("test2", error);
          // ..
        });
      }
      
    },
    Validator() {
      switch (key) {
        case value:
          
          break;
      
        default:
          break;
      }
      if (regex.isRequired(this.formData.name)) {
        this.error.name = "Please enter this field";
        this.isCheckValidation = false;
      }else if((this.formData.name).length < 3){
        this.error.name = "Enter more 3 character";
        this.isCheckValidation = false;
      } else {
        this.error.name = "";
      }
      if(regex.isRequired(this.formData.gender)){
        this.error.gender = "Please enter this field";
        this.isCheckValidation = false;
      }else {
        this.error.gender = "";
      }
      if (regex.isRequired(this.formData.email)) {
        this.error.email = "Please enter this field";
        this.isCheckValidation = false;
      } else if (regex.isEmail(this.formData.email)) {
        this.error.email = "Enter incorrect email format";
        this.isCheckValidation = false;
      } else {
        this.error.email = "";
      }
      if (regex.isRequired(this.formData.phone)) {
        this.error.phone = "Please enter this field";
        this.isCheckValidation = false;
      }else{
        this.error.phone = "";
      }
      if (regex.isRequired(this.formData.age)) {
        this.error.age = "Enter this field";
        this.isCheckValidation = false;
      }else if(this.formData.age <= 15 ){
        this.error.age = "Enter this age > 15";
        this.isCheckValidation = false;
      }
      else{
        this.error.age = "";
      }
      if (regex.isRequired(this.formData.password)) {
        this.error.password = "Please enter this field";
        this.isCheckValidation = false;
      } else if (regex.isPassword(this.formData.password)) {
        this.error.password = "Enter incorrect password format";
        this.isCheckValidation = false;
      } else {
        this.error.password = "";
      }
      if (regex.isRequired(this.formData.comfirmPassWord)) {
        this.error.comfirmPassWord = "Please enter this field";
        this.isCheckValidation = false;
      } else if (regex.isPassword(this.formData.comfirmPassWord)) {
        this.error.comfirmPassWord = "Enter incorrect password format";
        this.isCheckValidation = false;
      } else if (this.formData.password != this.formData.comfirmPassWord) {
        this.error.comfirmPassWord = "Password does not match";
        this.isCheckValidation = false;
      } else {
        this.error.comfirmPassWord = "";
      }
      return this.isCheckValidation;
    },
  },
};
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
