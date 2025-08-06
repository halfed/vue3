<script setup lang="ts">
import { computed, inject } from "vue";
import Navbar from "./components/Navbar.vue";
import Navbar2 from "./components/Navbar2.vue";
import { useModal } from "./composables/modal";
import { useUsers } from "./stores/users";

const modal = useModal();
const usersStore = useUsers();

const modalStyle = computed(() => {
  return {
    display: modal.show.value ? 'block' : 'none'
  }
})


usersStore.authenticate();
</script>

<template>
  <div 
  class="modal" 
  style="color: white;"
  :style="modalStyle"
  >
    <div class="modal-background">
      <div class="modal-content">
        <div id="modal"></div>
      </div>
    </div>
    <button 
    class="modal-close is-large"
    @click="modal.hideModal()"
    ></button>

    <v-btn
      class="modal-close is-large"
      @click="modal.hideModal()"
    ></v-btn>
  </div>

  <div class="section">
    <div class="container">
      <div class="business-title">MTEK LTD.</div>
      <Navbar />
      <Navbar2 />
      <RouterView />
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css";
@import "highlight.js/styles/atom-one-dark.css";
@import "style.css";

ul {
  list-style: revert !important;
  list-style-position: inside !important;
}

h1, h2, h3, h4, h5, h6 {
  font-size: revert !important;
  margin: 10px 0 !important;
}

pre {
  margin: 10px 0 !important;
}

p {
  margin: 10px 0 !important;
}
</style>
