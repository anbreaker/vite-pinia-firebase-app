<template>
  <h1>Home</h1>
  <h3>Hello user 👋: {{ userStore.userData?.email }}</h3>

  <AddOrEditUrl :buttonText="'Add Url'" />

  <PresentationData />
</template>

<script setup>
  import { useUserStore } from '../stores/user.js';

  import AddOrEditUrl from '../components/AddOrEditUrl.vue';
  import PresentationData from '../components/PresentationData.vue';

  const userStore = useUserStore();
</script>

<style scoped>
  li {
    margin-top: 0.3rem;
  }
</style>
