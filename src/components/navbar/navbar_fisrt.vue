<template>
    <nav class="navbar navbar-expand-lg position-relative bg-module">
        <div class="container-fluid ">
            <!-- <a class="navbar-brand fw-bolder custom-text-link_logo fs-3" href="#">Soundtify</a> -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="nav-item p-2">
                        <div class="custom-button_radius d-flex align-items-center">
                            <span class="fs-8 fw-bold" v-if="this.upgradeAccount">Prenium</span>
                            <span class="fs-8 fw-bold" v-else>Soundtify</span>
                        </div>
                    </li>
                    <li class="nav-item p-2">
                        <div class="custom-button_radius d-flex align-items-center">
                            <router-link :to="'/audioSocial'" class="custom-router-link">
                                <span class="fs-8 fw-bold">Soundtify Social</span>
                            </router-link>
                        </div>
                    </li>
                    <li class="nav-item p-2" v-if="!this.artist">
                        <div class="custom-button_radius d-flex align-items-center">
                            <modal-basic></modal-basic>
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
                            <img v-bind:src="this.avatarUser" class="customImages" alt="images user"
                                srcset="" width="40" height="40">
                        </button>
                        <ul class="dropdown-menu dropdown-menu-lg-end custom-dropdown fs-8">
                            <li><router-link class="dropdown-item text-white custom-dropdown-item py-2" :to="'/profile'">Profile</router-link></li>
                            <li><router-link class="dropdown-item text-white custom-dropdown-item py-2" v-if="this.artist" :to="'/musicUploadManagerment'">Upload Music</router-link></li>
                            <li><span class="dropdown-item text-white custom-dropdown-item py-2" v-if="this.artist" @click="reTrackManagerment()">Track Managerment</span></li>

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
import { getArtistByUser } from '@/firebase/fireStore/fireQuery.js';
import auth from '../../service/auth/auth.js'
import modalBasic from '../modal/modal-basic.vue';
import { useAuthStoreStore } from '@/store/authStore.js';
import { defaultAvatar } from '@/util/global.js';
import { mapActions , mapState , mapWritableState } from 'pinia';
import { useToast } from "vue-toastification";
import firebase from '@/firebase.js';
export default {
    components:{
        modalBasic,
    },
    data(){
        return {
            avatarClient: null,
            isLoading : true,
            
        }
    },
    created(){
    },
    methods:{
        logoutAccount(){
             auth.logout();
             const toast = useToast();
            toast.success("logout successfull", {position: "top-left"})
            this.$router.push({name: "login.view"});
        },
       async reTrackManagerment(){
       const id = await getArtistByUser(firebase.auth.currentUser.uid);
       console.log("id artist = " , id[0].id);
        const idArtist = {
            'id': id[0].id
        };
        this.$router.push({path : "trackManagerment/" , query : idArtist})
    }
    },
    computed:{
    ...mapActions(useAuthStoreStore , ["toggleArtist"]),
    ...mapState(useAuthStoreStore , ['user']),
    ...mapWritableState(useAuthStoreStore , ['artist']),
    upgradeAccount(){
       return this.user?.subscription != null
    },
    avatarUser(){
        return this.user?.avatar
    },
    
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
/* My custom */
/* When setting CSS, remember that priority increases with specificity, so don't forget to select the existing classes as well */

.Vue-Toastification__toast--default.my-custom-toast-class {
        background-color: red;
    }

    /* Applied to the toast body when using regular strings as content */
    .Vue-Toastification__toast-body.custom-class-1 {
        font-size: 30px;
    }

    /* Applied to a wrapper div when using a custom component as content */
    .Vue-Toastification__toast-component-body.custom-class-2 {
        width: 100%;
    }
</style>