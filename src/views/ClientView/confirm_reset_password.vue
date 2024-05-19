<template>
        <div class="container-fluid text-secondary bg-module rounded" style="height: 100vh;">
      <div class="d-flex justify-content-center align-items-center">
        <div class="col-lg-5 bg-black rounded text-center row justify-content-center mt-5">
          <!-- Sign up with email password -->
          <form @submit.prevent="resetConfirmPassword" class=" row justify-content-center">
            <span class="fs-2 fw-bold text-white mt-5"> Enter your new password </span>
            <div class=" px-2 col-7">
              <span class="custom-font-size">Enter your email address or username, and we'll send you a link to get back into your account.</span>
            </div>
            <div class="my-3 d-flex justify-content-center">
              <div class="row py-1">
                    <div class="col-6 px-1">
                      <div class="custom-form">
                        <input type="text" name="text" id="email" required class="bg-module-1"
                          v-model="this.newPassword"/>
                        <label for="text" class="label-name">
                          <span class="content-name text-dark"> New Password </span>
                        </label>
                      </div>
                    </div>
                    <div class="col-6 px-1">
                      <div class="custom-form">
                        <input type="text" name="text" id="email" required class="bg-module-1"
                          v-model="this.passwordConfirm" />
                        <label for="text" class="label-name">
                          <span class="content-name text-dark"> Confirm Password</span>
                        </label>
                      </div>
                    </div>
                  </div>
            </div>
            <div class="px-3 py-2 col-8 d-flex justify-content-between">
              <router-link :to="'/'"><btn-lg-radius :customContent="backText"></btn-lg-radius></router-link>
              <button-md-radius :customContent="forgotText"></button-md-radius>
            </div>
            
            <div class="border-top border-secondary col-9 my-5 "></div>
            
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import buttonLgRadius from "@/components/button/button_lg-radius.vue";
import buttonMdRadius from "@/components/button/button_md_radius.vue";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { useToast } from "vue-toastification";
import auth from '@/service/auth/auth.js'
import firebase from '@/firebase.js'
export default {
    components:{
      buttonLgRadius,
      buttonMdRadius
    },
    data(){
        return {

            newPassword : "",
            passwordConfirm: "",
            backText : "Confirm Password",
            forgotText : "forgotText"
        }
        
    },
    created(){
        this.getLink()
    },
    methods: {
        getLink(){
            
        },
        async resetConfirmPassword(){
          try{
            await auth.resetPassword(this.$route.query.oobCode , this.newPassword)
            this.$router.push({path : "/"});
          }catch(error){
            const toast = useToast();
            console.log(error);
            toast.error(error);
          }
          
        }
    }
}
</script>

<style>

</style>