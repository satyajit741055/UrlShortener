
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UrlType {
  _id: string;
  shortId: string;
  originalUrl: string;
  clicks: number;
  createdAt: Date;
}

interface UrlState {
  urls: UrlType[];
}

const initialState: UrlState = {
  urls: []
};

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    setUrls(state, action: PayloadAction<UrlType[]>) {
      state.urls = action.payload;
    }
  }
});

export const { setUrls } = urlSlice.actions;
export default urlSlice.reducer;
