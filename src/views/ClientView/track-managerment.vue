<template>
    <section >
        <table class="table text-white">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">artist</th>
                    <th scope="col">thumbnail</th>
                    <th scope="col">description</th>
                    <th scope="col">duration</th>
                    <th scope="col">viewer</th>
                    <th scope="col">action</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="song.id" v-for="song in songData">
                    <th scope="row">1</th>
                    <td scope="row">{{ song.name }}</td>
                    <td scope="row">{{ song.artistId }}</td>
                    <td scope="row"><img :src="song.cover" alt="thumbnail-song" class="custom-images"></td>
                    <td scope="row">{{ song.description }}</td>
                    <td scope="row">{{ song.duration }}</td>
                    <td scope="row">{{ song.viewer }}</td>
                    <td scope="row">
                        <button type="button" class="btn btn-primary mx-1" @click="updateSongEvent(song.id)">update</button>
                        <button type="button" class="btn btn-danger" @click="deleteSongEvent(song.id)">delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>

</template>

<script>
import { deleteSong, getAllSong } from '@/firebase/fireStore/fireQuery';

export default {
    name: "track-managerment",
    data() {
        return {
            songData: {}
        }
    },
    created() {
        this.getDataSong();
    },
    methods: {
        updateSongEvent(){},
        deleteSongEvent(id){
                console.log("show id = " ,id);
                deleteSong(id).then((res) =>{
                    console.log("delete song successfull !" , res);
                    this.getDataSong();
                }).catch((error) =>{
                    console.log("delete track something false" , error);
                })
        },
        getDataSong(){
            getAllSong().then((res) => {
            this.songData = res
        })
        }
        
    },
    computed: {
        // pagination(){
        //     const itemsPerPage = 10;
        //     const currentPage = 1;
        //     for(let i = 0 ; i < this.songData.length ; i++){
        //         if(i >= (currentPage - 1) * itemsPerPage && i < currentPage * itemsPerPage){

        //         }
        //     }
        // }
    }
}
</script>

<style scoped>
.custom-images {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 5px;
}
</style>