<script setup>
import TheNavbar from '@/components/TheNavbar.vue';
import AppAlert from '@/components/AppAlert.vue';
import { useAlertStore } from '@/stores/alert';

const alertStore = useAlertStore();
</script>

<template>
  <TheNavbar></TheNavbar>
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
