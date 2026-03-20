import React, { useState } from 'react';
import { useGetOrderStatusCountsQuery } from '../../services/saleApi';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';

export default function OrderStatusChart() {
    const today = dayjs().format('YYYY-MM-DD');
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);

    const { data: orderStatusData, isLoading, isError } = useGetOrderStatusCountsQuery({
        start: startDate,
        end: endDate,
    });

    if (isLoading) return <div className="p-4 text-center text-gray-600">Loading chart...</div>;
    if (isError) return <div className="p-4 text-center text-red-600 font-medium">Error fetching chart data</div>;

    // Aggregate today’s total counts
    const totals = orderStatusData?.data?.reduce(
        (acc, row) => {
            acc.PENDING += row.pending;
            acc.DELIVERED += row.delivered;
            acc.CANCEL += row.cancelled;
            return acc;
        },
        { PENDING: 0, DELIVERED: 0, CANCEL: 0 }
    );

    const chartData = [
        { name: 'Pending', value: totals?.PENDING || 0 },
        { name: 'Delivered', value: totals?.DELIVERED || 0 },
        { name: 'Canceled', value: totals?.CANCEL || 0 },
    ];

    const COLORS = ['#f6c23e', '#1cc88a', '#e74a3b'];

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl mt-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">
                Today’s Order Status Overview
            </h2>

            <div className="w-full h-96 flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            label
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
