import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Context } from '../../App';
import Pagination from '../../components/Pagination';
import PostItem from '../../components/PostItem';
import Sidebar from '../../components/Sidebar';
import { fetchPosts } from '../../redux/slices/posts';
import s from './Posts.module.scss';

function Posts({ items, setItems }) {
  // ======== current theme
  const { theme } = React.useContext(Context);
  // ======== current theme

  // ======== dispatch
  const dispatch = useDispatch();
  // ======== dispatch

  // ======== chose user id or tag name
  const { value, name, id } = useParams();

  // ======== chose user id or tag name

  // ======== posts after pagination
  const [docs, setDocs] = React.useState([]);
  // ======== posts after pagination

  // ======== check has id and name
  React.useEffect(() => {
    console.log(value);
    if (value === 'popular') {
      dispatch(fetchPosts({ popular: value }));
    }

    if (value === 'last') {
      dispatch(fetchPosts({ last: value }));
    }

    if (name) {
      dispatch(fetchPosts({ name }));
    }

    if (id) {
      dispatch(fetchPosts({ id }));
    }

    if (value === 'all') {
      dispatch(fetchPosts(false, false));
    }
  }, [value, name, id]);
  // ======== check has id and name

  return (
    <div className="container">
      <div className={s.postsPage}>
        <div className={s.wrapper}>
          <div className={s.row}>
            {docs.map((el) => (
              <PostItem el={el} key={el._id} />
            ))}
          </div>
          <Pagination setDocs={setDocs} items={items} setItems={setItems} />
        </div>
        <Sidebar />
      </div>
    </div>
  );
}

export default Posts;
