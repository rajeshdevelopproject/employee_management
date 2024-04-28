<template>
    <div>
        <v-text-field
            label="Company Name"
            solo
        ></v-text-field> 
        <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in dialog"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(startDate)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </div>
</template>
<script>
export default{
    data(){
        return{
            startDate:'',
            endDate:''
        }
    }
}
</script>
<style>
</style>