import * as yup from 'yup';

export const phoneNumber = yup
  .string()
  .matches(/^[0-9]+$/, 'Введите номер телефона корректно')
  .min(9, 'Заполните номер телефона полностью')
  .required('Заполните номер телефона');
