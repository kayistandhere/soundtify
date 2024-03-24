<template>
    <div class="container-fluid text-secondary bg-module rounded" style="height: 200vh;">
        <navbar-fisrt></navbar-fisrt>
        <section>
            <div class="d-flex justify-content-between">
                <span class="fs-4 fw-bolder text-white"><a class="custom-text-link" href="#">Today's biggest his</a></span>
                <span class="fs-9 fw-bold "><a class="custom-text-link" href="#">show all</a></span>
            </div>
            <div class="d-flex">
                <card-item-song></card-item-song>
                <card-item-song></card-item-song>
                <card-item-song></card-item-song>
                <card-item-song></card-item-song>
                <card-item-song></card-item-song>
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
                <card-item-song></card-item-song>
                <card-item-song></card-item-song>
                <card-item-song></card-item-song>
                <card-item-song></card-item-song>
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
                <card-item-artists></card-item-artists>
                <card-item-artists></card-item-artists>
                <card-item-artists></card-item-artists>
                <card-item-artists></card-item-artists>
                <card-item-artists></card-item-artists>
            </div>
        </section>
    </div>
</template>

<script>
import cardItemArtists from '../../components/card/card_item_artists.vue'
import cardItemSong from '../../components/card/card_item_song.vue'
import navbarFisrt from '../../components/navbar/navbar_fisrt.vue'
import auth from '../../firebase.ts'
import { onAuthStateChanged } from 'firebase/auth'
export default {
    components:{
        navbarFisrt,
        cardItemSong,
        cardItemArtists,
    },
    created(){
        onAuthStateChanged(auth.auth, (user) =>{
            console.log("home",user);   
        })
      
    }
}
</script>

<style>

</style>