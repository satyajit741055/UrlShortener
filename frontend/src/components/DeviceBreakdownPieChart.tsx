import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as UAParser from 'ua-parser-js';

type AnalyticsType = {
    userAgent: string;
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F', '#FFBB28'];

const DeviceBreakdownPieChart = ({ analytics }: { analytics: AnalyticsType[] }) => {
    const browserMap: Record<string, number> = {};

    analytics.forEach((entry) => {
        const parser = new UAParser.UAParser();
        parser.setUA(entry.userAgent);

        const browser = parser.getBrowser().name || 'Unknown';
        browserMap[browser] = (browserMap[browser] || 0) + 1;
    });

    const data = Object.entries(browserMap).map(([name, value]) => ({
        name,
        value,
    }));

    return (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow mt-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Device/Browser Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DeviceBreakdownPieChart;