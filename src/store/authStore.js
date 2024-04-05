import Vuex from 'vuex';

const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: null,
  },
  mutations: {
    login(state, user) {
      state.isLoggedIn = true;
      state.user = user;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export default store;