<template>
  <a-layout>
    <a-layout-header v-if="!userStore.loadingSession">
      <a-menu
        mode="horizontal"
        theme="dark"
        :selectedKeys="selectedKeys"
        :style="{ lineHeight: '4rem' }"
      >
        <a-menu-item v-if="userStore.userData" key="home">
          <router-link to="/">Home</router-link>
        </a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="login">
          <router-link to="/login">Login</router-link>
        </a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="register">
          <router-link to="/register">Register</router-link>
        </a-menu-item>
        <a-menu-item @click="userStore.logoutUser" v-if="userStore.userData" key="logout">
          Logout
        </a-menu-item>
      </a-menu>
    </a-layout-header>
  </a-layout>
</template>

<script setup>
  import { ref } from 'vue';
  import { useUserStore } from '../stores/user.js';
  import { useRoute } from 'vue-router';

  const userStore = useUserStore();

  const route = useRoute();

  const selectedKeys = ref([route.name]);
</script>

<style scoped></style>
