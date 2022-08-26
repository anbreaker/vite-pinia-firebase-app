<template>
  <a-layout>
    <a-layout-header v-if="!userStore.loadingSession">
      <a-menu theme="dark">
        <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '3rem' }"
        >
          <a-menu-item key="home" v-if="userStore.userData">
            <router-link to="/">Home</router-link>
          </a-menu-item>
          <a-menu-item key="login" v-if="!userStore.userData">
            <router-link to="/login">Login</router-link>
          </a-menu-item>
          <a-menu-item key="register" v-if="!userStore.userData">
            <router-link to="/register">Register</router-link>
          </a-menu-item>
          <a-menu-item key="logout" @click="userStore.logoutUser">Logout</a-menu-item>
        </a-menu>
      </a-menu>
      <a-layout-content style="padding: 0 50px">
        <div v-if="userStore.loadingSession">loading user...</div>
      </a-layout-content>
    </a-layout-header>
  </a-layout>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import { useUserStore } from '../stores/user.js';
  import { useRoute } from 'vue-router';

  const userStore = useUserStore();

  const route = useRoute();

  const selectedKeys = ref([route.name]);
</script>

<style scoped></style>
