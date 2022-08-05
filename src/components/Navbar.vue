<template>
  <nav v-if="!userStore.loadingSession">
    <router-link to="/" v-if="userStore.userData">Home</router-link>
    |
    <router-link to="/login" v-if="!userStore.userData">Login</router-link>
    |
    <router-link to="/register" v-if="!userStore.userData">Register</router-link>
    |
    <button @click="userStore.logoutUser">Logout</button>
  </nav>

  <div v-else>loading user...</div>
</template>

<script setup>
  import { useUserStore } from '../stores/user.js';

  const userStore = useUserStore();
</script>

<style scoped></style>
