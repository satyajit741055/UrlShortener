import type { UrlType } from "@/features/reduxLogic/urlRedux/url.Slice";
import axios from "axios";
import { API_BASE_URL_SAFE } from "@/config/api";

export const getUrls = async (token: string): Promise<UrlType[]> => {
    const response = await axios.get(`${API_BASE_URL_SAFE}/api/me`, {
        headers: { authorization: `Bearer ${token}` },
    });

    if (!response.data || !response.data.data.urls) {
        throw new Error('Failed to fetch URLs');
    }

    return response.data.data.urls;
};
