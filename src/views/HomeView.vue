<script setup>
import { ref } from 'vue';
import AppPage from '@/components/AppPage.vue';
import RequestTable from '@/components/RequestTable.vue';
import AppModal from '@/components/AppModal.vue';
import RequestModal from '@/components/RequestModal.vue';

const modal = ref(false);
</script>

<template>
  <teleport to="body">
    <Transition name="fade">
      <AppModal v-if="modal" @modalClose="modal = false">
        <RequestModal @formSent="modal = false"></RequestModal>
      </AppModal>
    </Transition>
  </teleport>
  <AppPage title="Список заявок">
    <template #header>
      <button @click="modal = true" class="btn">Создать</button>
    </template>
    <template #main>
      <RequestTable></RequestTable>
    </template>
  </AppPage>
</template>

<style scoped lang="scss"></style>
