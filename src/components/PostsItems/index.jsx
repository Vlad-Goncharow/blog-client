import React from 'react';
import { useSelector } from 'react-redux';

import PostItem from '../PostItem';
import s from './PostsItems.module.scss';

function PostsItems({ items }) {
  // ======== all posts
  const { posts } = useSelector((store) => store.posts);
  // ======== all posts

  return (
    <div className={s.row}>
      {posts.loading === false &&
        items.map((el) => <PostItem key={el._id} el={el} />)}
    </div>
  );
}

export default PostsItems;
