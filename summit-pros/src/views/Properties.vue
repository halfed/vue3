<script setup lang="ts">
import { inject } from 'vue'
import { onMounted, ref } from 'vue';
import { Properties } from '../properties';
import { useCookie } from 'vue-cookie-next'
import { usePropertiesStore } from '../stores/properties';

const axios: any = inject('axios')  // inject axios

const cookie = useCookie();

const token = cookie.getCookie('summit-property-jwt');

const properties = ref<Properties[]>([]);

const property = usePropertiesStore();

const search = ref();
const headers = ref<any[]>([
  { title: 'Property', align: 'start', key: 'name' },
    {title: 'Address', key: 'address'},
  { title: 'Type', key: 'type' },
  {title: 'Property Status', key: 'property_status'},
  { title: 'ID', key: 'id' },
    
],)

  

const getProperties = () => {
    axios
        .get("/api/work-properties", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then((response: { data: any }) => {
          property.setProperties(response.data);
          properties.value = response.data;
        }).catch(error => {
        console.error('Error fetching data:', error);
      });;
};

onMounted(() => {
    getProperties();
  });
</script>

<template>
    <v-card title="PROPERTIES" flat>
        <template v-slot:text>
        <div class="property-button">
          <v-btn to="/maintenance/add-property">Add A Property</v-btn>
        </div>
            <v-text-field
                v-model="search"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                hide-details
                single-line
            ></v-text-field>
            
        </template>

        <v-data-table
        :headers="headers"
        :items="properties"
        :search="search"
        >
        <template #item.id="{ item }">
            <routerLink :to="{ name: 'workTicket', params: { id: item.id} }">{{ item.id }}</routerLink>
        </template>
        </v-data-table>
    </v-card>
</template>

<style lang="scss">
  .property-button {
    float: right;
    padding-left: 20px;
    margin-top: 10px;
  }
</style>