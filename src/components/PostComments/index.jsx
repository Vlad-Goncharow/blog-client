import moment from 'moment';
import 'moment/locale/ru';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Context } from '../../App';
import axios from '../../axios';
import s from './PostComments.module.scss';

function PostComments({ post }) {
  // ======== current theme
  const { theme } = React.useContext(Context);
  // ======== current theme

  // ======== post id
  const { id } = useParams();
  // ======== post id

  // ======== input ref
  const inputRef = React.useRef();
  // ======== input ref

  // ======== input value
  const [inputValue, setInputValue] = React.useState('');
  // ======== input value

  // ======== is edit comment
  const [isEdit, setIsEdit] = React.useState(false);
  // ======== is edit comment

  // ======== editable comment id
  const [commentId, setCommentId] = React.useState('');
  // ======== editable comment id

  // ======== comments
  const [comments, setComments] = React.useState([]);
  // ======== comments

  // ======== load all comments
  const loadComments = async () => {
    const { data } = await axios.get(`/posts/${id}/load-comments`);
    setComments(data);
  };

  React.useEffect(() => {
    loadComments();
  }, [id]);
  // ======== load all comments

  // ======== current user
  const { user } = useSelector((store) => store.auth);
  // ======== current user

  // ======== change input value
  const inputChange = (e) => {
    setInputValue(e.target.value);
  };
  // ======== change input value

  // ======== start edit comment
  const editComment = (comment) => {
    setIsEdit(true);
    setCommentId(comment._id);
    setInputValue(comment.text);
  };
  // ======== start edit comment

  // ======== add new comment
  const addNewComment = async (e) => {
    e.preventDefault();
    if (isEdit) {
      const { data } = await axios.patch(`/comments/${commentId}`, {
        text: inputValue,
      });
      if (data.succes) {
        setComments((prev) => {
          return prev.map((el) => {
            if (el._id === commentId) {
              return {
                ...el,
                text: inputValue,
              };
            } else {
              return el;
            }
          });
        });
        setInputValue('');
        inputRef.current.focus();
      }
    } else {
      if (inputValue) {
        const { data } = await axios.post(`/posts/${id}/add-comment`, {
          text: inputValue,
        });
        setComments((prev) => [...prev, data]);
        setInputValue('');
      }
    }
  };
  // ======== add new comment

  // ======== check comment owner
  const check = (email) => {
    if (post.user.email === user?.email || user?.email === email) {
      return true;
    }
    return false;
  };
  // ======== check comment owner

  // ======== delete comment
  const deleteComment = async (id) => {
    const { data } = await axios.delete(`/comments/${id}`);
    setComments((prev) => prev.filter((el) => el._id !== data._id));
  };
  // ======== delete comment

  return (
    <div className={theme ? s.comments : s.comments + ' ' + s.comments_light}>
      <div className={s.comments__row}>
        {comments.length === 0 ? (
          <div>Коментариев нет!</div>
        ) : (
          comments.map((item) => (
            <div key={item._id} className={s.comment}>
              <div className={s.comment__top}>
                <div className={s.comment__avatar}>
                  <img src={item.user.avatarUrl} alt="" />
                </div>
                <div className={s.comment__info}>
                  <div className={s.comment__email}>{item.user.email}</div>
                  <p className={s.comment__text}>
                    {moment(item?.createdAt).locale('ru').format('LLL')}
                  </p>
                  {check(item.user.email) && (
                    <div className={s.comment__owner}>
                      <div
                        onClick={() => editComment(item)}
                        className={s.owner__btn + ' ' + s.owner__btn_edit}
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
                      </div>
                      <div
                        onClick={() => deleteComment(item._id)}
                        className={s.owner__btn + ' ' + s.owner__btn_delete}
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
                </div>
              </div>
              <p className={s.comment__text}>{item.text}</p>
            </div>
          ))
        )}
      </div>
      {user && (
        <form onSubmit={addNewComment} action="" className={s.comments__form}>
          <input
            ref={inputRef}
            onChange={inputChange}
            value={inputValue}
            placeholder="Введите текст коментария"
            type="text"
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <title>message-square</title>
              <path d="M22 15v-10c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879h-14c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v16c0 0.256 0.098 0.512 0.293 0.707 0.391 0.391 1.024 0.391 1.414 0l3.707-3.707h11.586c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121zM20 15c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-12c-0.276 0-0.526 0.112-0.707 0.293l-2.293 2.293v-13.586c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293h14c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707z" />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}

export default PostComments;
