<template>
  <div>
    <h1>Edit</h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Enter your URL" v-model="urlToEdit" />
      <button type="submit">Edit</button>
    </form>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';

  import { useFireStoreDB } from '../stores/firestoreDB';

  const urlToEdit = ref('');

  const route = useRoute();

  const fireStoreDB = useFireStoreDB();

  onMounted(async () => {
    urlToEdit.value = await fireStoreDB.readUrl(route.params.id);
  });

  const handleSubmit = () => {
    // TODO validations url
    fireStoreDB.editUrl(route.params.id, urlToEdit.value);
  };
</script>

<style lang="scss" scoped></style>
