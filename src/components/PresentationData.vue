<template>
  <h4 v-if="fireStoreDB.loadingDocs">Loading docs...</h4>

  <template v-if="!fireStoreDB.loadingDocs">
    <a-card
      class="card"
      :title="`Url Short: ${item.short}`"
      style="width: 100%"
      v-for="item of fireStoreDB.documents"
      :key="item.id"
    >
      <template #extra>
        <a-popconfirm
          title="Are you sure delete this task?"
          ok-text="Yes, delete"
          cancel-text="No, delete"
          @confirm="confirm(item.id)"
          @cancel="cancel"
        >
          <a-button type="danger" :disabled="fireStoreDB.loading" :loading="fireStoreDB.loading">
            Delete
          </a-button>
        </a-popconfirm>

        <a-button
          type="primary"
          :disabled="fireStoreDB.loading"
          :loading="fireStoreDB.loading"
          @click="router.push({ name: 'edit', params: { id: item.id } })"
        >
          Edit
        </a-button>
      </template>

      <h3>Url Extensa: {{ item.name }}</h3>
    </a-card>
  </template>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { message } from 'ant-design-vue';

  import { useFireStoreDB } from '../stores/firestoreDB';

  const router = useRouter();

  const fireStoreDB = useFireStoreDB();

  fireStoreDB.getUrls();

  const confirm = async (id) => {
    const error = await fireStoreDB.deleteUrl(id);

    if (!error) message.success('Delete successfully');

    if (error) message.error(error);
  };

  const cancel = (event) => {
    console.log(event);

    message.error('No deleteUrl');
  };
</script>

<style scoped>
  li {
    margin-top: 0.3rem;
  }

  button {
    margin-right: 0.5rem;
    min-width: 5rem;
  }

  .card {
    margin-top: 0.5rem;
  }
</style>
