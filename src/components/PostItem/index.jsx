import moment from 'moment';
import 'moment/locale/ru';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Context } from '../../App';
import { deletePost } from '../../redux/slices/posts';
import s from './PostItem.module.scss';

function PostItem({ el }) {
  // ======== current theme
  const { theme } = React.useContext(Context);
  // ======== current theme

  // ======== current user
  const { user } = useSelector((store) => store.auth);
  // ======== current user

  // ======== disaptch
  const dispatch = useDispatch();
  // ======== disaptch

  // ======== deletePost
  const deletePostFromDb = () => {
    dispatch(deletePost(el._id));
  };
  // ======== deletePost

  return (
    <div className={theme ? s.item : s.item + ' ' + s.item_light}>
      <div className={s.wrapper}>
        {el.user?.email === user?.email && (
          <div className={s.menu}>
            <Link
              to={`/post/${el._id}/edit`}
              className={s.menu__btn + ' ' + s.menu__btn_edit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <title>pencil</title>
                <path d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z" />
              </svg>
            </Link>
            <div
              onClick={deletePostFromDb}
              className={s.menu__btn + ' ' + s.menu__btn_delete}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <title>bin</title>
                <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z" />
                <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z" />
              </svg>
            </div>
          </div>
        )}
        <div className={s.img}>
          <img src={`http://localhost:4444${el.imageUrl}`} alt="" />
        </div>
        <div className={s.author}>
          {el.user?.avatarUrl ? (
            <div className={s.author__img}>
              <img src={el.user?.avatarUrl} alt="" />
            </div>
          ) : (
            <div className={s.author__img}>{}</div>
          )}
          <Link to={`/posts/user/${el.user._id}`} className={s.author__name}>
            {el.user?.email}
          </Link>
        </div>
        <div className={s.date}>
          {moment(el?.createdAt).locale('ru').format('LLL')}
        </div>
        <div className={s.info}>
          <div className={s.info__item}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <title>eye</title>
              <path d="M16 9v0 0c9 0 13 7 13 7s-4 7-13 7c-9 0-13-7-13-7s4-7 13-7zM16 10c-8 0-11.8 6-11.8 6s3.8 6 11.8 6c8 0 11.8-6 11.8-6s-3.8-6-11.8-6v0 0zM16 20v0 0c-2.209 0-4-1.791-4-4s1.791-4 4-4c2.209 0 4 1.791 4 4s-1.791 4-4 4zM16 19c1.657 0 3-1.343 3-3s-1.343-3-3-3c-1.657 0-3 1.343-3 3s1.343 3 3 3v0 0zM16 17c0.552 0 1-0.448 1-1s-0.448-1-1-1c-0.552 0-1 0.448-1 1s0.448 1 1 1v0 0z" />
            </svg>
            <span>{el.viewsCount}</span>
          </div>
          <div className={s.info__item}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path
                data-name="comment-Regular"
                d="M17 3.25H7A4.756 4.756 0 0 0 2.25 8v13a.75.75 0 0 0 1.28.53l2.414-2.414a1.246 1.246 0 0 1 .885-.366H17A4.756 4.756 0 0 0 21.75 14V8A4.756 4.756 0 0 0 17 3.25ZM20.25 14A3.254 3.254 0 0 1 17 17.25H6.829a2.73 2.73 0 0 0-1.945.806L3.75 19.189V8A3.254 3.254 0 0 1 7 4.75h10A3.254 3.254 0 0 1 20.25 8Z"
              />
            </svg>
            <span>{el.comments.length}</span>
          </div>
        </div>
        <div className={s.post}>
          <Link to={`/post/${el._id}`} className={s.post__title}>
            {el.title}
          </Link>
          <div className={s.post__tags}>
            {el.tags.map((el) => (
              <Link to={`/posts/tags/${el}`} key={el} className={s.post__tag}>
                #{el}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
