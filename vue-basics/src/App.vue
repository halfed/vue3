<script setup lang="ts">
import Navbar from './components/Navbar.vue';
</script>

<template>
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
