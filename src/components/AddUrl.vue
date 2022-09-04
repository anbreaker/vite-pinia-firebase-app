<template>
  <a-form name="addUrl" :model="formState" @finish="onFinish">
    <a-form-item
      name="url"
      :rules="[
        {
          required: true,
          min: 3,
          whitespace: true,
          pattern: regExpUrl,
          message: 'Please, Enter a valid URL',
        },
      ]"
    >
      <a-input placeholder="Enter a new URL" v-model:value="formState.url" />
    </a-form-item>

    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="fireStoreDB.loading"
        :loading="fireStoreDB.loading"
      >
        {{ buttonText }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
  import { onMounted, reactive } from 'vue';
  import { message } from 'ant-design-vue';

  import { useFireStoreDB } from '../stores/firestoreDB';
  import { regExpUrl } from '../utils/regExpUrl';
  import { useRoute } from 'vue-router';

  const props = defineProps({
    buttonText: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: '',
    },
  });

  const fireStoreDB = useFireStoreDB();

  const route = useRoute();

  const formState = reactive({
    url: '',
  });

  onMounted(async () => {
    formState.url = await fireStoreDB.readUrl(route.params.id);
  });

  const editBySubmit = () => {
    // TODO validations url
    fireStoreDB.editUrl(route.params.id, formState.url);
  };

  const onFinish = async (value) => {
    // console.log(value);

    if (!route.path.includes('/edit')) {
      // TODO validations url
      const error = await fireStoreDB.addUrl(formState.url);

      if (!error) {
        formState.url = '';
        return message.success('Url added successfully.');
      }

      switch (error) {
        default:
          return message.error('Error while adding url.');
          break;
      }
    }

    if (route.path.includes('/edit')) editBySubmit();
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
