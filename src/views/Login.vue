<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
      <h1>Login</h1>

      <a-form
        layout="vertical"
        name="basic-login"
        @submit.prevent="handleSubmit"
        :model="formState"
      >
        <a-form-item
          name="email"
          :rules="[{ required: true, message: 'Please input your email!' }]"
        >
          <a-input type="email" v-model:value="formState.email" />
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password placeholder="Enter Password" v-model:value="formState.password" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" :disabled="userStore.loadingUser">
            Login
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
  import { reactive } from 'vue';

  import { useUserStore } from '../stores/user.js';

  const userStore = useUserStore();

  // const email = ref('test@test.com');
  // const password = ref('testtest');

  // TODO video 126 min 20 https://ibm-learning.udemy.com/course/curso-vue/learn/lecture/31568300#questions
  const formState = reactive({
    email: 'test@test.com',
    password: 'testtest',
  });

  const handleSubmit = async () => {
    // if (!email.value || password.value.length < 6) return alert('Fields required');

    // await userStore.loginUser(email.value, password.value);
    await userStore.loginUser(formState.email, formState.password);
  };
</script>

<style scoped></style>
