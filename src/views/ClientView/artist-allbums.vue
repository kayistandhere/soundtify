<template>
    <div class="container-fluid text-white bg-module rounded pb-5">
        <navbar-fisrt></navbar-fisrt>
        <div class="d-flex text-white align-items-end">
            <img :src="this.artist.thumbnail" class="rounded m-2 custom-img-animation" alt="" srcset=""
                width="220" height="220">
            <div class="ms-2">
                <span class="fs-9 ">Allbums</span>
                <h1 class="custom-text-title fw-bolder">{{ artist.name }}</h1>
                <span class="fs-8">{{ artist.name }} , Mck and more </span>
                <div class="d-flex align-items-center">
                    <span class="fs-8">Soundtify</span><span class="material-symbols-rounded fs-8 p-2">blur_on</span>
                    <span class="fs-8">50 song,</span> <span class="fs-8"> about {{ this.hours }} hour {{ this.minutes
                        }} min</span>
                </div>
            </div>
        </div>
        <!-- function play -->
        <div class="d-flex justify-content-between align-items-center m-2">
            <div class="d-flex align-items-center">
                <div class="custom-btn-play mx-2 custom-cursor" @click="this.playlistWithPlaylist(songDetailData)">
                    <i class="bi bi-play-fill fs-3 text-dark ms-1"></i>
                </div>
                <span class="material-symbols-rounded fs-1 mx-4" :style="`color:${this.followData ? '#f30f53' : '#17cf5b'}`" @click="followCheck()">favorite</span>
                <span class="material-symbols-rounded fs-2 mx-2">more_horiz</span>
            </div>
            <div class="d-flex align-items-center">
                <span class="fs-8 mx-1">List</span>
                <span class="material-symbols-rounded fs-5">format_list_bulleted</span>
            </div>
        </div>
        <!-- Table Music -->
        <section>
            <table-items-border :artistIdValue="artistId"></table-items-border>
        </section>
        <!-- Copy Right -->
        <section>

            <p class="fs-8">1 tháng 1, 2023</p>
            <p class="fs-9"><span class="material-symbols-rounded fs-9 px-2">copyright</span>2013 Avicii Music AB, /
                PRMD under exclusive license to Universal Music AB</p>
        </section>
        <!-- Albums for artists -->
        <section>
            <footer-1></footer-1>
        </section>

    </div>
</template>
<script>
import navbarFisrt from '../../components/navbar/navbar_fisrt.vue'
import tableItemsBorder from '../../components/table/table_items_border.vue'
import cardItemSong from '../../components/card/card_item_song.vue'
import footer1 from '../../components/footer/footer_1.vue'
import firebase from '@/firebase.js'
import { usePlayerStoreStore } from '@/store/playerStore'
import { mapActions } from 'pinia'
import { getArtistById, getSongByArtist , getFollow  } from '@/firebase/fireStore/fireQuery'
import { following , unfollow } from '@/util/global'
export default {
    components: {
        navbarFisrt,
        tableItemsBorder,
        cardItemSong,
        footer1
    },
    data() {
        return {
            songDetailData: {},
            artist: {},
            hours: 0,
            minutes: 0,
            seconds: 0,
            artistId : "",
            followData : "" ,
        }
    },
    created() {
        this.artistDetail();
       
        
    },
    methods: {
        ...mapActions(usePlayerStoreStore , ['playlistWithPlaylist']),
        
        async artistDetail() {
            const id = this.$route.query.id;
            const idUser = firebase.auth.currentUser.uid;
            this.artistId = id;
            this.artist = await getArtistById(id)
            this.songDetailData = await getSongByArtist(this.artistId)
            this.msToTime(this.songDetailData.duration);
            await getFollow(id, idUser).then((res) =>{
                this.followData = res.id;
                console.log("show = " , this.followData);
            }).catch((error) =>{
                console.log("xinchao" , error);
                this.followData = null;
            })
        },
        async followCheck(){
           if(this.followData != null){
            this.followData = await unfollow("artist" , this.followData);
           }else{
            this.followData = await following("artist" , this.artistId)
            console.log(this.followData);
           }
        },
        
        msToTime(duration) {
            const   milliseconds = Math.floor((duration % 1000) / 100),
                    seconds = Math.floor((duration / 1000) % 60),
                    minutes = Math.floor((duration / (1000 * 60)) % 60),
                    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
            this.hours = (hours < 10) ? "0" + hours : hours;
            this.minutes = (minutes < 10) ? "0" + minutes : minutes;
            this.seconds = (seconds < 10) ? "0" + seconds : seconds;
            return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
        },

    },
    watch:{
        followData(newValue, oldValue) {
            if(newValue == null){
                this.followData = null;
            }else{
                this.followData = newValue;
            }
    }
}
}
</script>

<style scoped>
.custom-text-title {
    font-size: 72px;
}

.custom-img-animation {
    transform: scale(100%);
    transition: 0.2s ease-in;
    z-index: 999;
}

.custom-img-animation:hover {
    transform: scale(102%);
}

.custom-btn-play {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #17cf5b;
}
</style>