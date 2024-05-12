<template>
  <div class="d-block">
    <table class="table table-borderless text-white">
      <thead>
        <tr class="fs-9 text-start">
          <th scope="col" class="custom-table-title col-1">#</th>
          <th scope="col" class="custom-table-title col-4">Title</th>
          <th scope="col" class="custom-table-title col-3">Albums</th>
          <th scope="col" class="custom-table-title col-2">Date added</th>
          <th scope="col" class="custom-table-title col-1"><span class="material-symbols-rounded fs-8">schedule</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="!this.isLoading">
        <tr class="fs-9 text-white table-items-hover"  id="item" :key="song" v-for="song in this.songData">
          <!-- <th scope="row" class="test">1</th> -->
          <th scope="row" class="custom-cursor"><span class="material-symbols-rounded" @click="addSong(song)">play_arrow</span></th>
          <td>
            <div class="custom_card d-flex align-items-center">
     
              <img class="custom_Img" :src="song.cover" alt="" srcset="" width="30" height="30">
              <div class="">
                <span class="fs-8">{{ song.name }}</span>
                <div class="d-flex align-items-center">
                  <span class=" fs-9">{{ song.artistId }}</span>
                </div>
              </div>
            </div>
          </td>
          <td>Dance Dance Dance</td>
          <td>{{ song.uploadTime }}</td>
          <td class="d-flex">{{ song.duration }}
          <dropdown-function id="dropdown" class="ps-2" :id-song="song.id"></dropdown-function>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getSongByArtist ,getSongById,getSongsWithArray} from '@/firebase/fireStore/fireQuery';
import dropdownFunction from '../dropdown/dropdown_function.vue';
import { defaultAvatar } from '@/util/global';
import { mapActions } from 'pinia';
import { usePlayerStoreStore } from '@/store/playerStore';
import { useToast } from 'vue-toastification';

export default {
  components:{
    dropdownFunction,
  },
  props:{
      artistIdValue : String,
      arraySong : Array,
      songIdValue : String,
  },
  data(){
    return {
      songData : null,
      isLoading : true,
      songById : true,
      stt: 0,
    }
  },
  created(){
    this.getSongByQuery();
    
  },
  methods:{
    ...mapActions(usePlayerStoreStore , ['playlistSingleSong']),
    addSong(value){
      this.playlistSingleSong(value)
    },
    async getSongByQuery(){
      this.isLoading = true;
      if(this.artistIdValue != null){
       this.songData =  await getSongByArtist(this.artistIdValue)
      }else if(this.songIdValue != null){
        this.songById = false;
        this.songData = [await getSongById(this.songIdValue)]
    }else if(this.arraySong != null ){
      this.songData = await getSongsWithArray(this.arraySong)
  }else {
    const toast = useToast();
    toast.info("Not work")
  }
  this.isLoading = false;
  
}
  },
  watch:{
    async songIDValue(value) {
      if (value != null){
        const id = value;
       this.songData = await getSongById(id);
    }
    },
  }
  }
</script>
<style scoped>
.custom-table-title {
  font-weight: 500;
}

.custom_card {
  display: flex;
  border-radius: 5px;
  border: none;
  width: 100%;
}

.custom_Img {
  border-radius: 5px;
  object-fit: contain;
  margin-right: 5px;
}
.table-items-hover {
  opacity: 0.8;
}
.table-items-hover:hover {
  opacity: 1.1;
  background: #3b3b3b;
}
#dropdown {
  display: none;
}
#item:hover #dropdown{
  display: block;
}

</style>