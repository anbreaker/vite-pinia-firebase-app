<template>
  <h1>Home</h1>
  <h3>{{ userStore.userData?.email }}</h3>

  <AddUrl :buttonText="'Add Url'" />

  <h4 v-if="fireStoreDB.loadingDocs">Loading docs...</h4>
  <ul v-else>
    <li v-for="item of fireStoreDB.documents" :key="item.id">
      name: {{ item.name }} - id: {{ item.id }} - url: {{ item.url }}

      <button @click="fireStoreDB.deleteUrl(item.id)">Delete</button>
      <button @click="router.push({ name: 'edit', params: { id: item.id } })">Edit</button>
    </li>
  </ul>
</template>

<script setup>
  import { useRouter } from 'vue-router';

  import { useUserStore } from '../stores/user.js';
  import { useFireStoreDB } from '../stores/firestoreDB';
  import AddUrl from '../components/AddUrl.vue';

  const router = useRouter();

  const userStore = useUserStore();
  const fireStoreDB = useFireStoreDB();

  fireStoreDB.getUrls();
</script>

<style scoped>
  li {
    margin-top: 0.3rem;
  }
</style>
