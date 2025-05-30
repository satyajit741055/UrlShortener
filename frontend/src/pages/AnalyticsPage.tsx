import type { RootState } from "@/app/store";
import Card from "@/components/Card";
import ClicksLineChart from "@/components/ClicksLineChart ";

import ClicksTable from "@/components/ClicksTable";
import DeviceBreakdownPieChart from "@/components/DeviceBreakdownPieChart";
import { getClicksByDate } from "@/utils/getClicksByDate";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export type AnalyticsType = {
    timestamp: string;
    country?: string;
    ipAddress: string;
    userAgent: string;
};

type UrlAnalyticsType = {
    _id: string;
    shortId: string;
    originalUrl: string;
    clicks: number;
    analytics: AnalyticsType[];
    createdAt : Date;
};

const AnalyticsPage = () => {
    const { isAuthenticated, token, isAuthChecked } = useSelector(
        (state: RootState) => state.auth
    );
    const [isSubmit, setIsSubmit] = useState(false);
    const [urlAnalytics, setUrlAnalytics] = useState<UrlAnalyticsType | null>(null);
    const { shortId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthChecked) return;
        if (!isAuthenticated || !token) {
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            try {
                setIsSubmit(true);
                const response = await axios.get(
                    `http://localhost:5000/api/analytics/${shortId}`,
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.data) {
                    throw new Error("Error while fetching data");
                }

                setUrlAnalytics(response.data.data);
            } catch (error: any) {
                console.error("Error during URL fetching", error);
                toast.error(error.response?.data?.message || "Something went wrong");
            } finally {
                setIsSubmit(false);
            }
        };

        fetchData();
    }, [isAuthChecked, isAuthenticated, token, shortId]);

    return (
        <div className="max-w-5xl mx-auto p-4 space-y-6">
            {isSubmit && (
                <div className="text-center text-gray-600 dark:text-gray-300">
                    Loading analytics...
                </div>
            )}

            

            {urlAnalytics && (

                <Card
                    shortUrl={`http://localhost:5173/${urlAnalytics.shortId}`}
                    originalUrl={urlAnalytics.originalUrl}
                    clicks={urlAnalytics.clicks}
                    createdAt={urlAnalytics.createdAt}
                />
            )}

            {urlAnalytics?.analytics?.length ? (
                <>
                    <ClicksLineChart data={getClicksByDate(urlAnalytics.analytics)} />

                    <div className="mt-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                            Click Logs
                        </h2>
                        <ClicksTable analytics={urlAnalytics.analytics} />
                    </div>

                    <DeviceBreakdownPieChart analytics={urlAnalytics.analytics} />
                </>
            ) : (
                !isSubmit && (
                    <p className="text-gray-500 dark:text-gray-400 text-center">
                        No analytics data available for this URL.
                    </p>
                )
            )}
        </div>
    );
};

export default AnalyticsPage;
