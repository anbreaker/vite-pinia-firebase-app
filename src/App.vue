<template>
  <Navbar />

  <a-layout-content style="padding: 0 50px">
    <div :style="{ background: 'aliceblue', padding: '24px', minHeight: '17.5rem' }">
      <router-view />
    </div>
  </a-layout-content>
</template>

<script setup>
  import Navbar from './components/Navbar.vue';
</script>

<style scoped></style>
