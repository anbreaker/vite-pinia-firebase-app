<template>
  <h1>Home</h1>
  <h3>{{ userStore.userData?.email }}</h3>

  <h4 v-if="fireStoreDB.loadingDocs">Loading docs...</h4>
  <ul v-else>
    <li v-for="item of fireStoreDB.documents" :key="item.id">
      {{ item.name }} - {{ item.id }} - {{ item.url }}
    </li>
  </ul>
</template>

<script setup>
  import { useUserStore } from '../stores/user.js';
  import { useFireStoreDB } from '../stores/firestoreDB';

  const userStore = useUserStore();
  const fireStoreDB = useFireStoreDB();

  fireStoreDB.getUrls();
</script>

<style scoped></style>
