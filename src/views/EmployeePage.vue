<template>
    <div>
        <header-comp ></header-comp>
        <div class="container">
        <div>
            <div class="add-emp-but">
                <v-btn
                    depressed
                    class="commonbtn add-btn"
                    @click="openModel"
                    >
                    ADD EMPLOYEE
                </v-btn>
            </div>
            <div class="tables-com">
                <div class="search">
                    <v-btn  
                        depressed
                        class="commonbtn search-btn"
                        @click="openDialog"
                        >
                        Search
                    </v-btn>
                </div>
                <div class="tables">
                    <table>
                        <thead>
                            <tr>
                                <th v-for="obj in this.headers" :key="obj.key" :style="{width:obj.width}" >
                                    {{ obj['key'] }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <template v-if="this.overallUser.length ==0">
                                <tr>
                                    <td colspan='8'> No Record</td>
                                   
                                </tr>
                            </template>
                            <template>
                                <tr  v-for="obj,index in this.overallUser" :key="obj.key">
                                    <td >
                                    {{ index+1}}
                                    </td>
                                    <td >
                                    {{ obj.name }}
                                    </td>
                                    <td >
                                    {{ obj.dob }}
                                    </td>
                                    <td >
                                    {{ obj.address }}
                                    </td>
                                    <td >
                                    {{ obj.city }}
                                    </td>
                                    <td >
                                    {{ obj.state }}
                                    </td>
                                    <td >
                                    {{ obj.experience.length }}
                                    </td>
                                    <td class="actions">
                                        <img  src="../../public/edit.png" @click="edit(obj)">
                                        <img src="../../public/eye.png">
                                        <img src="../../public/delete.png" alt="" @click="deleteEmp(obj.id)">
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
        <b-modal id="dialog" size="md" hide-footer hide-header>
            <div>
                <p class="title">Dialog</p>
                <b-form-select class="date-picker" v-model="searchtype" :options="searchoption" placeholder ='City'>

                </b-form-select>
                <v-text-field
                        label="Search"
                        filled
                        v-model="search"
                    ></v-text-field>
                <div class="bottom-btn">
                    <v-btn class="close-btb" @click="closedialog">CLOSE</v-btn>
                    <v-btn @click="filterValue">SEARCH</v-btn>
                </div>
            </div>
        </b-modal>
        <b-modal id="model_open"  size="xl" modal-header="" no-close-on-backdrop no-close-on-esc   hide-footer> 
            <div>
                <v-form ref="addemployee">
                <v-text-field
                        placeholder="Name"
                        filled
                        :rules="[rules.required]"
                        v-model="name"
                    ></v-text-field>
                    <b-form-datepicker
                            id="dob"
                            class="date-picker"
                            placeholder="DOB"
                            v-model="dob"
                            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                            locale="en"
                    ></b-form-datepicker>
                    <v-text-field               
                        placeholder="Address"
                        v-model="address"
                        :rules="[rules.required]"
                        filled
                    ></v-text-field>
                    <b-form-select class="date-picker" :options="cites" placeholder ='City' v-model="city">

                    </b-form-select>
                    
                    <v-text-field
                        placeholder="State"
                        v-model="state"
                        :rules="[rules.required]"
                        disabled
                        filled
                    ></v-text-field>
                    <experience-card :experience ="this.experience" :experienceAdd="experienceAdd" ></experience-card>

                    <v-btn class="commonbtn submitbtn" @click='checkValid()' >submit</v-btn>
                </v-form>
            </div>
        </b-modal>
        </div>
    </div>
</template>
<script>
import HeaderPage from "@/components/HeaderPage.vue"
import ExperienceCard from "@/components/ExperienceCard.vue"
import {mapGetters} from 'vuex'
import axios from 'axios';
export default{
    components:{
        'header-comp':HeaderPage,
        'experience-card':ExperienceCard
    },
    computed:{
        ...mapGetters(['users'])
    },
    data(){
        return{
            dialog:false,
            search:'',
            searchtype:"",
            state:'Tamil Nadu',
            overallUser:[],
            editid:null,
            city:'',
            address:'',
            isValid:false,
            dob:'',
            name:'',
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
            experience:[
                {
                    "companyname":"",
                    "startdate":"",
                    "enddate":"",
                    "position":"",
                },
                {
                    "companyname":"",
                    "startdate":"",
                    "enddate":"",
                    "position":"",
                }
            ],
            searchoption:[
            {
                    "text":'Select',
                    "value":"",
                    disabled:true
                },
                {
                    "text":'Name',
                    "value":"name",
                },
                {
                    "text":'DOB',
                    "value":"dob",
                },
                {
                    "text":'Address',
                    "value":"address",
                },
                {
                    "text":'City',
                    "value":"city",
                },
            ],
            cites:[
                {
                    "text":'City',
                    "value":"",
                    disabled:true
                },
                {
                    "text":'Chennai',
                    "value":"Chennai",
                },
                {
                    "text":'Tambarm',
                    "value":"Tambarm",
                },
                {
                    "text":'Tirunelveli',
                    "value":"Tirunelveli",
                },
                {
                    "text":'Madurai',
                    "value":"Madurai",
                },
                {
                    "text":'Surandai',
                    "value":"Surandai",
                },
                {
                    "text":'ThenKasi',
                    "value":"   ThenKasi",
                }
            ],
            country:"",
            headers:[
                {key:'S.No',
                width:'80px'
                },
                {key:'Name',
                width:'140px'
                },
                {key:'DOB',
                width:'80px'
                },
                {key:'Address',
                width:'140px'
                },
                {key:'City',
                width:'140px'
                },
                {key:'State',
                width:'140px'
                },
                {key:'Experience',
                width:'140px'
                },
                {key:'Action',
                width:'140px'
                }

            ]
        }
    },
    created(){
        setTimeout(()=>{
            this.getEmploye()
        },2000)
        
       
    },
    methods:{
        experienceAdd(){
            this.experience.push( {
                    "companyname":"",
                    "startdate":"",
                    "enddate":"",
                    "position":"",
                })
        },
        getEmploye(){
            axios.get(`http://localhost:3000/employee?userId=${this.users['id']}`).then((res)=>{
                if(res.status ==200||res.status==201){
                    this.overallUser = res.data
                }
        })
        },
        filterValue(){
            if(this.search =='' ||this.searchtype ==''){
                alert("Fill the all details in search dialog ")
                return
            }
            let output = this.overallUser.filter((obj)=>{
                console.log('searchtype',this.searchtype)
                if( typeof obj[`${this.searchtype}`] =='string'){
                    return obj[`${this.searchtype}`].toLowerCase().includes(this.search.toLowerCase())
                }
                else{
                    return obj[`${this.searchtype}`].includes(this.search)
                }
            })
            this.overallUser = output
            this.$bvModal.hide('dialog')
        },
        deleteEmp(id){
             axios.delete(`http://localhost:3000/employee/${id}`).then((res)=>{
                if(res.status ==200|| res.status ==201){
                    alert("Employee Deleted Succesfully")
                    this.getEmploye()
                        }

                })
        },
        edit(obj){
            console.log('obj',obj)
            this.name = obj.name
            this.dob = obj.dob
            this.city = obj.city
            this.address = obj.address
            this.state = obj.state
            this.experience = obj.experience
            this.editid = obj.id
            this.$bvModal.show('model_open')
        },
        checkValid(){
            console.log("heh")
            if(this.name ==""||this.dob == ""|| this.city =="" ||this.address ==null ||this.name ==null||this.dob == null|| this.city ==null ||this.address ==null ){
                alert("Please Fill the user details")
                return
            }
            else if(this.experience.length>0){
                for(let obj  of this.experience){
                    if(obj.companyname ==""||obj.startdate ==""|| obj.enddate ==""||obj.position ==""||obj.companyname ==null||obj.startdate ==null|| obj.enddate ==null||obj.position ==null){
                        alert("Please Fill the Experienc details")
                        return 
                    }
                }
                this.AddEmplyee()
            }
            
        },
        async AddEmplyee(){

            
            let output =0
            await axios.get(`http://localhost:3000/employee?userId=${this.users['id']}`).then((res)=>{
                if(res.status ==200|| res.status ==201){
                    if(res.data.length>0){
                        output = parseInt(res.data[res.data.length-1]['id'])
                        }
                        else{
                            output = 0
                        }
                }
                })
            let data = {
                id :output+1,
                name:this.name,
                dob: this.dob,
                address:this.address,
                city:this.city,
                state:"Tamil Nadu",
                experience:this.experience,
                userId:this.users['id'],
            }
            if(this.editid ==null){
                    await axios.post(`http://localhost:3000/employee`,data).then((res)=>{
                if(res.status ==200|| res.status ==201){
                    this.$bvModal.hide('model_open')
                    alert("Employee Added Succesfully")
                    this.getEmploye()
                    }
                        
                })
            }
            else{
                await axios.post(`http://localhost:3000/employee/${this.editid}`,data).then((res)=>{
                if(res.status ==200|| res.status ==201){
                    this.$bvModal.hide('model_open')
                    alert("Employee Edited Succesfully")
                    this.getEmploye()
                        }
                })
            }
        },
        openModel(){
            this.editid = null
            this.experience = []
            this.name = ""
            this.dob = ""
            this.city = ""
            this.address = ""
            this.experience.push( {
                    "companyname":"",
                    "startdate":"",
                    "enddate":"",
                    "position":"",
                })
            this.$bvModal.show('model_open')
        },
        openDialog(){
           
            this.$bvModal.show('dialog')
        },
        closedialog(){
            this.$bvModal.hide('dialog')
        }
    }
}
</script>
<style>
.add-btn{
    height: 60px !important;
    width: clamp(250px, 400px, 500px) !important;
}
.submitbtn{
    margin-top: 20px;
    width: 100%;
}
.search-btn{
    width: 80px !important;
    background-color: black !important;
}
.search{
    text-align: end !important;
}
.actions>img{
   width: 23px;
   height: 23px; 
   cursor: pointer;
   margin-right:10px ;
}
.add-emp-but{
    height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.title{
    color: black;
    font-weight: bolder;
}
th{
    color: black;
    font-weight: bold;
}
.bottom-btn{
    display: flex;
    justify-content: end;
}
tr{
    height: 40px;
    /* border: 1px solid; */
    text-align: center;
}
th,td{
    border: 1px solid;
}
.close-btb{
    margin-right: 10px;
}
/* #model_open>.v-label--active{
   left: -68px !important
} */
</style>