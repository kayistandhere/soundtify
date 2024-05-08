<template>
    <div class="container-fluid text-secondary bg-module rounded">
        <navbar-fisrt></navbar-fisrt>
        <section>
            <div class="d-flex justify-content-between">
                <span class="fs-4 fw-bolder text-white"><a class="custom-text-link" href="#">Today's biggest his</a></span>
                <span class="fs-9 fw-bold "><a class="custom-text-link" href="#">show all</a></span>
            </div>
            <div class="d-flex">
                <card-item-song></card-item-song>
            </div>
        </section>
        <section>
            <div class="d-flex justify-content-between">
                <span class="fs-4 fw-bolder text-white"><a class="custom-text-link" href="#">More of what you like</a></span>
                <span class="fs-9 fw-bold "><a class="custom-text-link" href="#">show all</a></span>
            </div>
            <div class="d-flex">
                <card-item-song></card-item-song>
            </div>
        </section>
        <section>
            <div class="d-flex justify-content-between">
                <span class="fs-4 fw-bolder text-white"><a class="custom-text-link" href="#">Popular artists</a></span>
                <span class="fs-9 fw-bold "><a class="custom-text-link" href="#">show all</a></span>
            </div>
            <div class="d-flex">
                <card-item-artists></card-item-artists>
            </div>
        </section>
        <section>
            <!-- <amp-ad width="100vw" height="320" google-adtest="on"
                type="adsense"
                data-ad-client="ca-pub-4787357286986736"
                data-ad-slot="8744431583"
                data-auto-format="rspv"
                data-full-width="">
            <div overflow=""></div>
            </amp-ad> -->
        </section>
    </div>
</template>

<script>
import cardItemArtists from '../../components/card/card_item_artists.vue'
import cardItemSong from '../../components/card/card_item_song.vue'
import navbarFisrt from '../../components/navbar/navbar_fisrt.vue'
import auth from '../../firebase.js'
import { onAuthStateChanged } from 'firebase/auth'

export default {
    components:{
        navbarFisrt,
        cardItemSong,
        cardItemArtists,
        
    },
    created(){
        onAuthStateChanged(auth.auth, (user) =>{
            if(user){
                console.log("Co tai khoan",user); 
            }else {
                console.log("khong co tai khoan", user)
            }     
        })
      
    }
}
</script>

<style>

</style>