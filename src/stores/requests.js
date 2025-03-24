import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';
import { useAlertStore } from './alert';

export const useRequestsStore = defineStore('requestsStore', () => {
  const authStore = useAuthStore();
  const alertStore = useAlertStore();

  const requests = ref([]);

  async function saveRequest(data) {
    console.log(authStore.userData.localId);
    try {
      if (!authStore.userData.localId || !authStore.userData.idToken) {
        throw new Error('Пользователь не авторизован');
      }
  
      const response = await axios.post(
        `https://vue-courseworkfinal-default-rtdb.asia-southeast1.firebasedatabase.app/${authStore.userData.localId}/requests.json?auth=${authStore.userData.idToken}`,
        data
      );
  
      loadRequests();
  
    } catch (err) {
      alertStore.message = {
        type: 'danger',
        title: 'Ошибка',
        text: `${err.message}`,
        closable: true,
      };
    }
  }

  async function loadRequests() {
    try {
      const response = await axios.get(
        `https://vue-courseworkfinal-default-rtdb.asia-southeast1.firebasedatabase.app/${authStore.userData.localId}/requests.json?auth=${authStore.userData.idToken}`
      );
      requests.value = Object.keys(response.data).map((key) => {
        return {
          id: key,
          ...response.data[key],
        };
      });
    } catch (err) {
      alertStore.message = {
        type: 'danger',
        title: 'Ошибка',
        text: `${err.message}`,
        closable: true,
      };
    }
  }

  return { saveRequest, loadRequests, requests };
});
