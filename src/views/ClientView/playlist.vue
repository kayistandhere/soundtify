<template>
    <div class="container-fluid text-white bg-module rounded pb-5">
        <navbar-fisrt></navbar-fisrt>
        <div class="d-flex text-white align-items-end">
            <img :src="playlistData.avatarPlaylist" class="rounded m-2 custom-img-animation" alt="" srcset=""
                width="220" height="220">
            <div class="ms-2">
                <span class="fs-9 ">Playlist</span>
                <h1 class="custom-text-title fw-bolder">{{ playlistData.name }}</h1>
                <span class="fs-8">{{ playlistData.name }}</span>
                <div class="d-flex align-items-center">
                    <span class="fs-8">Soundtify</span><span class="material-symbols-rounded fs-8 p-2">blur_on</span>
                    <span class="fs-8">song,</span> <span class="fs-8"> about hour min</span>
                </div>
            </div>
        </div>
        <!-- function play -->
        <div class="d-flex justify-content-between align-items-center m-2">
            <div class="d-flex align-items-center">
                <div class="custom-btn-play mx-2 custom-cursor" @click="this.playlistWithPlaylist(allPlaylist)">
                    <i class="bi bi-play-fill fs-3 text-dark ms-1"></i>
                </div>
                <span class="material-symbols-rounded fs-1 mx-4 txt-green">favorite</span>
                <div class="dropdown">
                <span class="material-symbols-rounded fs-2 mx-2 custom-cursor" id="playlistFunction" data-bs-toggle="dropdown">more_horiz</span>
                <ul class="dropdown-menu custom-dropdown fs-8" aria-labelledby="playlistFunction">
                            <li><a class="dropdown-item custom-dropdown-item text-white custom-cursor" @click="removePlaylist">delete playlist</a></li>
                        </ul>
            </div>
            </div>
            <div class="d-flex align-items-center">
                <span class="fs-8 mx-1">List</span>
                <span class="material-symbols-rounded fs-5">format_list_bulleted</span>
            </div>
        </div>
        <!-- Table Music -->
        <section>
            <table-items-border v-if="!this.isLoading" :arraySong="this.playlistData.songs"></table-items-border>
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
import footer1 from '../../components/footer/footer_1.vue'
import { getPlaylistById , getSongsWithArray, getUserById , deletePlaylist } from '@/firebase/fireStore/fireQuery'
import { mapActions } from 'pinia'
import { usePlayerStoreStore } from '@/store/playerStore'
export default {
    components: {
        navbarFisrt,
        footer1,
        tableItemsBorder
    },
    data() {
        return {
            playlistData : {},
            user :{},
            isLoading : false , 
            allPlaylist : []          
        }
    },
    created() {
        this.playlist();
    },
    methods: {
        ...mapActions(usePlayerStoreStore , ["playlistWithPlaylist"]),
       async playlist(){
        this.isLoading = true;
        const id = this.$route.query.id;
        this.playlistData = await getPlaylistById(id)
        this.allPlaylist = await getSongsWithArray(this.playlistData.songs)
        this.user = await getUserById(this.playlistData.extraData.ownerId)
        this.isLoading = false;
       },
       removePlaylist(){
            deletePlaylist(this.playlistData.id).then((res) =>{
                console.log(res);
                this.$router.replace({path : "/home"})
            }).catch((error) =>{
                console.log(error);
            })
       }
    },
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