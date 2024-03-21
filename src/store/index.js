import { createStore } from 'vuex'

export default createStore({
  // dữ liệu
  state: {
    currentUser : null,
    audio: new Audio('https://firebasestorage.googleapis.com/v0/b/datn-578a6.appspot.com/o/demo%2Fdownload.mp3?alt=media&token=ca6925e7-50e2-40f8-b4ed-3326b077ae26'),
        currentTime: 0,
        isInitialized: false,
        count: 0,
  },
  // lấy dữ liệu
  getters: {
    count: state => state.count,
    currentTime: state => state.currentTime
  },
  // thay đổi chức năng
  mutations: {
    increment: (state) => {
      state.count++;
  },
    updateCurrentTime: (state, value) => {
      state.currentTime = value;
  },
    initialize: (state) => {
      state.isInitialized = true;
  }
  },
  // thực hiện thao tác , thực hiện gián tiếp
  actions: {
    increment({commit}) {
      commit('increment');
  },
  plays() {
      if(this.state.isInitialized) {
          this.state.audio.addEventListener('timeupdate', () => {
              this.commit('updateCurrentTime', this.state.audio.currentTime);
          });
          this.commit('initialize');
      }
      this.state.audio.play();
  },
    
  },
  // lấy module
  modules: {
      
  }
})
