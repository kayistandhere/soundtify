<template>
    
           <div class=" d-flex justify-content-center align-items-center bg-module" style="height:100vh;">
            <div class="d-block justify-content-center">
                <div>
                    <span class="material-symbols-rounded fs-1 text-success">new_releases</span>
                </div>
            <h1 class="text-success custom-size">Payment Successfull !! </h1>
            <router-link :to="'/home'"><button-md-radius :customContent="back"></button-md-radius></router-link>
            </div>
            

       
       
    </div>
</template>

<script>
import buttonMdRadius from '@/components/button/button_md_radius.vue';
export default {
    components:{
        buttonMdRadius,
    },
    data(){
        return {
            back : "back"
        }
    }
}
</script>

<style>
.custom-size {
    font-size: 50px;
}
</style>