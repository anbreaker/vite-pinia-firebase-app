<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Enter your URL" v-model="url" />
    <button type="submit">Add</button>
  </form>
</template>

<script setup>
  import { ref } from 'vue';

  import { useFireStoreDB } from '../stores/firestoreDB';

  const fireStoreDB = useFireStoreDB();

  const url = ref('');

  const handleSubmit = () => {
    // TODO validations url
    fireStoreDB.addUrl(url.value);
  };
</script>

<style scoped>
  input {
    padding: 0.8rem;
    border-radius: 0.8rem;
    border: 0;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.06);
    margin-right: 0.3rem;
  }
</style>
