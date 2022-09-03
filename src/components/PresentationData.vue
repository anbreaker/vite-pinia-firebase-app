<template>
  <h4 v-if="fireStoreDB.loadingDocs">Loading docs...</h4>
  <ul v-else>
    <li v-for="item of fireStoreDB.documents" :key="item.id">
      name: {{ item.name }} - id: {{ item.id }} - url: {{ item.url }}

      <a-button
        type="primary"
        :disabled="fireStoreDB.loading"
        :loading="fireStoreDB.loading"
        @click="fireStoreDB.deleteUrl(item.id)"
      >
        Delete
      </a-button>

      <a-button
        type="primary"
        :disabled="fireStoreDB.loading"
        :loading="fireStoreDB.loading"
        @click="router.push({ name: 'edit', params: { id: item.id } })"
      >
        Edit
      </a-button>
    </li>
  </ul>
</template>

<script setup>
  import { useRouter } from 'vue-router';

  import { useFireStoreDB } from '../stores/firestoreDB';

  const router = useRouter();

  const fireStoreDB = useFireStoreDB();

  fireStoreDB.getUrls();
</script>

<style scoped>
  li {
    margin-top: 0.3rem;
  }

  button {
    margin-right: 0.5rem;
    min-width: 5rem;
  }
</style>
