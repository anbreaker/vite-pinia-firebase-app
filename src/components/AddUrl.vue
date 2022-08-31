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
      <a-input-password placeholder="Enter a new URL" v-model:value="formState.password" />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit">
        {{ buttonText }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
  import { reactive } from 'vue';

  import { useFireStoreDB } from '../stores/firestoreDB';
  import { regExpUrl } from '../utils/regExpUrl';

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

  const formState = reactive({
    url: '',
  });

  const onFinish = async (value) => {
    console.log(value, 'ok');
    // TODO validations url
    // fireStoreDB.addUrl(props.url);
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
