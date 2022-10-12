import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../../axios';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (value) => {
    if (value.popular) {
      const { data } = await axios.get(`/posts/popular`);
      return data;
    }

    if (value.last) {
      const { data } = await axios.get(`/posts/last`);
      return data;
    }

    if (value.id) {
      const { data } = await axios.get(`/posts/user/${value.id}`);
      return data;
    }

    if (value.name) {
      const { data } = await axios.get(`/posts/tags/${value.name}`);
      return data;
    }

    const { data } = await axios.get(`/posts`);
    return data;
  },
);

export const fetchPostsByTag = createAsyncThunk(
  'posts/fetchPostsByTag',
  async (name) => {
    const { data } = await axios.get(`/posts/tags/${name}`);

    return data;
  },
);

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get(`/posts/tags`);

  return data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  const { data } = await axios.delete(`/posts/${id}`);

  return data;
});

const initialState = {
  posts: {
    items: [],
    loading: true,
  },
  tags: {
    items: [],
    loading: true,
  },
};

const PostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    // ======== REGISTER
    [fetchPosts.pending]: (state) => {
      state.posts.items = null;
      state.posts.loading = true;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.loading = false;
      state.posts.items = action.payload;
    },
    [fetchPosts.rejected]: (state, payload) => {
      state.userError = state.payload;
      state.posts.loading = true;
      state.posts.items = [];
    },
    // ======== fetchPostsByTag
    [fetchPostsByTag.pending]: (state) => {
      state.posts.items = null;
      state.posts.loading = true;
    },
    [fetchPostsByTag.fulfilled]: (state, action) => {
      state.posts.loading = false;
      state.posts.items = action.payload;
    },
    [fetchPostsByTag.rejected]: (state, payload) => {
      state.userError = state.payload;
      state.posts.loading = true;
      state.posts.items = [];
    },
    // ======== fetch tags
    [fetchTags.pending]: (state) => {
      state.tags.items = null;
      state.tags.loading = true;
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.loading = false;
      state.tags.items = action.payload;
    },
    [fetchTags.rejected]: (state, payload) => {
      state.userError = state.payload;
      state.tags.loading = true;
      state.tags.items = [];
    },
    // ======== fetch tags
    [deletePost.fulfilled]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (el) => el._id !== action.payload._id,
      );
    },
    [deletePost.rejected]: (state, payload) => {
      state.userError = state.payload;
      state.posts.loading = true;
      state.posts.items = [];
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.posts.posts);

export const postsReducer = PostSlice.reducer;
