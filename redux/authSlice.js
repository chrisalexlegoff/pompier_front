import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem('jwtToken');
    },
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { login, logout, setAuth } = authSlice.actions;

export default authSlice.reducer;
