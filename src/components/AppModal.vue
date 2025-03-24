<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['modalClose']);

onMounted(() => {
  // закрытие модального окна при нажатии Esc
  window.addEventListener('keyup', handleKeyup);
});

function handleKeyup(event) {
  //console.log(event.key);
  if (event.key === 'Escape') {
    emit('modalClose');
  }
}

onUnmounted(() => {
  // при закрытии модального окна удалить слушатель
  window.removeEventListener('keyup', handleKeyup);
});

function maskClick() {
  // закрыть при нажании на затенение, условие для того чтобы при нажатии на само модальное окно не закрывалось из за всплытия событий
  // if (event.target.className === 'modal-mask') {
  //   emit('modalClose');
  // }
}
</script>

<template>
  <div class="modal-mask" @click="maskClick">
    <div class="card modal">
      <slot></slot>
      <button class="modal__btn" @click="$emit('modalClose')"></button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.modal-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 660px;
  height: fit-content;

  &__btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 20px;
    width: 20px;
    height: 20px;

    &::before,
    &::after {
      position: absolute;
      left: -1px;
      top: 8px;
      content: '';
      border: 2px solid #000;
      width: 20px;
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }
}
</style>
