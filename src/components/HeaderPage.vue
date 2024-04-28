<template>
    <div id="header">
        <div class="left-align">
            <img class="logo" :src="users['logo']" alt="No Image">
            <p>{{ this.users['companyname'] }}</p>
        </div>
        <div class="right-align">
            <img src="../../public/on-off-button.png" @click="logout" alt="No Image">
            <img src="../../public/home.png" alt="No Image" @click="home">
            <img src="../../public/profile-user.png" alt="No Image">
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default{
    data(){
        return{
                
        }
    },
    computed:{
        ...mapGetters(['users'])
    },
    methods:{
        logout(){
            this.$router.push({path:"/login"})
        },
        home(){
            this.$router.push({path:"/home"})
        }
    }
}
</script>
<style scoped>
#header{
    height: 40px;
    width: 100%;
    background-color: #0c3618;
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
}
.left-align{
   display: grid;
   grid-template-columns: 2fr 8fr;
   align-items: center;
   text-align: center;
}
.right-align>*{
    width: 20px;
    height: 20px;
}
.logo{
    width: 20px;
    height: 20px;
}
.right-align{
    display: flex;
    justify-content: space-between;
    width: 20%;
    align-items: center;
}
p{
    margin-bottom: 0px;
}
</style>