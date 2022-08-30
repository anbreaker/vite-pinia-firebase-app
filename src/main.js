import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'ant-design-vue/es/message/style/css';

import './style.css';

createApp(App).use(router).use(createPinia()).mount('#app');
