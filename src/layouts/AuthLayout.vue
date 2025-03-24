<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAlertStore } from '@/stores/alert';
import AppAlert from '@/components/AppAlert.vue';

const alertStore = useAlertStore();
const route = useRoute();

watch(
  () => route.query.message,
  (newValue) => {
    if (newValue === 'auth') {
      alertStore.message = {
        type: 'primary',
        title: 'Внимание',
        text: 'Вход в систему не выполнен',
        closable: true,
      };
      alertStore.clearMessage(5000);
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="container">
    <Transition name="fade">
      <AppAlert
        v-if="alertStore.message.type"
        :type="alertStore.message.type"
        :title="alertStore.message.title"
        :text="alertStore.message.text"
        :closable="alertStore.message.closable"
        @close="alertStore.clearMessage"
      />
    </Transition>
    <main>
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style scoped lang="scss"></style>
