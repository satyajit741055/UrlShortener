import { format } from "date-fns";

type AnalyticsType = {
  timestamp: string;
  ipAddress: string;
  country?: string;
  userAgent: string;
};

const ClicksTable = ({ analytics }: { analytics: AnalyticsType[] }) => {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900 text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
          <tr>
            <th className="px-4 py-2 text-left font-semibold">Time</th>
            <th className="px-4 py-2 text-left font-semibold">IP Address</th>
            <th className="px-4 py-2 text-left font-semibold">Country</th>
            <th className="px-4 py-2 text-left font-semibold">Device (User Agent)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {analytics.map((entry, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-4 py-2">
                {format(new Date(entry.timestamp), "dd MMM yyyy, hh:mm a")}
              </td>
              <td className="px-4 py-2">{entry.ipAddress}</td>
              <td className="px-4 py-2">{entry.country || "Unknown"}</td>
              <td className="px-4 py-2 truncate max-w-[300px]">{entry.userAgent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClicksTable;
