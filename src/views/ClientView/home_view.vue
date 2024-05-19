<template>
    <div class="container-fluid text-secondary bg-module rounded overflow-auto">
        <navbar-fisrt></navbar-fisrt>
        <section v-if="!this.upgradeAccount">
            <div class="d-flex justify-content-center" >
                <img src="../../assets/Images/Background/banner.jpg"  alt="" srcset="">
            </div>
           
        </section>
        <section>
            <div class="d-flex justify-content-between">
                <span class="fs-4 fw-bolder text-white"><a class="custom-text-link" href="#">Today's biggest his</a></span>
                <span class="fs-9 fw-bold "><a class="custom-text-link" href="#">show all</a></span>
            </div>
                <card-item-song></card-item-song>
        </section>
        <section>
            <div class="d-flex justify-content-between">
                <span class="fs-4 fw-bolder text-white"><a class="custom-text-link" href="#">Popular artists</a></span>
                <span class="fs-9 fw-bold "><a class="custom-text-link" href="#">show all</a></span>
            </div>
                <card-item-artists></card-item-artists>
        </section>
        <section>
            <footer-1></footer-1>
        </section>
        <section>
            <amp-ad width="100vw" height="320"
                type="adsense"
                data-ad-client="ca-pub-4787357286986736"
                data-ad-slot="8744431583"
                data-auto-format="rspv"
                data-full-width="">
            <div overflow=""></div>
            </amp-ad>
        </section>
    </div>
</template>

<script>
import { useAuthStoreStore } from '@/store/authStore'
import cardItemArtists from '../../components/card/card_item_artists.vue'
import cardItemSong from '../../components/card/card_item_song.vue'
import navbarFisrt from '../../components/navbar/navbar_fisrt.vue'
import auth from '../../firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
import { mapState } from 'pinia'
import footer1 from '@/components/footer/footer_1.vue'
export default {
    components:{
        navbarFisrt,
        cardItemSong,
        cardItemArtists,
        footer1,
        
    },
    created(){
        onAuthStateChanged(auth.auth, (user) =>{
            if(user){
                console.log("Co tai khoan",user); 
            }else {
                console.log("khong co tai khoan", user)
            }     
        })
      
    },
    computed:{
    ...mapState(useAuthStoreStore , ['user']),
    upgradeAccount(){
       return this.user?.subscription != null
    },
    }
}
</script>

<style>

</style>