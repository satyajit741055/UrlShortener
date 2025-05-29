import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/reduxLogic/authReduxLogic/authSlice'
import themeReducer from '../features/reduxLogic/theme/themeSlice'

export const store = configureStore({
    reducer: {
        auth : authReducer,
        theme: themeReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>;