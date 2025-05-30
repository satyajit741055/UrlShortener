import { format } from "date-fns";

type AnalyticsType = {
  timestamp: string;
  ipAddress: string;
  country?: string;
  userAgent: string;
};

const ClicksTable = ({ analytics }: { analytics: AnalyticsType[] }) => {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl shadow-lg bg-white dark:bg-gray-900">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
          <tr>
            {['Time', 'IP Address', 'Country', 'Device (User Agent)'].map((header) => (
              <th key={header} className="px-6 py-3 text-left font-semibold whitespace-nowrap">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {analytics.map((entry, idx) => (
            <tr
              key={idx}
              className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''}`}
            >
              <td className="px-6 py-3 whitespace-nowrap">{format(new Date(entry.timestamp), "dd MMM yyyy, hh:mm a")}</td>
              <td className="px-6 py-3 whitespace-nowrap">{entry.ipAddress}</td>
              <td className="px-6 py-3 whitespace-nowrap">{entry.country || "Unknown"}</td>
              <td className="px-6 py-3 max-w-xs truncate">{entry.userAgent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default ClicksTable;
