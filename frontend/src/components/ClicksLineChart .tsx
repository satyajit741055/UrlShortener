import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

type ClicksData = {
  date: string;
  clicks: number;
};

const ClicksLineChart = ({ data }: { data: ClicksData[] }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg mt-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Clicks Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={window.matchMedia('(prefers-color-scheme: dark)').matches ? '#444' : '#ccc'} />
          <XAxis dataKey="date" tick={{ fill: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#ddd' : '#555' }} />
          <YAxis tick={{ fill: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#ddd' : '#555' }} />
          <Tooltip
            contentStyle={{ backgroundColor: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#1f2937' : '#fff' }}
            labelStyle={{ color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#ddd' : '#000' }}
          />
          <Line type="monotone" dataKey="clicks" stroke="#6366F1" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClicksLineChart;