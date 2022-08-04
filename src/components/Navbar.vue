<template>
  <nav>
    <router-link to="/">Home</router-link>
    |
    <router-link to="/login">Login</router-link>
    |
    <router-link to="/register">Register</router-link>
    |
    <button>Logout</button>
  </nav>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Navbar',

    setup() {
      return {};
    },
  });
</script>

<style scoped></style>
