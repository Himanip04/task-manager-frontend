import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    signupSuccess: (state, action) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
      state.token = '';

      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { loginSuccess, logout,signupSuccess } = authSlice.actions;
export default authSlice.reducer;
