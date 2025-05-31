import type { RootState } from "@/app/store";
import Card from "@/components/Card";
import ClicksLineChart from "@/components/ClicksLineChart";
import ClicksTable from "@/components/ClicksTable";
import DeviceBreakdownPieChart from "@/components/DeviceBreakdownPieChart";
import { getClicksByDate } from "@/utils/getClicksByDate";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { API_BASE_URL_SAFE } from "@/config/api";

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
  createdAt: Date;
};

const AnalyticsPage = () => {
  const { isAuthenticated, token, isAuthChecked } = useSelector((state: RootState) => state.auth);
  const [isSubmit, setIsSubmit] = useState(false);
  const [urlAnalytics, setUrlAnalytics] = useState<UrlAnalyticsType | null>(null);
  const { shortId } = useParams();
  const navigate = useNavigate();
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    if (!isAuthChecked) return;
    if (!isAuthenticated || !token) {
      navigate("/login");
      return;
    }
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }

    const fetchData = async () => {
      try {
        setIsSubmit(true);
        const response = await axios.get(`${API_BASE_URL_SAFE}/api/analytics/${shortId}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.data) throw new Error("Error while fetching data");

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-900 py-10 px-4 sm:px-6 lg:px-8 text-gray-800 dark:text-gray-100 transition-colors duration-500">
      <div className="max-w-5xl mx-auto space-y-10">

        <div className="text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 text-transparent bg-clip-text mb-2">
            Analytics Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track detailed stats and user behavior for your short URL.
          </p>
        </div>

        {isSubmit && (
          <div className="text-center text-lg text-gray-600 dark:text-gray-300 animate-pulse">
            Loading analytics...
          </div>
        )}

        {urlAnalytics && (
          <Card
            shortUrl={`${baseUrl}/${urlAnalytics.shortId}`}
            originalUrl={urlAnalytics.originalUrl}
            clicks={urlAnalytics.clicks}
            createdAt={urlAnalytics.createdAt}
            shortId={urlAnalytics.shortId}
          />
        )}

        {urlAnalytics?.analytics?.length ? (
          <>
            {/* Line Chart Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
                Click Activity Over Time
              </h2>
              <ClicksLineChart data={getClicksByDate(urlAnalytics.analytics)} />
            </section>

            {/* Table Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
                Click Logs
              </h2>
              <ClicksTable analytics={urlAnalytics.analytics} />
            </section>

            {/* Pie Chart Section */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
                Device Breakdown
              </h2>
              <DeviceBreakdownPieChart analytics={urlAnalytics.analytics} />
            </section>
          </>
        ) : (
          !isSubmit && (
            <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
              No analytics data available for this URL yet.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
