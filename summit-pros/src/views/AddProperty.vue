<script setup lang="ts">
/// NEED TO ADD RULES
/// NEED TO BIND INPUTS TO MODEL
/// NEED TO ADD POST
import { ref, reactive, onBeforeMount } from 'vue';
import { useCookie } from 'vue-cookie-next';
import { inject } from 'vue';
import { Properties } from '../properties';
import { useRouter } from 'vue-router';

const router = useRouter();
const axios: any = inject('axios')  // inject axios
const cookie = useCookie();
const token = cookie.getCookie('summit-property-jwt');

const formData = reactive({
    name: '',
    address: '',
    type: '',
    propertyStatus: '',
})

const PropertyStatusItems = [
  "Active",
  "Inactive",
]

const propertyData = ref<Properties[]>([]);

/////EITHER GET PROPERTIES FROM STATE OR CREATE NEW API FOR
/// GETTING LIST OF PROPERTIES AND SETTING DROP-DOWN VALUE TO
/// ID OF PROPERTIES
onBeforeMount(async () => {
  try {
       await axios.get('/api/named-properties', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response: { data: any }) => {
        propertyData.value = response.data;
      })
    } catch (err: any) {
      // Handle different types of errors
      if (axios.isAxiosError(err)) {
        // Axios-specific error (e.g., network error, 4xx/5xx status)
        if (err.response) {
          // Server responded with a status code outside of 2xx range
          console.error('Server Error:', err.response.data);
          err.value = `Server Error: ${err.response.status}`;
        } else if (err.request) {
          // Request was made but no response received
          console.error('Network Error:', err.request);
          err.value = 'Network Error: No response received';
        } else {
          // Something else happened while setting up the request
          console.error('Axios Error:', err.message);
          err.value = `Axios Error: ${err.message}`;
        }
      } else {
        // Non-Axios error
        console.error('Unexpected Error:', err);
        err.value = 'An unexpected error occurred.';
      }
    }
});

async function submit(event) {
    axios.post('/api/add-property', formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
            console.log('Data sent with headers:', response.data);
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });

        router.push('/maintenance/properties'); 
}
</script>

<template>
<div class="add-property">
    <h1 class="title">Add A Property</h1>
    <v-form @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col
          cols="10"
          md="6"
          >
          <v-text-field
            v-model="formData.name"
            :counter="10"
            label="Name"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="formData.address"
            :counter="10"
            label="Address"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="formData.type"
            :counter="10"
            label="Type"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-select
            v-model="formData.propertyStatus"
            label="Property Status"
            :items="PropertyStatusItems"
            :menu-props="{ scrim: true, scrollStrategy: 'close' }"
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" offset="5">
            <v-btn text="Submit" type="submit"/>
        </v-col>
        
      </v-row>
    </v-container>
  </v-form>
</div>
</template>

<style lang="scss">
    .title {
        margin: 0 !important;
        padding-bottom: 0px;
        text-align: center;
    }
    .add-property {
        background-color: #FFF;
    }
</style>