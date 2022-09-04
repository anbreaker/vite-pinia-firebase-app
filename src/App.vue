<template>
  <Navbar />

  <a-layout-content style="padding: 0 50px">
    <div class="container">
      <router-view />
    </div>
  </a-layout-content>
</template>

<script setup>
  import Navbar from './components/Navbar.vue';
</script>

<style scoped>
  .container {
    background: aliceblue;
    padding: 1.5rem;
    min-height: calc(100vh - 64px);
  }
</style>
