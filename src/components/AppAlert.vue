<script setup>
defineProps({
  type: {
    type: String,
    required: true,
    validator(value) {
      return ['primary', 'danger'].includes(value);
    }
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  closable: {
    type: Boolean,
    required: false,
  }
});
const emit = defineEmits(['close']);
const handleClose = () => {
  emit('close');
}
</script>

<template>
  <div :class="`alert alert_${type}`">
    <p class="alert__title">{{ title }}</p>
    <p class="alert__text">{{ text }}</p>
    <button v-if="closable" class="alert__btn" @click="handleClose">
      <div class="close"></div>
    </button>
  </div>
</template>

<style scoped lang='scss'>
.alert {
  background-color: #fff;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  width: 100%;
  height: 80px;
  z-index: 10;
  box-shadow: 0px 0px 5px 0px #42D6B1;

  &_primary {
    border-left: 10px solid #BDA98B;
  }

  &_danger {
    border-left: 10px solid #915700;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 600;
  }

  &__btn {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    background-color: transparent;
    position: absolute;
    right: 20px;
    top: 10px;
  }
}

.close {
  position: relative;
  &::before,
  &::after {
    width: 30px;
    height: 4px;
    background-color: #000;
    position: absolute;
    content: '';
    left: -15px;
    top: -2px;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
}
</style>