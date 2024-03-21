import { createStore } from 'vuex'

export default createStore({
    state:{
        currentUser: null,
    },
    getters:{
        currentUser: state => state.currentUser
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