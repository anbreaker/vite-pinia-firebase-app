import { createRouter, createWebHistory } from 'vue-router';

import { isAuthenticatedGuard } from './authGuard';

const routes = [
  {
    name: 'home',
    beforeEnter: [isAuthenticatedGuard],
    path: '/',
    component: () => import('../views/Home.vue'),
  },
  {
    name: 'edit',
    beforeEnter: [isAuthenticatedGuard],
    path: '/edit/:id',
    component: () => import('../views/Edit.vue'),
  },
  { name: 'login', path: '/login', component: () => import('../views/Login.vue') },
  { name: 'register', path: '/register', component: () => import('../views/Register.vue') },
  {
    name: 'login',
    path: '/:pathMatch(.*)*',
    component: () => import('../views/Login.vue'),
  },
];

const router = createRouter({
  // history: createWebHashHistory(), // To use Hastag
  history: createWebHistory(),
  routes,
});

export default router;
