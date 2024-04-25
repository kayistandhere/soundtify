<template>
  <div class="bg-module">
    <navbar-first></navbar-first>
    <!-- POST -->
    <section> 
    <div class="col-12 p-2 text-white">
        <div class="">
            <img src="../../assets/Images/Artists/PhucDu.jpg" class="rounded" alt="avatar-user" height="50" width="50">
            <span class="fs-6 fw-bold ms-3">KayiStantHere</span>
            <div class="my-2 d-flex justify-content-center">
                <div class="custom-form">
                    <input type="text" name="text" id="email" required class="bg-module-1"/>
                    <label for="text" class="label-name">
                        <span class="content-name text-dark"> Post short audio here! ... </span>
                    </label>
                </div>
            </div>
        </div>         
    </div>
</section>
<!-- REACTION POST -->
<section>
    <div class="col-12 p-2 text-white">
        <div class="d-flex justify-content-between">
            <div>
                <img src="../../assets/Images/Artists/PhucDu.jpg" class="rounded" alt="" height="50" width="50">
                <span class="fs-6 fw-bold ms-3">KayiStantHere</span>
            </div>
            <div class="p-2">
                <span class="material-symbols-rounded fs-2">more_horiz</span>
            </div>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur, adipisic
            ing elit. Atque, libero vol
            uptatum minima officia optio nostrum quibusdam 
            cum maiores itaque non hic officiis modi ipsa ne
            mo ratione tenetur doloremque aliquam vero.
        </p>
        <audio controls class="col-12 bg-module">
            <source src="horse.ogg" type="audio/ogg">
            <source src="horse.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        <div class="d-flex">
            <span class="material-symbols-rounded p-3 fs-4 text-danger">favorite</span>
            <span class="material-symbols-rounded p-3 fs-4">chat_bubble</span>
            <span class="material-symbols-rounded p-3 fs-4">send</span>
        </div>
        
    </div>
</section>
  </div>
</template>

<script>
import navbarFirst from '@/components/navbar/navbar_fisrt.vue';
export default {
    components:{
        navbarFirst
    }
}
</script>

<style>

</style>