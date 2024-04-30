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
      <tbody>
        <tr class="fs-9 text-white table-items-hover" id="item" :key="song.id" v-for="song in songData">
          <th scope="row">1</th>
          <td>
            <div class="custom_card d-flex align-items-center">
              <img class="custom_Img" :src="song.cover" alt="" srcset="" width="30"
                height="30">
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
import { getSongByArtist ,getSongsWithArray} from '@/firebase/fireStore/fireQuery';
import dropdownFunction from '../dropdown/dropdown_function.vue';
export default {
  components:{
    dropdownFunction,
  },
  props:{
      artistIDValue : String,
      songIDValue :Array,
  },
  data(){
    return {
      songData : [],
    }
  },
  created(){
    this.getSongByQuery();
  },
  methods:{
    getSongByQuery(){
     
      console.log("artist id = " , this.artistIDValue);
      console.log("arr id = " , this.songIDValue);
      if(this.artistIDValue != null){
        const id = this.artistIDValue;
        getSongByArtist(id).then((res) =>{
          this.songData = res;
          console.log("song by artist = ", res);
      })
      }else if(this.songIDValue != null){
        getSongsWithArray(this.songIDValue).then((res) =>{
          this.songData = res;
          console.log("song by array = ", res);
      })
    }else{
      console.log("khong trung ne");
    }
  }
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