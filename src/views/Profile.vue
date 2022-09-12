<template>
  <h1>User's profile</h1>

  <a-row>
    <a-col :xs="{ span: 24 }" :sm="{ span: 18, offset: 3 }" :lg="{ span: 12, offset: 6 }">
      <h1>Login</h1>

      <a-form layout="vertical" name="basicProfile" :model="userStore.userData" @finish="onFinish">
        <a-form-item
          name="email"
          label="Your Email"
          :rules="[
            {
              required: true,
              whitespace: true,
              message: 'Please, input a correct email',
              type: 'email',
            },
          ]"
        >
          <a-input disabled type="email" v-model:value="userStore.userData.email" />
        </a-form-item>

        <a-form-item
          name="displayName"
          label="Enter your Name"
          :rules="[
            {
              required: true,
              whitespace: true,
              message: 'Please, input your name',
            },
          ]"
        >
          <a-input type="email" v-model:value="userStore.userData.displayName" />
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="userStore.loadingUser"
            :loading="userStore.loadingUser"
          >
            Update Information
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
  import { useUserStore } from '../stores/user';

  const userStore = useUserStore();

  const onFinish = () => {
    console.log('finish');
  };
</script>

<style lang="scss" scoped></style>
