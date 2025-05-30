import type { AnalyticsType } from "@/pages/AnalyticsPage";


export const getClicksByDate = (analytics: AnalyticsType[]) => {
  const clicksMap: Record<string, number> = {};

  analytics.forEach(({ timestamp }) => {
    const date = new Date(timestamp).toISOString().split('T')[0]; // 'YYYY-MM-DD'
    clicksMap[date] = (clicksMap[date] || 0) + 1;
  });

  const unsorted = Object.entries(clicksMap).map(([date, clicks]) => ({
    date,
    clicks,
  }));

  return unsorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};