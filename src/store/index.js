import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state:{
        "users":{}
    },
    getters:{
        users:((state)=>state.users)
    },
    mutations:{
        SET_CURRENT_USER:((state,data)=>{
            console.log('ssss',data)
            state.users = Object.assign({},data)
        })
    },

})


export default store