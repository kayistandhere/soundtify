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
              <div class="custom-form">
                <input type="text" name="text" autocomplete="off" v-model="passwordConfirm" />
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
export default {
    data(){
        return {
            mode: {},
            oobCode: {},
            passwordConfirm: "",
            backText : "Confirm Password"
        }
        
    },
    created(){
        this.getLink()
    },
    methods: {
        getLink(){
            this.mode =  this.$route.query.mode;
            this.oobCode = this.$route.query.oobCode;
            console.log(this.mode);
            console.log(this.oobCode);
        },
        resetConfirmPassword(){

        }
    }
}
</script>

<style>

</style>