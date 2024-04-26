import { getAllSong } from '@/firebase/fireStore/fireQuery';
import { defineStore, acceptHMRUpdate } from 'pinia'

export const usePlayerStoreStore = defineStore('playerStore', {
  state: () => ({
    audio: new Audio(),
    tracks: [],
    currentTrackIndex: 0,
    duration: null,
    currentTime: 0,
    currentTrack: 0,
    isTimerPlaying: false,
  }),
  getters: {},
  actions: {
    // function
    async created() {
      await this.getDataSong();
      this.audio.src = this.tracks[this.currentTrackIndex].url;
      this.generateTime();
      this.audio.ontimeupdate = () => {
        this.generateTime();
        this.currentTime = Math.floor(
          (this.audio.currentTime / this.audio.duration) * 100
        );
        console.log("currentTime", this.currentTime);
      };
    },
    getDataSong() {
      getAllSong().then((res) => {
        this.tracks = res
      })
    },
    playControl() {
      this.audio.play();
    },
    pauseControl() {
      this.audio.pause();
    },
    volumeControl(value) {
      this.audio.volume = value;
    },
    seekBackward() {
      this.audio.currentTime -= 10;
    },
    seekForward() {
      this.audio.currentTime += 10;
    },
    prevousSong() {
      this.audio.pause();
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.audio.load();
      this.audio.play();
    },
    nextSong() {
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.audio.pause();
      console.log("test 1", this.currentTrackIndex);
      this.audio.src = this.tracks[this.currentTrackIndex].source;
      console.log("test 2", this.currentTrackIndex);
      this.audio.load();
      this.audio.play();
    },

    // time to change audio
    seekingChange(seekSlider) {
      const seekTo = (parseInt(this.audio.duration) * seekSlider) / 100;
      this.audio.currentTime = seekTo;
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
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStoreStore, import.meta.hot))
}
