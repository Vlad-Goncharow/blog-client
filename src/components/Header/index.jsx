import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Context } from '../../App';
import DarkTheme from '../../assets/img/darkMoon.png';
import LightTheme from '../../assets/img/lightMoon.png';
import UseClickOutside from '../../hooks/UseClickOutside';
import { fetchLogout, selectIsAuth } from '../../redux/slices/auth';
import s from './Header.module.scss';

function Header({ setItems }) {
  const [burger, setBurger] = React.useState(true);
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (pathname === '/login') {
      return setBurger(false);
    }

    if (pathname === '/register') {
      return setBurger(false);
    }

    setBurger(true);
  }, [pathname]);

  const toggleSidebar = () => {
    setBurger((prev) => !prev);
    setIsSidebar((prev) => !prev);
  };

  // ======== navigate
  const navigate = useNavigate();
  // ======== navigate

  // ======== current theme
  const { theme, setTheme, isSidebar, setIsSidebar } =
    React.useContext(Context);
  // ======== current theme

  // ======== all posts
  const { posts } = useSelector((store) => store.posts);
  // ======== all posts

  // ======== dispatch
  const dispatch = useDispatch();
  // ======== dispatch

  // ======== is user auth
  const isAuth = useSelector(selectIsAuth);
  // ======== is user auth

  // ======== current user
  const { user } = useSelector((store) => store.auth);
  // ======== current user

  // ======== menu ref
  const menuRef = React.useRef(null);
  // ======== menu ref

  // ========category
  const [category, setCategory] = React.useState('Названию');
  // ======== category

  // ======== menu state is active
  const [meniIsOpen, setMenuIsOpen] = React.useState(false);
  // ======== menu state is active

  // ======== input value
  const [value, setValue] = React.useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };
  // ======== input value

  // ======== theme
  const toogleTheme = () => {
    setTheme((prev) => !prev);
  };
  // ======== theme

  // ======== set category search
  const categoryHandler = (cat) => {
    setCategory(cat);
    setMenuIsOpen(false);
  };
  // ======== set category search

  // ======== check click outside
  UseClickOutside(menuRef, () => setMenuIsOpen(false));
  // ======== check click outside

  // ======== sarch posts by value
  React.useEffect(() => {
    if (!posts.loading) {
      if (value.length === 0) {
        return setItems(posts.items);
      }

      if (category === 'Тегам') {
        let qwe = value.split(' ');
        qwe.forEach((el) => {
          let arr = [...posts.items].filter(
            (post) =>
              post.tags.filter((tag) =>
                tag.toLowerCase().includes(el.toLowerCase()),
              ).length > 0,
          );
          setItems(arr);
        });
      }

      if (category === 'Названию') {
        let arr = [...posts.items].filter((post) =>
          post.title.toLowerCase().includes(value.toLowerCase()),
        );
        setItems(arr);
      }
    }
  }, [value, category, posts.loading, posts.items]);
  // ======== sarch posts by value

  // ======== logout
  const logout = () => {
    localStorage.removeItem('token');
    dispatch(fetchLogout());
    navigate('/posts/all');
  };
  // ======== logout

  return (
    <header className={theme ? s.header : s.header + ' ' + s.header_light}>
      <div className={'container'}>
        <div className={s.top}>
          {burger && (
            <div
              className={
                !isSidebar ? s.burger : s.burger + ' ' + s.burger__open
              }
              onClick={() => setIsSidebar((prev) => !prev)}
            >
              <span></span>
            </div>
          )}
          <Link to="/posts/all" className={s.logo}>
            WhatBlog
          </Link>
          <div className={s.right}>
            <div className={s.auth}>
              {isAuth ? (
                <>
                  <div className={s.auth__name}>{user.fullName}</div>
                  <button onClick={logout} className={s.auth__logout}>
                    ВЫЙТИ
                  </button>
                  <Link to="/create" className={s.auth__create}>
                    Создать запись
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={s.auth__btn + ' ' + s.auth__btn_login}
                  >
                    Войти
                  </Link>
                  <Link
                    to="/register"
                    className={s.auth__btn + ' ' + s.auth__btn_register}
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </div>
            <div className={s.theme} onClick={toogleTheme}>
              {theme ? (
                <img src={DarkTheme} alt="" />
              ) : (
                <img src={LightTheme} alt="" />
              )}
            </div>
          </div>
          <form action="" className={s.form}>
            <input
              onChange={onChange}
              value={value}
              type="text"
              placeholder={`Пойск по ${category}`}
            />
            <div className={s.current} onClick={() => setMenuIsOpen(true)}>
              {category}
            </div>
            {meniIsOpen && (
              <div ref={menuRef} className={s.menu}>
                <div
                  className={s.menu__item}
                  onClick={() => categoryHandler('Названию')}
                >
                  Названию
                </div>
                <div
                  className={s.menu__item}
                  onClick={() => categoryHandler('Тегам')}
                >
                  Тегам
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
