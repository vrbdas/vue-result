<script setup>
import { computed } from 'vue';
import AuthLayout from './layouts/AuthLayout.vue';
import MainLayout from './layouts/MainLayout.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const layouts = {
  AuthLayout,
  MainLayout,
};
const layout = computed(() => layouts[route.meta.layout] ?? AuthLayout);
</script>

<template>
  <component :is="layout"></component>
</template>

<style scoped lang="scss"></style>