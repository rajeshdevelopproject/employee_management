import Vue from 'vue';
import Router from 'vue-router';

import LoginComponents from '@/views/LoginPage.vue';
import RegisterComponents from '@/views/RegisterPage.vue';
import EmployeePage from '@/views/EmployeePage.vue';

Vue.use(Router);

const routes = [
    {
        path:'/login',name:'Login',component:LoginComponents
    },
    {
        path:'/register',name:'Register',component:RegisterComponents
    },
    {
        path:'/home',name:'Home',component:EmployeePage
    }

]

const router = new Router({
    routes,
    mode: 'history'
  });

export default router