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
          <a-input type="text" v-model:value="userStore.userData.displayName" />
        </a-form-item>

        <a-upload
          list-type="picture"
          :before-upload="beforeUpload"
          :file-list="fileList"
          :max-count="1"
          @change="handleChange"
        >
          <a-button>Upload image</a-button>
        </a-upload>

        <a-form-item style="margin-top: 1rem">
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
  import { ref } from 'vue';
  import { message } from 'ant-design-vue';

  import { useUserStore } from '../stores/user';

  const userStore = useUserStore();

  const fileList = ref([]);

  const beforeUpload = (file) => {
    fileList.value = [...fileList.value, file];

    return false; // To Stop upload for server (antdv management)
  };

  const handleRemove = (file) => {
    const index = fileList.value.indexOf(file);

    const newFileList = fileList.value.slice();

    newFileList.splice(index, 1);

    fileList.value = newFileList;

    // fileList.value = [];
  };

  const handleChange = (info) => {
    validateTypesPicture(info);
  };

  const validateTypesPicture = (info) => {
    const { file } = info;

    if (info.file.status !== 'uploading') {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

      if (!isJpgOrPng) {
        message.error('You can only upload JPG file!');

        handleRemove(file);

        return;
      }

      const imageSize = file.size / 1024 / 1024 < 2;

      if (!imageSize) {
        message.error('Image must smaller than 2MB!');

        handleRemove(file);

        return;
      }
    }

    uploadOnlyOnePicture(info);
  };

  const uploadOnlyOnePicture = (info) => {
    let resFileList = [...info.fileList];

    resFileList = resFileList.slice(-1);

    resFileList = resFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }

      return file;
    });

    fileList.value = resFileList;
  };

  const onFinish = async () => {
    const response = await userStore.updateUser(userStore.userData.displayName);

    if (fileList.value[0]) {
      const error = await userStore.updateImage(fileList.value[0]);

      if (error) return message.success('Problem updating image: ' + error.message);
    }

    if (!response) return message.success('User is updated successfully!');

    message.error('Error while updating user' + response);
  };
</script>

<style lang="scss" scoped></style>
