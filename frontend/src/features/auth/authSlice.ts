import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem('token');

interface AuthState {
    token: string | null;
    isAuthenticated : boolean
}

const initialState : AuthState = {
    token : tokenFromStorage,
    isAuthenticated:!!!tokenFromStorage
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login(state,action:PayloadAction<string>) {
            state.token = action.payload;
            localStorage.setItem('token',action.payload);
            state.isAuthenticated = true;
        },
        logout(state){
            state.token = null;
            localStorage.removeItem('token');
            state.isAuthenticated = false;
        },
    },
});


export const { login,logout } = authSlice.actions;
export default authSlice.reducer;
