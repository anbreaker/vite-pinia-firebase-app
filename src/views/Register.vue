<template>
  <h1>Register</h1>

  <form @submit.prevent="handleSubmit">
    <input type="email" name="email" placeholder="Email" v-model.trim="email" />
    <input type="password" name="password" placeholder="Enter Password" v-model.trim="password" />
    <button type="submit" :disabled="userStore.loadingUser">Create User</button>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  import { useUserStore } from '../stores/user.js';

  const userStore = useUserStore();
  const router = useRouter();

  const email = ref('');
  const password = ref('');

  const handleSubmit = async () => {
    if (!email.value || password.value.length < 6) return alert('Fields required');

    await userStore.registerUser(email.value, password.value);

    router.push({ name: 'home' });
  };
</script>

<style scoped></style>
