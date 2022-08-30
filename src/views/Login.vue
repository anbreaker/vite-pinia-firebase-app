<template>
  <a-row>
    <a-col :xs="{ span: 24 }" :sm="{ span: 18, offset: 3 }" :lg="{ span: 12, offset: 6 }">
      <h1>Login</h1>

      <a-form
        layout="vertical"
        name="basic-login"
        :model="formState"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="email"
          :rules="[
            {
              required: true,
              whitespace: true,
              message: 'Please, input a correct email',
              type: 'email',
            },
          ]"
        >
          <a-input type="email" v-model:value="formState.email" />
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[
            {
              required: true,
              min: 6,
              whitespace: true,
              message: 'Please input your password with min 6 Characters!',
            },
          ]"
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
  import { message } from 'ant-design-vue';

  import { useUserStore } from '../stores/user.js';

  const userStore = useUserStore();

  const formState = reactive({
    email: 'test@test.com',
    password: 'testtest',
  });

  const onFinish = async () => {
    const response = await userStore.loginUser(formState.email, formState.password);

    if (!response) return message.success('Welcome User!');

    switch (response) {
      case 'auth/user-not-found':
        message.error('auth/user-not-found');
        break;
      case 'auth/wrong-password':
        message.error('auth/wrong-password');
        break;

      default:
        message.warning("Firebase's Error, repeat again");
        break;
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
</script>

<style scoped></style>
