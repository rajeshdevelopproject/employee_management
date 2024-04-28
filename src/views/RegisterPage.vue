<template>
    <v-row id="register">
   
        <v-col cols="3" md="4">
          <v-form ref="form" @submit.prevent="sendData">
            <v-text-field
            label="Company Name"
            filled
            :rules="[() => !!companyname || 'Company Name is required']"
            v-model="companyname"
          ></v-text-field>
          <v-file-input
            v-model="logo"
            label="File input"
            :rules="[rules.required]"
            prepend-icon=''
            filled
          ></v-file-input>
          <v-text-field
            label="Email"
            :rules="[rules.required, rules.email]"
            v-model="email"
            filled
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="pass"
            :rules="[rules.required, rules.min]"
            type="password"
            filled
          ></v-text-field>
          <v-btn
            class="commonbtn log-reg"
            @click= "submit"
            type="submit"
            >
            REGISTER
            </v-btn>
        </v-form>
          
            <div class="link-div">
              <a href="" class="link" @click="gotoPage">Login</a>
            </div>

          </v-col>
        </v-row>
</template>
<script>
import axios from 'axios';
export default{
  data(){
    return{
      show1:true,
      logo:'',
      email:'',
      pass :'',
      warningAleart:false,
      isValid:true,
      companyname:'',
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
  },
  methods:{
      gotoPage(){
        this.$router.push({path:'/login'})
      },
      sendData(data,vall){
        console.log('sendData',data,vall)
      },
      async submit(){
        console.log('logo',this.logo)
        if(this.companyname ==''||this.email==''||this.pass=='' || this.logo ==''||!this.isValid){
        this.$refs.form.validate();
        return
        }
        let output = 0
       let error = false
       
        await axios.get(`http://localhost:3000/users?email=${this.email}`).then((res)=>{
          if(res.status ==200|| res.status ==201){
              if(res.data.length>0){
                alert("Email is already registered")
                error =true
              return true
              }
          }
        })
        if(!error){
        await axios.get("http://localhost:3000/users").then((res)=>{
          if(res.status ==200|| res.status ==201){
              output = res.data.length
          }
        })

        let data = {
          id:output+1,
          companyname:this.companyname,
          email:this.email,
          pass:this.pass,
          logo:this.logo,
        }
        axios.post("http://localhost:3000/users",data).then((res)=>{
          if(res.status ==200|| res.status ==201){
              console.log('faga',res)
              alert("Registered successfully")
              this.$router.push({path:'/login'})
          }
        })
      }
      }
    }
}
</script>
<style>
#register{
  justify-content: center;
  align-items: center;
  height:100vh
}
</style>