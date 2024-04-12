<template>
    <nav class="navbar navbar-expand-lg sticky-md-top bg-module">
        <div class="container-fluid ">
            <!-- <a class="navbar-brand fw-bolder custom-text-link_logo fs-3" href="#">Soundtify</a> -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="nav-item p-2">
                        <div class="custom-button_radius d-flex align-items-center">
                            <span class="fs-8 fw-bold">Music</span>
                        </div>
                    </li>
                    <li class="nav-item p-2">
                        <div class="custom-button_radius d-flex align-items-center">
                            <span class="fs-8 fw-bold">Soundtify Social</span>
                        </div>
                    </li>
                </ul>
                <!-- <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form> -->
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item row align-items-center p-3 ">
                        <div class="custom-button d-flex align-items-center">
                            <span class="material-symbols-rounded p-1 fs-5">download_for_offline</span> <span class="fs-9 fw-bold">install app</span>
                        </div>
                    </li>
                    <li class="nav-item row align-items-center p-3">
                        <div class="custom-button_icon d-flex align-items-center">
                            <span class="material-symbols-rounded fs-5">notifications</span>
                        </div>
                    </li>
                    <li class="nav-item row align-items-center p-3">
                        <div class="btn-group ">
                        <button type="button" class="bg-module border-0" data-bs-toggle="dropdown" aria-expanded="false" >
                            <img v-bind:src="this.avatarClient" class="customImages" alt="images user"
                                srcset="" width="40" height="40">
                        </button>
                        <ul class="dropdown-menu dropdown-menu-lg-end custom-dropdown fs-8">
                            <li><router-link class="dropdown-item text-white custom-dropdown-item py-2" :to="'/profile'">Profile</router-link></li>
                            <li><router-link class="dropdown-item text-white custom-dropdown-item py-2" :to="'/upgradePackage'">Upgrade Package</router-link></li>
                            <li><a class="dropdown-item text-white custom-dropdown-item py-2" href="#">Setting</a></li>
                            <div class="border-top border-secondary col-11 ms-2"></div>
                            <li><a class="dropdown-item text-white custom-dropdown-item py-2" href="#" @click="logoutAccount">Log out</a></li>
                        </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import auth from '../../service/auth/auth.js'
import firebase from '../../firebase.js'
import { getAvatarUser } from '@/firebase/storage/storageQuery.js';
import { getDownloadURL, StorageReference, uploadBytes , ref , listAll } from "firebase/storage";
export default {
    data(){
        return {
            avatarClient: null,
        }
    },
    created(){
        this.avatarUser();
        
        
    },
    methods:{
        logoutAccount(){
             auth.logout();
            this.$router.push({name: "login.view"});
        },
      async avatarUser(){
         await  getAvatarUser().then((res) =>{
            this.avatarClient = res
          })
        }
    },
}
</script>

<style scoped>
.customImages {
    object-fit: cover;
    border-radius: 50%;
}
.custom-button {
    border-radius: 30px;
    padding: 1px 10px 1px 10px;
    border: none;
    color: #fff;
    background: #000000;
}
.custom-button_radius {
    border-radius: 30px;
    padding: 3px 10px 3px 10px;
    border: none;
    color: #fff;
    background: #000000;
}
.custom-button_icon {
    border-radius: 30px;
    padding: 5px 6px 5px 6px;
    border: none;
    color: #fff;
    background: #000000; 
}
.custom-text-link_logo {
  color: #17cf5b;
  opacity: 0.7;
}
.custom-text-link_logo:hover {
  color: #17cf5b;
  opacity: 1;
}
.custom-dropdown {
    border-radius: 0px;
    background-color: var(--color-gray1);
}
.custom-dropdown-item {
    color: #fff;
    background-color: var(--color-gray1);
    opacity: 0.9;
    
}
.custom-dropdown-item:hover {
    color: #fff;
    background-color: #2e2d2d;
    opacity: 1;
}
</style>