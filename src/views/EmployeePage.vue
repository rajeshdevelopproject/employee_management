<template>
    <div>
        <header-comp ></header-comp>
        <div>
            <div class="add-emp-but">
                <v-btn
                    depressed
                    class="btn add-btn"
                    @click="openModel"
                    >
                    ADD EMPLOYEE
                </v-btn>
            </div>
            <div class="tables-com">
                <div class="search">
                    <v-btn
                        depressed
                        class="test search-btn"
                        >
                        Search
                    </v-btn>
                </div>
                <div class="tables">


                </div>
            </div>
        </div>
        <div>
            <v-dialog
            v-model="dialog"
            max-width="60vw"
            >
            <v-card>
                <div>
                    <v-text-field
                        label="Name"
                        placeholder="Placeholder"
                        solo
                    ></v-text-field>
                    <v-text-field
                        label="Address"
                        placeholder="Placeholder"
                        solo
                    ></v-text-field>
                    <v-autocomplete
                        ref="country"
                        v-model="country"
                        :rules="[() => !!country || 'This field is required']"
                        :items="countries"
                        label="Country"
                        placeholder="Select..."
                        required
                    ></v-autocomplete>
                    
                    <v-text-field
                        label="State"
                        placeholder="Placeholder"
                        solo
                    ></v-text-field>
                 </div>
            </v-card>
            
        </v-dialog>
        </div>
        <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>
<script>
import HeaderPage from "@/components/HeaderPage.vue"
import {mapGetters} from 'vuex'
export default{
    components:{
        'header-comp':HeaderPage
    },
    computed:{
        ...mapGetters(['users'])
    },
    data(){
        return{
            dialog:false,
            countries:[],
            country:null,
        }
    },
    created(){
        console.log('users',this.users)
    },
    methods:{
        openModel(){
            this.dialog =true
        }
    }
}
</script>
<style>
.add-btn{
    height: 60px !important;
    width: clamp(250px, 400px, 500px) !important;
}
.search-btn{
    width: 80px !important;
    background-color: black;
}
.search{
    text-align: end !important;
}
.add-emp-but{
    height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>