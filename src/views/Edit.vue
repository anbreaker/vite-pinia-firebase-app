<template>
  <div>
    <h1>Edit</h1>

    <AddUrl :nameButton="nameButton" :url="urlToEdit" />
    {{ urlToEdit }} editar
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';

  import { useFireStoreDB } from '../stores/firestoreDB';
  import AddUrl from '../components/AddUrl.vue';

  const urlToEdit = ref('');
  const route = useRoute();
  const nameButton = 'Edit';

  const fireStoreDB = useFireStoreDB();

  onMounted(async () => {
    urlToEdit.value = await fireStoreDB.readUrl(route.params.id);
  });

  // https://ibm-learning.udemy.com/course/curso-vue/learn/lecture/31484266#questions
  // min 14.30
</script>

<style lang="scss" scoped></style>
