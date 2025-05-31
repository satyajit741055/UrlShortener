import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/reduxLogic/authReduxLogic/authSlice'
import urlReducer from '../features/reduxLogic/urlRedux/url.Slice'
import themeReducer from '../features/reduxLogic/theme/themeSlice'

export const store = configureStore({
    reducer: {
        auth : authReducer,
        theme: themeReducer,
        url: urlReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>;