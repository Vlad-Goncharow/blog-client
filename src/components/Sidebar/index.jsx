import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';



import { Context } from '../../App';
import DarkTheme from '../../assets/img/darkMoon.png';
import LightTheme from '../../assets/img/lightMoon.png';
import { fetchLogout } from '../../redux/slices/auth';
import { fetchTags } from '../../redux/slices/posts';
import s from './Sidebar.module.scss';


function Sidebar() {
  
  // ======== current theme
  const { theme, isSidebar, setTheme } = React.useContext(Context);
  // ======== current theme

  // ======== tags
  const { tags } = useSelector((store) => store.posts);

  const { user } = useSelector((store) => store.auth);

  // ======== tags

  // ======== dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ======== dispatch

  // ======== get all tags
  React.useEffect(() => {
    dispatch(fetchTags());
  }, []);
  // ======== get all tags

  let cx = classNames.bind(s);
  const check = cx(`${s.sidebar}`, {
    [s.sidebar__light]: theme === false,
    [s.sidebar__open]: isSidebar === true,
  });

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(fetchLogout());
    navigate('/posts/all');
  };

  const toogleTheme = () => {
    setTheme((prev) => !prev);
  };
  return (
    <div className={check}>
      <ul className={s.list}>
        <li>
          <Link to={`/posts/last`} className={s.category}>
            Новые
          </Link>
        </li>
        <li>
          <Link to={`/posts/popular`} className={s.category}>
            Популярные
          </Link>
        </li>
        <li>
          <div className={s.category}>Последнии теги #</div>
        </li>
        <>
          {tags.loading === false &&
            tags.items.map((el, i) => (
              <li>
                <Link
                  to={`/posts/tags/${el}`}
                  key={`${el}-${i}`}
                  className={s.tag}
                >
                  #{el}
                </Link>
              </li>
            ))}
        </>
      </ul>
      { isSidebar ?
        (user ? 
          <div className={s.wrapper}>
            <div className={s.wrapper__name}>
              <span>{user.fullName}</span>
              <div className={s.theme} onClick={toogleTheme}>
                {theme ? (
                  <img src={DarkTheme} alt="" />
                ) : (
                  <img src={LightTheme} alt="" />
                )}
              </div>
            </div>
            <div className={s.wrapper__auth}>
              <button className={s.wrapper__btn + ' ' + s.wrapper__btn_logout}>
                Выйти
              </button>
              <Link to={'/create'} className={s.wrapper__btn + ' ' + s.wrapper__btn_create}>
                Создать запись
              </Link>
            </div>
          </div>
         : 
          <div className={s.wrapper}>
            <div className={s.wrapper__auth}>
              <Link to={`/login`} className={s.wrapper__btn + ' ' + s.wrapper__btn_login}>
                Войти
              </Link>
              <Link to={`/register`} className={s.wrapper__btn + ' ' + s.wrapper__btn_register}>
                Регистрация
              </Link>
            </div>
          </div>
          ) : null
      }
    </div>
  );
}

export default Sidebar;