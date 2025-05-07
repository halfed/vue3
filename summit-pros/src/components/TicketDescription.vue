<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { useCookie } from 'vue-cookie-next'
import { inject } from 'vue'

const axios: any = inject('axios')  // inject axios

const cookie = useCookie();

const token = cookie.getCookie('summit-pros-jwt');
const workItemNumber = ref();
const workItems = ref([]);

const getList = async () => {
      axios
        .get("/api/work-ticket", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response: { data: any }) => {
          workItems.value = response.data;
          workItemNumber.value = response.data[0].id;
        });
    };

  onMounted(async () => {
    getList();
  });

  const headers:any = reactive([
        { title: 'Type', align: 'start', key: 'type' },
        { title: 'Time To Completion', align: 'end', key: 'time' },
        { title: 'Total Payout', align: 'end', key: 'payout' },
        { title: 'Schedule', align: 'end', key: 'schedule' },
        { title: 'Status', align: 'end', key: 'status' },
        { title: 'Access', align: 'end', key: 'access' },
        { title: 'Property', align: 'end', key: 'property' },
      ],)
</script>


<template>
  <div class="maintenance-header">
    <span class="maintenance-title"><b>MAINTENANCE WORK TICKET</b> {{ workItemNumber }}</span>
    <v-data-table-virtual
      :headers="headers"
      :items="workItems"
      class="ed-table border-sm"
      height="400"
      item-value="name"
      @update:options="getList"
    ></v-data-table-virtual>
  </div>
  

</template>

<style lang="scss">
  .maintenance-header {
    display: flex;
    flex-direction: column;
  }

  .maintenance-title {
    align-self: flex-end;
  }

  .v-data-table th {
    background-color: #336699;
    color: #FFF;
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