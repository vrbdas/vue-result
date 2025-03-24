import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useAlertStore } from './alert';

export const useAuthStore = defineStore('authStore', () => {
  const alertStore = useAlertStore();
  const userData = ref({});
  const isAuth = computed(() => !!userData.value.idToken);
  const loginTime = ref(0);
  const expireTimer = ref(0);
  const interval = ref(null);

  async function login(item) {
    try {
      const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_FB_KEY}`, {...item, returnSecureToken: true});
      console.log(data);
      userData.value = {
        idToken: data.idToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
        localId: data.localId,
        email: data.email,
      };
      setRefreshInterval();
    }
    catch (err) {
      if (err.response?.data?.error?.message == 'INVALID_LOGIN_CREDENTIALS') {
        alertStore.message = {
          type: 'danger',
          title: 'Ошибка',
          text: 'Неправильный email или пароль',
          closable: true,
        };
      } else {
        alertStore.message.value = {
          type: 'danger',
          title: 'Ошибка',
          text: 'Неизвестная ошибка. Попробуйте позже',
          closable: true,
        };
      }
      alertStore.clearMessage(5000);
      throw err;
    }
  }

  function setRefreshInterval() {
    loginTime.value = Date.now();
    if (!interval.value) {
      interval.value = setInterval(() => {
        expireTimer.value = loginTime.value + userData.value.expiresIn*1000 - Date.now();
      }, 1000);
    }
  }

  function logout() {
    userData.value = {};
    localStorage.removeItem('userData');
    interval.value = null;
  }

  function getLocalToken() {
    userData.value = JSON.parse(localStorage.getItem('userData')) ?? {};
  }

  async function refreshToken() {
    if (!userData.value.refreshToken) return;

    try {
      const { data } = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${import.meta.env.VITE_FB_KEY}`, {
        grant_type: 'refresh_token',
        refresh_token: userData.value.refreshToken,
      });
      userData.value = {
        ...userData.value,
        idToken: data.id_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
      };
      setRefreshInterval();
    } catch (err) {
      console.error('Ошибка обновления токена:', err);
      logout();
    }
  }

  watch(() => userData.value.idToken, (newData) => {
    if (newData) {
      localStorage.setItem('userData', JSON.stringify(userData.value));
    } else {
      localStorage.removeItem('userData');
    }
  }, { deep: true });

  watch(() => expireTimer.value, (newValue) => {
    if (newValue <= 60000) {
      refreshToken();
    } 
  }, { deep: true });

  return { userData, isAuth, login, logout, getLocalToken, refreshToken, loginTime, expireTimer };
});
