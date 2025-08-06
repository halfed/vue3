<template>
  <v-card class="nav-bar">
    <v-toolbar color="nav-primary">
      <v-app-bar-nav-icon
      class="hide-on-mobile"
      ></v-app-bar-nav-icon>

      <v-toolbar-title><h1 class="main-title">MTEK LTD.</h1></v-toolbar-title>

      <template v-slot:extension>
        <v-tabs

          align-tabs="title"
          :mobile=true
          class="d-none d-sm-flex"
        >
         
          <v-tab
            text="Automotive"
            class="nav-links"
            :to="`/automotive`"
          ></v-tab>
          <v-tab
            text="Software Engineering"
            class="nav-links"
            :to="`/softwareengineering`"
          ></v-tab>
          <v-tab
            text="Property Maintenance"
            class="nav-links"
            :to="`/propertymanagement`"
          ></v-tab>
          <v-tab
            text="About"
            class="nav-links"
            :to="`/about`"
          ></v-tab>

          <v-menu v-if="properties.length">
                <template v-slot:activator="{ props }">
                <v-btn
                    class="align-self-center me-4"
                    height="100%"
                    rounded="0"
                    variant="plain"
                    v-bind="props"
                >
                    Products

                    <v-icon icon="mdi-menu-down" end></v-icon>
                </v-btn>
                </template>

                <v-list class="bg-grey-lighten-3">
                <v-list-item
                    v-for="item in properties"
                    :key="item"
                    :title="item"
                    :to="`/maintenance/${item}`"
                ></v-list-item>
                </v-list>
            </v-menu>

        </v-tabs>
      </template>
    </v-toolbar>
  </v-card>
</template>

<script setup>
    import { ref, reactive } from 'vue'

const properties = ref([
        'Summit Management',
      ]);



    const items = [
        'Software Engineering',
        'about',
        'products'
]
    
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
</script>

<style scoped>

@media (min-width: 600px) { /* Adjust breakpoint as needed for mobile */
  .hide-on-mobile {
    display: none !important;
  }
}
</style>