<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './app.css'
export default {
  name: 'App',

  components: {

  },

  data: () => ({
    //
  }),
  methods:{
    pageRoute(){
      this.$router.push({path:'/login'})
    }
  }
};
</script>
<style>
.app{

}
.btn{
  color: white !important;
  background-color: #93d184 !important;
  margin-left: 0px !important;
  margin-right: 0px !important;
  border-radius: 12px;
}
</style>
