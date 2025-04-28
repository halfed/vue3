<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { useCookie } from 'vue-cookie-next'
import { inject } from 'vue'

const axios: any = inject('axios')  // inject axios

const cookie = useCookie();

const token = cookie.getCookie('summit-pros-jwt');
let workItems = ref([]);

const getList = async () => {
      axios
        .get("/api/work-ticket", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response: { data: any }) => {
          workItems.value = response.data;
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
  <v-data-table-virtual
    :headers="headers"
    :items="workItems"
    height="400"
    item-value="name"
    @update:options="getList"
  ></v-data-table-virtual>

</template>

<style lang="scss">
    
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