import TextField from '@mui/material/TextField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Context } from '../../App';
import { fetchLogin } from '../../redux/slices/auth';
import s from './Login.module.scss';

function Login() {
  // ======== current theme
  const { theme } = React.useContext(Context);

  // ======== current theme

  // ======== dispatch
  const dispatch = useDispatch();
  // ======== dispatch

  // ======== navigate
  const navigate = useNavigate();
  // ======== navigate

  // ======== form values
  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  // ======== form values

  // ======== form submit
  const onSubmit = async (values) => {
    try {
      dispatch(fetchLogin(values));
      navigate('/posts/all');
    } catch (e) {
      console.error(e);
    }
  };
  // ======== form submit

  return (
    <div className={s.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <h1 className={s.title}>Авторизация</h1>
        <div className={s.form__item}>
          <TextField
            id="  "
            type="text"
            label="E-Mail"
            className={s.form__input}
            placeholder="Введите почту"
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
            {...register('password', { required: 'Укажите пароль' })}
          />
        </div>
        <button onClick={handleSubmit(onSubmit)} className={s.form__submit}>
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
