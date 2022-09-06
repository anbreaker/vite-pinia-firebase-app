import { createRouter, createWebHistory } from 'vue-router';

import { isAuthenticatedGuard } from './authGuard';

const routes = [
  {
    beforeEnter: [isAuthenticatedGuard],
    component: () => import('../views/Home.vue'),
    name: 'home',
    path: '/',
  },
  {
    beforeEnter: [isAuthenticatedGuard],
    component: () => import('../views/Edit.vue'),
    name: 'edit',
    path: '/edit/:id',
  },
  {
    component: () => import('../views/Login.vue'),
    path: '/login',
    name: 'login',
  },
  {
    component: () => import('../views/Register.vue'),
    path: '/register',
    name: 'register',
  },
  {
    beforeEnter: [isAuthenticatedGuard],
    component: () => import('../views/Profile.vue'),
    name: 'profile',
    path: '/profile',
  },
  {
    component: () => import('../views/Login.vue'),
    name: 'login',
    path: '/:pathMatch(.*)*',
  },
];

const router = createRouter({
  // history: createWebHashHistory(), // To use Hastag
  history: createWebHistory(),
  routes,
});

export default router;
