import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alertStore', () => {
  const message = ref({
    type: '',
    title: '',
    text: '',
    closable: true,
  });

  function clearMessage(timeout) {
    if (timeout) {
      setTimeout(
        () => (message.value = { type: '', title: '', text: '', closable: true }),
        timeout
      );
    } else {
      message.value = { type: '', title: '', text: '', closable: true };
    }
  }

  return { message, clearMessage };
});
