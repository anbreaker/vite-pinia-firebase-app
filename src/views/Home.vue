<template>
  <h1>Home</h1>
  <h3>{{ userStore.userData?.email }}</h3>

  <AddUrl :buttonText="'Add Url'" />

  <PresentationData />
</template>

<script setup>
  import { useUserStore } from '../stores/user.js';

  import AddUrl from '../components/AddUrl.vue';
  import PresentationData from '../components/PresentationData.vue';

  const userStore = useUserStore();
</script>

<style scoped>
  li {
    margin-top: 0.3rem;
  }
</style>
