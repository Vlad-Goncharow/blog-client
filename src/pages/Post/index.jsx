import MDEditor from '@uiw/react-md-editor';
import React from 'react';
import { useParams } from 'react-router-dom';

import { Context } from '../../App';
import axios from '../../axios';
import PostComments from '../../components/PostComments';
import Sidebar from '../../components/Sidebar';
import s from './Post.module.scss';

function Post() {
  // ======== current theme
  const { theme, isSidebar } = React.useContext(Context);
  // ======== current theme

  // ======== loading post
  const [loading, setLoading] = React.useState(true);
  // ======== loading post

  const [post, setPost] = React.useState();
  // ======== current post

  // ======== post id
  const { id } = useParams();
  // ======== post id

  // ======== get current post info
  const getPost = async () => {
    const { data } = await axios.get(`/posts/${id}`);
    setPost(data);
    setLoading(false);
  };
  // ======== get current post info

  // ======== get post
  React.useEffect(() => {
    getPost();
  }, []);
  // ======== get post

  if (loading) {
    return <div>загрузка</div>;
  }

  return (
    <div className={'container' + ' ' + s.container}>
      <div className={s.wrapper}>
        <div className={s.top}>
          <div className={s.image}>
            <img src={`${process.env.REACT_APP_API_URL}${post.imageUrl}`} alt="" />
          </div>
          <div className={s.user}>
            <div className={s.user__img}>
              {post.user?.avatarUrl ? (
                <img src={post.user?.avatarUrl} alt="" />
              ) : null}
            </div>
            <div className={s.user__name}>{post.user.fullName}</div>
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
              <span>{post.viewsCount}</span>
            </div>
            <div className={s.info__item}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                  data-name="comment-Regular"
                  d="M17 3.25H7A4.756 4.756 0 0 0 2.25 8v13a.75.75 0 0 0 1.28.53l2.414-2.414a1.246 1.246 0 0 1 .885-.366H17A4.756 4.756 0 0 0 21.75 14V8A4.756 4.756 0 0 0 17 3.25ZM20.25 14A3.254 3.254 0 0 1 17 17.25H6.829a2.73 2.73 0 0 0-1.945.806L3.75 19.189V8A3.254 3.254 0 0 1 7 4.75h10A3.254 3.254 0 0 1 20.25 8Z"
                />
              </svg>
              <span>{post.comments.length}</span>
            </div>
          </div>
          <h1 className={s.title}>{post.title}</h1>
          <ul className={s.tags}>
            {post.tags.map((el, i) => (
              <li className={s.tags__tag} key={`${el}-${i}`}>
                #{el}
              </li>
            ))}
          </ul>
          <MDEditor.Markdown source={post.text} className={s.markdown} />
        </div>
        <PostComments post={post} />
      </div>
      {isSidebar && <Sidebar />}
    </div>
  );
}

export default Post;
