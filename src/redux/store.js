import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth';
import { postsReducer } from './slices/posts';

const RootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

export const store = configureStore({
  reducer: RootReducer,
});
