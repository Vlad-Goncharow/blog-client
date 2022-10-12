import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  const { data } = await axios.get('/auth/refresh', params);

  return data;
});

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (params) => {
    const { data } = await axios.post('/auth/login', params);

    return data;
  },
);

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/register', params);
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  },
);

export const fetchLogout = createAsyncThunk(
  'auth/fetchLogout',
  async (params) => {
    const { data } = await axios.post('/auth/logout', params);

    return data;
  },
);

const initialState = {
  user: null,
  userLoading: true,
  userError: '',
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // ======== REGISTER
    [fetchRegister.pending]: (state) => {
      state.user = null;
      state.userLoading = true;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.userLoading = false;
      state.user = action.payload;
    },
    [fetchRegister.rejected]: (state, action) => {
      state.userError = action.error;
      state.userLoading = true;
      state.user = null;
    },
    // ======== LOGIN
    [fetchLogin.pending]: (state) => {
      state.user = null;
      state.userLoading = true;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.userLoading = false;
      state.user = action.payload;
    },
    [fetchLogin.rejected]: (state, action) => {
      state.userError = action.payload;
      state.userLoading = true;
      state.user = null;
    },
    // ======== REFRESH
    [fetchAuth.pending]: (state) => {
      state.user = null;
      state.userLoading = true;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.userLoading = false;
      state.user = action.payload;
    },
    [fetchAuth.rejected]: (state, action) => {
      state.userError = action.payload;
      state.userLoading = true;
      state.user = null;
    }, // ======== LOGOUT
    [fetchLogout.pending]: (state) => {
      state.user = null;
      state.userLoading = true;
    },
    [fetchLogout.fulfilled]: (state, action) => {
      state.userLoading = true;
      state.user = null;
    },
    [fetchLogout.rejected]: (state, action) => {
      state.userError = null;
      state.userLoading = true;
      state.user = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.user);

export const authReducer = AuthSlice.reducer;
