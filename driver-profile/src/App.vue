<script setup lang="ts">
import { computed } from "vue";
import Navbar from "./components/Navbar.vue";
import { useModal } from "./composables/modal";
import { useUsers } from "./stores/users";

const modal = useModal();
const usersStore = useUsers();

const modalStyle = computed(() => {
  return {
    display: modal.show.value ? 'block' : 'none'
  }
})

// async function authenticate() {
//   const res = await window.fetch("/api/current-user", {
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   })
//   console.log(await res.json());
// }
usersStore.authenticate();
</script>

<template>
  <div 
  class="modal" 
  style="color: black;"
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
  </div>

  <div class="section">
    <div class="container">
      <Navbar />
      <RouterView />
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css";
@import "highlight.js/styles/atom-one-dark.css";

@import "output.css";

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
