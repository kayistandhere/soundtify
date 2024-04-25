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
        <tr class="fs-9 text-white table-items-hover" :key="song" v-for="song in listSongByArtist">
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
          <td>{{ song.duration }}</td>
        </tr>
  
      </tbody>
    </table>
  </div>
</template>

<script>
import { getSongByArtist } from '@/firebase/fireStore/fireQuery';
export default {
  data(){
    return {
        listSongByArtist : [],
        hours : 0,
        minutes: 0,
        seconds: 0,
    }
  },
  created(){

  },
  methods:{
    msToTime(duration) {
    const milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    this.hours = (hours < 10) ? "0" + hours : hours;
    this.minutes = (minutes < 10) ? "0" + minutes : minutes;
    this.seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
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
</style>