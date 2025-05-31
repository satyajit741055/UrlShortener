import type { UrlType } from "@/features/reduxLogic/urlRedux/url.Slice";
import axios from "axios";

export const getUrls = async (token: string): Promise<UrlType[]> => {
    const response = await axios.get('http://localhost:5000/api/me', {
        headers: { authorization: `Bearer ${token}` },
    });

    if (!response.data || !response.data.data.urls) {
        throw new Error('Failed to fetch URLs');
    }

    return response.data.data.urls;
};
