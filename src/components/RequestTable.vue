<script setup>
import { onMounted } from 'vue';
import { useRequestsStore } from '@/stores/requests';
import { useAuthStore } from '@/stores/auth';

const requestsStore = useRequestsStore();
const authStore = useAuthStore();

onMounted(() => {
  requestsStore.loadRequests();
});
</script>

<template>
  <div class="inline">
    Пользователь:<span class="title">{{ authStore.userData.email }}</span>
  </div>
  <h3 v-if="requestsStore.requests.length == 0" class="title">Заявок пока нет</h3>
  <table v-else>
    <thead>
      <tr>
        <th>ID</th>
        <th>ФИО</th>
        <th>Телефон</th>
        <th>Сумма</th>
        <th>Статус</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="request in requestsStore.requests" :key="request.id">
        <td>{{ request.id }}</td>
        <td>{{ request.name }}</td>
        <td>{{ request.phone }}</td>
        <td>{{ request.summ }}</td>
        <td>{{ request.status }}</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
.inline {
  display: inline-flex;
  gap: 5px;
}
</style>
