<template>
    <div class="employee-card">
        <p class="title">Experience</p>
        <template v-if="this.experience.length>0">
        <div v-for="(data,index) in this.experience" :key="index">
          {{ index }}
        <v-text-field
            
            v-model="data['companyname']"
            placeholder="Company Name"
            filled
        ></v-text-field> 
          <b-form-datepicker
            :id="`datepicker-dateformat1${index}`"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            locale="en"
            v-model="data['startdate']"
            class="date-picker empy"
      ></b-form-datepicker>
        <b-form-datepicker
        class="date-picker empy"
        :id="`datepicker-datef1${index}`"
          v-model="data['enddate']"
          :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
          locale="en"
        ></b-form-datepicker>
        <b-form-group label="Individual radios" v-slot="{ ariaDescribedby }">
          <b-form-radio v-model="data['position']" :aria-describedby="ariaDescribedby" name="some-radios" value="A">Quality Analyst</b-form-radio>
          <b-form-radio v-model="data['position']" :aria-describedby="ariaDescribedby" name="some-radios" value="B">Develper</b-form-radio>
          <b-form-radio v-model="data['position']" :aria-describedby="ariaDescribedby" name="some-radios" value="B">Business Analyst</b-form-radio>
 
    </b-form-group>
  </div>
</template>
        <v-btn class="commonbtn add-exp" > Add Experience</v-btn>
    </div>
</template>
<script>
export default{
  props:{
    experience:{
      typeof:Array
    }
  },
    data(){
        return{
        }
    },
}
</script>
<style>
.add-exp{
  width: 100%;
  height: 50px !important;
}
.date-picker{
  margin-bottom: 30px !important;
  height: 50px !important;
  padding-top: 10px;
  background-color: #f0f0f0;
  border-bottom: 1px solid black;
  color: black;
}
.date-picker>label{
  padding-top: 10px;
}
.empy{
  background-color: darkmagenta !important;
}
.employee-card{
  background-color: darkmagenta;
  padding: 30px;
}
.title{
  color: white;
  font-weight: bold;
}
</style>