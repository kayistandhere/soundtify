export default ({
    audio : new Audio('https://firebasestorage.googleapis.com/v0/b/datn-578a6.appspot.com/o/demo%2Fdownload.mp3?alt=media&token=ca6925e7-50e2-40f8-b4ed-3326b077ae26'),
    playControl(){
        this.audio.play();
    },
    pauseControl(){
        this.audio.pause();
    },
    volumeControl(volume){
        this.audio.volume = volume;
    },
    seekBackward(){
        this.audio.currentTime -= 10;
    },
    seekForward(){
        this.audio.currentTime += 10;
    },
    // time in audio
    realTimeSeeking(seekSlider){
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        seekSlider.value = progress;
    },
    // time to change audio
    seekingChange(seekSlider) {
        const seekTo = (this.audio.duration * seekSlider.value) / 100;
        this.audio.currentTime = seekTo;
    },   
})