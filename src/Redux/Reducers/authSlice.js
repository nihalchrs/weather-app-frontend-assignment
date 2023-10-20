import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  accessToken: '',
  user: {},
  isResetPassword: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setuser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.isAuthenticated = action.payload;
      state.user = {};
      state.accessToken = '';
    },
  },
});

export const {
  setAccessToken,
  setIsAuthenticated,
  setuser,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
