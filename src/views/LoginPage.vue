<template>
    <v-row  id="login">
        <v-col cols="3" sm="4">
          <v-form ref="form">
            <v-text-field
            label="Email"
            :rules="[rules.required, rules.email]"
            v-model="email"
            filled
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="password" 
            :rules="[rules.required, rules.min]"   
            filled
          ></v-text-field>
            <v-btn
            class="btn log-reg m-0"
            @click ="submit"
            >
            LOGIN IN
            </v-btn>
          </v-form>
          <div class="link-div">
            <a href="" @click="gotoPage()" class="link">Register</a>
          </div>
           
        </v-col>
    </v-row>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
          password:'',
          isValid:true,
          email:'',
          rules: {
          required: value => {
            if(value){
              this.isValid =true
            }
            else{
              this.isValid =false
            }
           return !!value || 'Required.'},
          min: v =>{ 
            if( v.length >= 8){
              this.isValid =true
            }
            else{
              this.isValid =false
            }
            return v.length >= 8 || 'Min 8 characters'},
          email: value => {
              let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
              console.log('regex.test(value)',regex.test(value))
           if (!regex.test(value)){
            this.isValid = false
            return 'Invalid email'
           }
           this.isValid =true
           return true
          }
        },
        }
    },methods:{
      gotoPage(){
        this.$router.push({path:'/register'})
      },
      submit(){
        if(this.email =='' || this.password ==''||!this.isValid){
          this.$refs.form.validate();
          return
        }
       
        axios.get("http://localhost:3000/users?email=helo@gmails.com").then((res)=>{
          if(res.status ==200|| res.status ==201){
             this.$store.commit('SET_CURRENT_USER',res.data[0])
             this.$router.push({'path':'/home'})
          }
        })
      }
    }
}

</script>

<style>
#login{
    /* display: grid; */
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
}
label{
left: 0px !important;
}
.log-reg{
  height: 50px !important;
  width: 100%;
}
</style>