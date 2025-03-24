import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import { useAuthStore } from '@/stores/auth';
import { useRequestsStore } from '@/stores/requests';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: 'MainLayout',
        auth: true,
      },
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('@/views/HelpView.vue'),
      meta: {
        layout: 'MainLayout',
        auth: true,
      },
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/AuthView.vue'),
      meta: {
        layout: 'AuthLayout',
      },
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  const requestsStore = useRequestsStore();
  
  authStore.getLocalToken();
  authStore.refreshToken();

  if (to.meta.auth && authStore.isAuth) {
    return true;
  }
  if (to.meta.auth && !authStore.isAuth) {
    return '/auth?message=auth';
  }
  if(to.name == 'home') {
    requestsStore.loadRequests();
  }
  return true;
});

export default router;
