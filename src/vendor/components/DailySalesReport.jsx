import React from 'react';
import { useGetTodayReportQuery } from '../../services/saleApi';
import dayjs from 'dayjs';

export default function DailySalesReport() {
    // Fetch today's sales report using RTK Query
    const { data: todayReport, isLoading, isError } = useGetTodayReportQuery();

    // Loading & Error states
    if (isLoading)
        return (
            <div className="text-center text-gray-600 font-medium mt-8">
                <div className="loader"></div>
            </div>
        );
    if (isError)
        return (
            <div className="p-4 text-center text-lg text-red-600 font-medium">
                Error fetching today's report
            </div>
        );

    // Extract report data
    const reportData = todayReport?.data ?? [];

    // Calculate totals
    const totalRevenue = reportData.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
    const totalOrders = reportData.reduce((sum, item) => sum + (item.totalOrders || 0), 0);
    const averageAmount =
        totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

    return (
        <div className="bg-white p-6 rounded-xl shadow-2xl mt-8 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 pb-4">
                Today's Sales Report ({dayjs().format('YYYY-MM-DD')})
            </h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-5 bg-indigo-50 border-l-4 border-indigo-600 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
                    <p className="text-3xl font-extrabold text-indigo-600 mt-1">
                        {totalOrders}
                    </p>
                </div>

                <div className="p-5 bg-green-50 border-l-4 border-green-600 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
                    <p className="text-3xl font-extrabold text-green-600 mt-1">
                        ₹{totalRevenue.toLocaleString('en-IN')}
                    </p>
                </div>

                <div className="p-5 bg-yellow-50 border-l-4 border-yellow-600 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700">Average Amount</h3>
                    <p className="text-3xl font-extrabold text-yellow-600 mt-1">
                        ₹{averageAmount.toLocaleString('en-IN')}
                    </p>
                </div>
            </div>
        </div >
    );
}
