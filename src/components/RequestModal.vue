<script setup>
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { useRequestsStore } from '@/stores/requests';
import { useAlertStore } from '@/stores/alert';

const alertStore = useAlertStore();
const requestsStore = useRequestsStore();

const emit = defineEmits(['formSent']);

const phoneRegExp = /^\+([1-9]\d{1,14})$/;
const summRegExp = /^(?!0\d)\d+(\.\d{1,2})?$/;

yup.setLocale({
  mixed: {
    required: 'Поле обязательно для заполнения',
  },
  string: {
    min: 'Минимальная длина ${min} символов',
    max: 'Максимальная длина ${max} символов',
  },
});

const schema = yup.object({
  name: yup.string().trim().required().min(6).max(100),
  phone: yup
    .string()
    .required()
    .matches(phoneRegExp, 'Введите номер в международном формате, пример: +79991234567'),
  summ: yup
    .string()
    .required()
    .matches(summRegExp, 'Некорректное значение')
    .test(
      'max-value',
      'Сумма не должна превышать 10000000',
      (value) => parseFloat(value) <= 10000000
    ),
});

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    status: 'active',
  },
});

const [name, nameAttrs] = defineField('name', {});
const [phone, phoneAttrs] = defineField('phone', {});
const [summ, summAttrs] = defineField('summ', {});
const [status, statusAttrs] = defineField('status', {});

// .prevent в шаблоне не нужно, встроено в handleSubmit
const onSubmit = handleSubmit((obj) => {
  requestsStore.saveRequest(obj);
  emit('formSent');
  alertStore.message = {
    type: 'primary',
    title: 'Сообщение',
    text: 'Заявка успешно создана',
    closable: true,
  }
  alertStore.clearMessage(5000);
});
</script>

<template>
  <h2 class="title_large">Создание заявки</h2>
  <form @submit="onSubmit">
    <label>
      ФИО:
      <input v-model="name" v-bind="nameAttrs" />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </label>
    <label>
      Телефон:
      <input v-model="phone" v-bind="phoneAttrs" />
      <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
    </label>
    <label>
      Сумма:
      <input v-model="summ" v-bind="summAttrs" />
      <span v-if="errors.summ" class="error">{{ errors.summ }}</span>
    </label>
    <label>
      Статус:
      <select v-model="status" v-bind="statusAttrs">
        <option value="active">Активен</option>
        <option value="cancelled">Отменен</option>
        <option value="completed">Завершен</option>
        <option value="processing">Выполняется</option>
      </select>
    </label>
    <button class="btn" type="submit">Создать</button>
  </form>
</template>

<style scoped lang="scss"></style>
