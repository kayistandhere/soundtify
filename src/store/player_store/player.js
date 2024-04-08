export default {
  audio: new Audio(),
  tracks: [
    {
      source:
        "https://firebasestorage.googleapis.com/v0/b/datn-578a6.appspot.com/o/demo%2Fdownload.mp3?alt=media&token=ca6925e7-50e2-40f8-b4ed-3326b077ae26",
    },
    {
      source:
        "https://firebasestorage.googleapis.com/v0/b/datn-578a6.appspot.com/o/demo%2FNangChenTieuSau.mp3?alt=media&token=fe9cb6c9-9b56-43f4-afbb-220ea510097a",
    },
  ],
  currentTrackIndex: 0,
  duration: null,
  currentTime: 0,
  currentTrack: 0,
  isTimerPlaying: false,

  
  // function
  created() {
    this.audio.src = this.tracks[this.currentTrackIndex].source;
    this.generateTime();
    this.audio.ontimeupdate = () => {
      this.generateTime();
      this.currentTime = Math.floor(
        (this.audio.currentTime / this.audio.duration) * 100
      );
      console.log("currentTime", this.currentTime);
    };
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
};
