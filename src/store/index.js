import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        "users":{}
    },
    getters:{
        users:((state)=>state.users)
    },
    mutations:{
        SET_CURRENT_USER:((state,data)=>{
            state.users = Object.assign({},data)
        })
    },

})


export default store