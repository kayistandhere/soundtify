import { getAllSong } from "@/firebase/fireStore/fireQuery";
import { defineStore, acceptHMRUpdate } from "pinia";

export const usePlayerStoreStore = defineStore("playerStore", {
  state: () => ({
    audio: new Audio(),
    tracks: [],
    currentTrackIndex: 0,
    duration: null,
    currentTime: 0,
    currentSong: null,
    isPlaying: false,
    replayOne: false
  }),
  getters: {

  },
  actions: {
    play() {
      if(this.isPlaying) {
        return;
      }
      this.isPlaying = true;
      this.currentSong = this.tracks[this.currentTrackIndex];
      this.audio.src = this.currentSong.url + "&token=" +this.currentSong.token;
      this.audio.load();
      this.audio.play();
    },

    pause() {
      this.audio.pause();
      this.isPlaying = false;
    },

    stop() {
      this.tracks = [];
      this.currentTrackIndex = 0;
      this.duration = null;
      this.currentTime = 0;
      this.currentSong = null;
      this.isPlaying = false;
    },

    next() {
      this.pause();
      if(this.currentTrackIndex >= this.tracks.length - 1) {
        this.currentTrackIndex = 0;
      } else {
        this.currentTrackIndex += 1;
      }
      this.play()
    },

    previous() {
      this.pause();
      if(this.currentTrackIndex <= 0) {
        this.currentTrackIndex = this.tracks.length - 1;
      } else {
        this.currentTrackIndex -= 1;
      }
      this.play();
    },

    seek(seekingvalue) {
      this.audio.currentTime = (parseInt(this.audio.duration) * seekingvalue) / 100;
    },

    seekAdd(value) {
      this.audio.currentTime += value;
    },

    setReplayMode(replayOne) {
      this.replayOne = replayOne;
    },


    playlistSingleSong(song) {
    console.log(song)
     this.stop();
     this.tracks.push(song);
     console.log(this.currentTrackIndex, song);
     this.play();
    },

    playlistWithPlaylist(value){
    this.stop();
     this.tracks = value;
     this.play();
    },

    async created() {
      this.generateTime();
      this.audio.ontimeupdate = () => {
        this.generateTime();
        this.currentTime = Math.floor(
          (this.audio.currentTime / this.audio.duration) * 100
        );
      };
      this.audio.onended = () => {
        if(this.replayOne) {
          this.play();
        } else {
          this.next();
        }
      }
    },
    debounce(fn, ms) {
      let timer;
      return function () {
        // Nhận các đối số
        const args = arguments;
        const context = this;

        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
          fn.apply(context, args);
        }, ms);
      };
    },
    volume(value){
        this.audio.volume = value
    },
    generateTime() {
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStoreStore, import.meta.hot));
}
