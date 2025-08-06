<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { useCookie } from 'vue-cookie-next'
import { inject } from 'vue'
import { useRoute } from 'vue-router'
import { usePropertiesStore } from '../stores/properties'

const route = useRoute()
const axios: any = inject('axios')  // inject axios

const cookie = useCookie();
const token = cookie.getCookie('summit-property-jwt');
const workItemNumber = ref();
const workItems = ref([]);
const propertyStore = usePropertiesStore();
const queryParam: any = Number(route.params.id);
const theProperty = propertyStore.getFilteredProperty(queryParam)
const individualProperty = theProperty.get(queryParam)

const getList = async () => {
  
      await axios
        .get(`/api/work-ticket/${queryParam}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response: { data: any }) => {
          if (response.data.length) {

            workItems.value = response.data.map(item => ({
              ...item,
                property: individualProperty?.name
            }))
            workItemNumber.value = response.data[0].id;
          }
        });
    };

const headers:any = reactive([
      { title: 'Type', align: 'start', key: 'type' },
      { title: 'Time To Completion', key: 'time' },
      { title: 'Total Payout', key: 'payout' },
      { title: 'Schedule', key: 'schedule' },
      { title: 'Status', key: 'status' },
      { title: 'Access', key: 'access' },
      { title: 'Property', key: 'property' },
    ],)
</script>


<template>
  <div class="maintenance-header">
    <span class="maintenance-title"><b>MAINTENANCE WORK TICKET {{ workItemNumber }}</b></span>
    <v-data-table-virtual
      :headers="headers"
      :items="workItems"
      class="ed-table border-sm"
      height="400"
      item-value="name"
      @update:options="getList"
    ></v-data-table-virtual>
  </div>
  <!-- @update:options="getList"-->

</template>

<style lang="scss">
  .maintenance-header {
    display: flex;
    flex-direction: column;
  }

  .maintenance-title {
    align-self: flex-end;
    color: #FFFFFF;
    padding: 10px 0;
  }

  .wo-location {
    .v-data-table__thead {
    background-color: yellow;
        tr {
        th {
            background-color: blue;
            color: white;
        }
      }
    }
  }
    
</style>