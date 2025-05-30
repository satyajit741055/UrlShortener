import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    isAuthChecked: boolean;
    username : string | null;
}

interface LoginPayload {
  token: string;
  username: string;
}

const tokenFromStorage = localStorage.getItem('token');

const initialState: AuthState = {
    token: tokenFromStorage,
    isAuthenticated: !!tokenFromStorage,
    isAuthChecked: !!tokenFromStorage, 
    username : ''
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.token = action.payload.token;
      state.username = action.payload.username;
      localStorage.setItem('token', action.payload.token);
      state.isAuthenticated = true;
      state.isAuthChecked = true;
    },
    logout(state) {
      state.token = null;
      state.username = null;
      localStorage.removeItem('token');
      state.isAuthenticated = false;
      state.isAuthChecked = true;
    },
  },
});


export const { login,logout } = authSlice.actions;
export default authSlice.reducer;
