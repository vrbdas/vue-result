<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const store = useAuthStore();
const router = useRouter();

function logout() {
  router.push({name: 'auth'});
  store.logout();
}
</script>

<template>
  <nav class="navbar">
    <RouterLink to="/" class="navbar-logo">
      Online Bank
    </RouterLink>
    <div class="navbar-links">
      <RouterLink to="/">Заявки</RouterLink>
      <RouterLink to="/help">Помощь</RouterLink>
      <a href="#">Сообщения</a>
      <a @click.prevent="logout" href="#">Выход</a>
    </div>
  </nav>
</template>

<style scoped lang="scss">
  .navbar {
    width: 100%;
    position: fixed;
    background-color: #fff;
    height: 40px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    user-select: none;
    &-logo {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #000;
    }
    &-links {
      display: flex;
      gap: 20px;
    }
  }
</style>