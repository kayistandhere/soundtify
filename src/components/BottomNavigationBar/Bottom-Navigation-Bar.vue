<template>
  <div class="d-flex align-items-center justify-content-between" >
        <!-- profile music -->
        <div class="nav-item d-flex align-items-center ps-3 col-2">
          <track-item-card-albums-2 v-if="this.currentSong != null" class="text-white" :images="currentSong.cover" :nameSong="currentSong.name"
            :artistId="currentSong.artistId"></track-item-card-albums-2>
        </div>
        <!-- control music -->
        <div class="nav-item d-block col-4">
          <div class="function_control_music d-flex justify-content-center align-items-center">
            <span class="material-symbols-rounded p-2 text-white fs-4 custom-opacity">shuffle</span>
            <span class="material-symbols-rounded p-2 text-white fs-2 custom-opacity"
              @click="this.onSeekBackward">replay_10</span>
            <span class="material-symbols-rounded p-2 text-white fs-2 custom-opacity"
              @click="this.previous">skip_previous</span>

            <span class="material-symbols-rounded p-2 text-white fs-2 custom-opacity " @click="this.play"
              v-if="!this.isPlaying">play_arrow</span>
            <span class="material-symbols-rounded p-2 text-white fs-2 custom-opacity" @click="this.pause" v-else>pause</span>
            <span class="material-symbols-rounded p-2 text-white fs-2 custom-opacity"
              @click="this.next">skip_next</span>
            <span class="material-symbols-rounded p-2 text-white fs-2 custom-opacity"
              @click="this.onSeekForward">forward_10</span>
            <span class="material-symbols-rounded p-2 text-white fs-4 custom-opacity">replay</span>
          </div>
          <div class="d-flex align-items-center">
            <span class="fs-9 mx-2 text-white"></span>
            <input type="range" class="slider" min="0" :max="this.duration" step="1" v-model="this.seekingData"
              :value="this.currentTime" @mouseup="onSeekSliderChange">
            <span class="fs-9 ms-2 text-white" >{{ this.duration }}</span>
          </div>

        </div>
        <!-- function control music -->
        <div class="nav-item d-flex d-flex align-items-center px-3 col-2">
          <span class="material-symbols-rounded p-1 text-white fs-5 custom-opacity">mic</span>
          <span class="material-symbols-rounded p-1 text-white fs-5 custom-opacity">list_alt</span>
          <span class="material-symbols-rounded p-1 text-white fs-5 custom-opacity">devices_other</span>
          <span class="material-symbols-rounded p-1 text-white fs-5 custom-opacity">brand_awareness</span>
          <input type="range" class="slider" min="0" max="1" step="0.01" v-model="this.volumeValue" @input="onVolume">
        </div>
      </div>
</template>

<script>
import { mapActions , mapWritableState , mapState } from 'pinia';
import { usePlayerStoreStore } from '@/store/playerStore';
import trackItemCardAlbums2 from '../card/track_item_card_albums_2.vue';
export default {
    components:{
        trackItemCardAlbums2
    },
    data(){
        return {
            debouncedSeekingChange: null,
            seekingData: this.currentTime,
            volumeValue: 0.5,
            playOrPause: false,
            total: null,
        }
    },
    async created(){
        this.created();
    },
    methods:{
        ...mapActions(usePlayerStoreStore, [
      'created',
      'play',
      'pause',
      'volume',
      'seekAdd',
      'seekForward',
      'previous',
      'next',
      'seek',
      'debounce',
      'generateTime'
    ]),
    createTracks() {
      this.created();
    },
    onVolume() {
      this.volume(this.volumeValue);
    },
    onSeekBackward() {
      this.seekAdd(-10);
    },
    onSeekForward() {
      this.seekAdd(10);
    },
    onSeekSliderChange() {
      this.seek(this.seekingData);
    },
    },
    computed:{
    ...mapWritableState(usePlayerStoreStore, ["currentSong" , 'isPlaying']),
    ...mapState(usePlayerStoreStore, ["currentTime", "duration" , 'currentSong'])
    }

}
</script>

<style>

</style>