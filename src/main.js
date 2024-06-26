import Vue from 'vue'
import App from './App.vue'
import Vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css';
import { BootstrapVue } from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'  

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Vuetify,
  render: h => h(App)
}).$mount('#app')
