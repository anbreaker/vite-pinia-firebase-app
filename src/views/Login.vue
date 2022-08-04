<template>
  <h1>Login</h1>

  <form @submit.prevent="handleSubmit">
    <input type="email" name="email" placeholder="Email" v-model.trim="email" />
    <input type="password" name="password" placeholder="Enter Password" v-model.trim="password" />
    <button type="submit" :disabled="userStore.loadingUser">Login</button>
  </form>
</template>

<script setup>
  import { ref } from 'vue';

  import { useUserStore } from '../stores/user.js';

  const userStore = useUserStore();

  const email = ref('test@test.com');
  const password = ref('123456');

  const handleSubmit = async () => {
    if (!email.value || password.value.length < 6) return alert('Fields required');

    await userStore.loginUser(email.value, password.value);
  };
</script>

<style scoped></style>
