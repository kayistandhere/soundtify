<template>
    <div class="d-flex" v-if="!isLoading">
            <div class="card custom-bg-card m-2 position-relative custom-cursor" style="width: 12rem;" :key="song.id" 
                v-for="song in dataSong"
                
                @click="redirectSongDetail(song.id,song.artistId)"
                > 
                <img :src="song.cover" class="custom-img-thumbnail p-2" alt="...">
                <div class="p-2">
                    <h5 class="card-title fs-6 fw-bolder text-white">{{ song.name }}</h5>
                    <p class="two-lines fs-8">{{ song.description }}</p>
                </div>
                <div class="custom-btn-position">
                    <div class="custom-btn-play custom-cursor" @click="addSong(song)">
                        <i class="bi bi-play-fill fs-2 text-dark ms-1"></i>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import { getAllSong, getSongsWithArray } from '@/firebase/fireStore/fireQuery';
import { mapActions } from 'pinia';
import { usePlayerStoreStore } from '@/store/playerStore.js';
export default {
    props :{
        arraySong : Array,
    },
    data() {
        return {
            dataSong: [],
            isLoading : true,
        }
    },
    created() {    
        this.limitedDataSong();
    },
    methods:{
        ...mapActions(usePlayerStoreStore , ["playlistSingleSong"]),
        addSong(value){
            console.log("day la bai hat = " , value);
            this.playlistSingleSong(value);
        },
        async limitedDataSong(){
            if(this.arraySong != null){
                console.log("show array song 1= " , this.arraySong);
                this.isLoading = true;  
                this.dataSong = await getSongsWithArray(this.arraySong);
                console.log("show array song 2= " , this.dataSong);
            }else {
                this.isLoading =true ;
                this.dataSong = await getAllSong();
            }
           this.dataSong = this.dataSong.slice(0,6);
           this.isLoading = false
        },
        async redirectSongDetail(id ,artist){
            const value = {
                "id":id,
                "artistId":artist
            }
           this.$router.push({path : `songdetail/` , query : value})
        },
        
        
    },
    computed:{
        
    }
}
</script>
<style scoped>
.custom-img-thumbnail {
    width: 100%;
    height: 180px;
    border-radius: 15px;
    object-fit: cover;
}

.custom-bg-card {
    background-color: #1d1c1c;

}

.custom-btn-play {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #17cf5b;
}

.custom-btn-position {
    position: absolute;
    left: 70%;
    top: 50%;
    display: none;
    transform: translate(-50% -50%);
    background-color: none !important;

}

.custom-bg-card:hover {
    background-color: #2b2b2b;
}

.custom-bg-card:hover .custom-btn-position {
    display: block;
}
</style>