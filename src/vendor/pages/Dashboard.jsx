import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useGetDailyReportQuery, useGetTotalRevenueQuery, useGetOrderStatusCountsQuery, useGetTopProductsQuery } from '../../services/saleApi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaMoneyBillWave, FaShoppingCart, FaChartLine, FaBoxOpen } from 'react-icons/fa';

export default function Dashboard() {
    const [startDate, setStartDate] = useState(dayjs().startOf('month').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));

    // API calls (Using object destructuring to set default values for cleaner rendering)
    const { data: dailySales = { data: [] } } = useGetDailyReportQuery({ start: startDate, end: endDate });
    const { data: totalRevenue = { data: { totalRevenue: 0 } } } = useGetTotalRevenueQuery({ start: startDate, end: endDate });
    const { data: orderStatusData = { data: [] } } = useGetOrderStatusCountsQuery({ start: startDate, end: endDate });
    const { data: topProducts = { data: [] } } = useGetTopProductsQuery({ start: startDate, end: endDate, top: 5 });

    // Transform data for recharts
    const chartData = orderStatusData.data.map(row => ({
        date: dayjs(row.date).format('YYYY-MM-DD'),
        PENDING: row.pending,
        DELIVERED: row.delivered,
        CANCEL: row.cancelled,
    }));

    // Calculate total orders for the summary card
    const totalOrders = dailySales.data.reduce((sum, d) => sum + d.totalOrders, 0);

    // Get the name of the top product
    const topProductName = topProducts.data?.[0]?.name || 'N/A';

    // Helper for currency formatting (Indian Rupee)
    const formatCurrency = (amount) => {
        return `₹${Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        // Main container with light background and consistent padding
        <div className="min-h-screen bg-gray-50 md:p-8 lg:p-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-3">Sales Dashboard</h1>

            {/* Date Filters - Refined Styling */}
            <div className="bg-white p-5 rounded-xl shadow-lg mb-8 flex flex-wrap gap-6 items-center border border-gray-100">
                <div className='flex items-center space-x-2'>
                    <label htmlFor="startDate" className="font-semibold text-gray-700">From:</label>
                    <input
                        id="startDate"
                        type="date"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                    />
                </div>
                <div className='flex items-center space-x-2'>
                    <label htmlFor="endDate" className="font-semibold text-gray-700">To:</label>
                    <input
                        id="endDate"
                        type="date"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    />
                </div>
            </div>

            {/* Summary Cards - Refined Layout and Visuals */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Revenue Card */}
                <div className="bg-white rounded-xl p-6 shadow-xl border-l-4 border-indigo-600 transition duration-300 hover:shadow-2xl">
                    <div className="flex items-center justify-between">
                        <h3 className="text-md font-medium text-gray-500 uppercase">Total Revenue</h3>
                        <FaMoneyBillWave className="text-2xl text-indigo-500" />
                    </div>
                    <p className="mt-1 text-3xl font-extrabold text-gray-900">
                        {formatCurrency(totalRevenue.data.totalRevenue)}
                    </p>
                </div>

                {/* Total Orders Card */}
                <div className="bg-white rounded-xl p-6 shadow-xl border-l-4 border-green-600 transition duration-300 hover:shadow-2xl">
                    <div className="flex items-center justify-between">
                        <h3 className="text-md font-medium text-gray-500 uppercase">Total Orders</h3>
                        <FaShoppingCart className="text-2xl text-green-500" />
                    </div>
                    <p className="mt-1 text-3xl font-extrabold text-gray-900">
                        {totalOrders.toLocaleString()}
                    </p>
                </div>

                {/* Top Product Card */}
                <div className="bg-white rounded-xl p-6 shadow-xl border-l-4 border-blue-600 transition duration-300 hover:shadow-2xl">
                    <div className="flex items-center justify-between">
                        <h3 className="text-md font-medium text-gray-500 uppercase">Top Product</h3>
                        <FaBoxOpen className="text-2xl text-blue-500" />
                    </div>
                    <p className="mt-1 text-xl font-extrabold text-gray-900 truncate">
                        {topProductName}
                    </p>
                </div>

                {/* Delivered Orders Card (Example of a calculated metric card) */}
                <div className="bg-white rounded-xl p-6 shadow-xl border-l-4 border-yellow-600 transition duration-300 hover:shadow-2xl">
                    <div className="flex items-center justify-between">
                        <h3 className="text-md font-medium text-gray-500 uppercase">Delivered Orders</h3>
                        <FaChartLine className="text-2xl text-yellow-500" />
                    </div>
                    <p className="mt-1 text-3xl font-extrabold text-gray-900">
                        {chartData.reduce((sum, d) => sum + (d.DELIVERED || 0), 0).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Charts and Tables Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Order Status Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-xl p-6">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Daily Order Status Trend</h2>
                    <div className="w-full h-96 bg-white rounded-xl shadow p-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 50 }}>
                                <XAxis
                                    dataKey="date"
                                    stroke="#6b7280"
                                    angle={-25}
                                    textAnchor="end"
                                    height={70}
                                    interval="preserveStartEnd"
                                    style={{ fontSize: '12px' }}
                                />
                                <YAxis allowDecimals={false} stroke="#6b7280" />
                                <Tooltip contentStyle={{ borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} />
                                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                                <Bar dataKey="PENDING" fill="#f59e0b" name="Pending" radius={[4, 4, 0, 0]} /> {/* Tailwind amber-500 */}
                                <Bar dataKey="DELIVERED" fill="#10b981" name="Delivered" radius={[4, 4, 0, 0]} /> {/* Tailwind emerald-500 */}
                                <Bar dataKey="CANCEL" fill="#ef4444" name="Canceled" radius={[4, 4, 0, 0]} /> {/* Tailwind red-500 */}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Products List */}
                <div className="bg-white rounded-xl shadow-xl p-6 h-full">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Top 5 Selling Products</h2>
                    <ul className="divide-y divide-gray-200">
                        {topProducts.data.map((prod, index) => (
                            <li key={prod.id} className="flex justify-between items-center py-3">
                                <span className="font-medium text-lg text-indigo-600 w-8">{index + 1}.</span>
                                <span className="flex-1 text-gray-800 font-medium truncate ml-2">{prod.name}</span>
                                <span className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{prod.totalQuantity} Sold</span>
                            </li>
                        ))}
                    </ul>
                    {topProducts.data.length === 0 && (
                        <p className="text-gray-500 italic">No product sales data available for this period.</p>
                    )}
                </div>
            </div>

            {/* --- */}

            {/* Daily Sales Table */}
            <div className="mt-8 bg-white rounded-xl shadow-xl p-6 overflow-hidden">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Daily Sales Breakdown</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider rounded-tl-xl">Date</th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Total Orders</th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Total Amount</th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider rounded-tr-xl">Avg. Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {dailySales.data.map(row => (
                                <tr key={row.date} className="hover:bg-indigo-50 transition duration-100">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dayjs(row.date).format('YYYY-MM-DD')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">{row.totalOrders}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600 text-right">{formatCurrency(row.totalAmount)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">{formatCurrency(row.averageAmount)}</td>
                                </tr>
                            ))}
                            {dailySales.data.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500 italic">No daily sales records found for this period.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}