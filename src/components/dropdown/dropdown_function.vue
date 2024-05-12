<template>
    <div class="btn-group">
        <button type="button" class="bg-transparent border-0" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="material-symbols-rounded text-white fs-5">more_horiz</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-lg-end custom-dropdown fs-8 text-white p-0">
            <li class="d-flex align-items-center dropdown-item custom-dropdown-item" id="dropstart">
                <span class="material-symbols-rounded py-1 px-1 text-white fs-5">add</span>
                <span class=" py-1" >
                        Thêm vào danh sách phát
                    <ul id="dropstart-menu">
                        <li :key="playlist" v-for="playlist in dataPlaylist" @click="updateSongToPlaylist(playlist)"><span class="dropdown-item text-white custom-dropdown-item py-2">{{ playlist.name }}</span></li>
                    </ul>
                </span>
            </li>
            <li class="d-flex align-items-center dropdown-item custom-dropdown-item">
                <span class="material-symbols-rounded py-1 px-1 fs-5">add_circle</span>
                <span class=" py-1 text-white">Add to playlist</span>
            </li>
            <li class="d-flex align-items-center dropdown-item custom-dropdown-item">
                <span class="material-symbols-rounded py-1 px-1 fs-5">share</span>
                <span class=" py-1 text-white">Chia sẻ</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { getAllPlaylist, updatePlaylist } from '@/firebase/fireStore/fireQuery';
import { useToast } from 'vue-toastification';
export default {
    props:{
        idSong : String,
    },
    data(){
        return{
            dataPlaylist : {}
        }
    },
    created(){
        this.allPlaylist();
    },
    methods:{
        allPlaylist(){
            getAllPlaylist().then((res) =>{
                this.dataPlaylist = res;
        })  
        },
        updateSongToPlaylist(playlist){
            const toast = useToast();
            updatePlaylist(playlist,this.idSong).then(() => {
            toast.success("playlist update successfull", {position: "top-left"})
        }).catch(() => {
            toast.error("playlist update false", {position: "top-left"})
        });
        }
        
    }
}
</script>

<style>
.custom-dropdown {
    border-radius: 0px;
    background-color: var(--color-gray1);
}

.custom-dropdown-item {
    color: #fff;
    background-color: var(--color-gray1);
    opacity: 0.9;
    cursor: pointer;
}
.custom-dropdown-item:hover {
    color: #fff;
    background-color: #2e2d2d;
    opacity: 1;
}
#dropstart-menu {
    position: absolute;
    display: none;
    list-style-type: none;
    margin-left: -150px;
    margin-top: -30px;
    z-index: 1;
}
#dropstart:hover #dropstart-menu {
    display: block;
}
</style>