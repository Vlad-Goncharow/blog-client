import TextField from '@mui/material/TextField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Context } from '../../App';
import { fetchRegister } from '../../redux/slices/auth';
import s from './Register.module.scss';

function Register() {
  // ======== current theme
  const { theme } = React.useContext(Context);
  // ======== current theme

  // ======== dispatch
  const dispatch = useDispatch();
  // ======== dispatch

  // ========  navigate
  const navigate = useNavigate();
  // ========  navigate

  // ======== form values
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      avatarUrl: '',
      email: '',
      fullName: '',
      password: '',
      confirm_password: '',
    },
    mode: 'onChange',
  });
  // ======== form values

  // ======== form change values
  const onSubmit = async (values) => {
    try {
      const data = await dispatch(fetchRegister(values));
      if (data.error.message !== 'Rejected') {
        return navigate('/');
      }
      data.payload.forEach((er) => {
        setError(er.param, { type: 'custom', message: er.msg });
      });
    } catch (e) {
      console.error(e);
    }
  };
  // ======== form change values

  return (
    <div className={s.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <h1 className={s.title}>Регистрация</h1>
        <div className={s.form__item}>
          <TextField
            id="avatarUrl"
            type="text"
            label="Аватарка"
            className={s.form__input}
            placeholder="Укажите ссылку на картинку"
            error={Boolean(errors.avatarUrl?.message)}
            helperText={errors.avatarUrl?.message}
            {...register('avatarUrl', {
              required: 'Укажите ссылку на картинку',
            })}
          />
        </div>
        <div className={s.form__item}>
          <TextField
            id="fullName"
            type="text"
            label="Полное имя"
            className={s.form__input}
            placeholder="Введите полное имя"
            error={Boolean(errors.fullName?.message)}
            helperText={errors.fullName?.message}
            {...register('fullName', { required: 'Укажите полное имя' })}
          />
        </div>
        <div className={s.form__item}>
          <TextField
            id="email"
            type="text"
            label="Почта"
            className={s.form__input}
            placeholder="Введите почту"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', { required: 'Укажите почту' })}
          />
        </div>
        <div className={s.form__item}>
          <TextField
            id="password"
            type="text"
            label="Пароль"
            className={s.form__input}
            placeholder="Введите пароль"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', { required: 'Укажите пароль' })}
          />
        </div>
        <div className={s.form__item}>
          <TextField
            id="confirm_password"
            type="text"
            label="Пароль"
            className={s.form__input}
            placeholder="Введите пароль"
            error={Boolean(errors.confirm_password?.message)}
            helperText={errors.confirm_password?.message}
            {...register('confirm_password', {
              required: 'Подтверждение пароля',
              validate: (val) => {
                if (watch('password') !== val) {
                  return 'Пароли не совпадают';
                }
              },
            })}
          />
        </div>
        <button onClick={handleSubmit(onSubmit)} className={s.form__submit}>
          Зарегестрироваться
        </button>
      </form>
    </div>
  );
}

export default Register;
