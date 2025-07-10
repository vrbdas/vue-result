<script setup>
import { watch } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { setLocale } from 'yup';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useAlertStore } from '@/stores/alert';

const alertStore = useAlertStore();
const authStore = useAuthStore();
const router = useRouter();

setLocale({
  mixed: {
    default: 'Поле заполнено неправильно',
    required: 'Поле обязательно для заполнения',
  },
  string: {
    email: 'Поле должно быть валидным email-адресом',
    min: 'Поле должно содержать минимум ${min} символов',
  },
});

const schema = yup.object({
  email: yup.string().trim().required().email(),
  password: yup.string().trim().required().min(6),
});

const { errors, defineField, isSubmitting, submitCount, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const [email, emailAttrs] = defineField('email', {});
const [password, passwordAttrs] = defineField('password', {});

const onSubmit = handleSubmit(async (values) => {
  if (!alertStore.message.type) {
    try {
      await authStore.login(values);
      resetForm();
      router.push({ name: 'home' });
    } catch {}
  }
});

watch(
  () => submitCount.value,
  (newValue) => {
    if (newValue > 2) {
      alertStore.message = {
        type: 'danger',
        title: 'Ошибка',
        text: 'Слишком много попыток входа. Попробуйте позже',
        closable: false,
      };
      submitCount.value = 0;
      alertStore.clearMessage(5000);
    }
  }
);
</script>

<template>
  <div class="card">
    <h2 class="title_xlarge">Войти в систему</h2>
    <p>Тестовый email: <strong>testuser@gmail.com</strong></p>
    <p>Пароль: <strong>123456</strong></p>
    <form @submit="onSubmit">
      <label>
        Email:
        <input
          v-model="email"
          v-bind="emailAttrs"
          :class="{ invalid: errors.email }"
          placeholder="Введите ваш email"
        />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </label>
      <label>
        Пароль:
        <input
          v-model="password"
          v-bind="passwordAttrs"
          :class="{ invalid: errors.password }"
          placeholder="Введите ваш пароль"
        />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
      </label>
      <button class="btn" type="submit" :disabled="isSubmitting || !!alertStore.message.type">Войти</button>
    </form>
  </div>
</template>

<style scoped lang="scss"></style>
