import { createSlice } from "@reduxjs/toolkit";

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

interface Theme {
    mode: "dark" | "light";
    isDark: boolean;
}

const initialState: Theme = {
    mode: prefersDark ? "dark" : "light",
    isDark: prefersDark,
}


const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggle(state) {
            if (state.mode === "dark") {
                state.mode = "light";
                state.isDark = false;
            } else {
                state.mode = "dark";
                state.isDark = true;
            }
        }

    }

})


export const { toggle } = themeSlice.actions;
export default themeSlice.reducer;
