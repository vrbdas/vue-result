<script setup>
const props = defineProps(['title']);
document.title = `${props.title} | Онлайн Банк`;
</script>

<template>
  <div class="card">
    <h2 class="title_xlarge">
      {{ title }}
      <slot name="header"></slot>
    </h2>
    <slot name="main"></slot>
  </div>
</template>

<style scoped lang="scss">

</style>
