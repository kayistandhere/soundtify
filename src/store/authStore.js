import { createStore } from 'vuex'

export default createStore({
    state:{
        currentUser: null,
    },
    getters:{
        currentUser: state => state.currentUser,
        isLoggedIn(state) {
            return state.currentUser !== null;
          },
    },
    mutations:{
        setUpdateCurrentUser:(state , value) =>{
            state.currentUser = value
        }
    },
    actions:{
        oncurrentUserChange({commit} , value){
            commit('setUpdateCurrentUser' , value);
        }
    },
    modules:{

    }
})