import React, { useState } from "react";
import OrderCard from "../components/OrderCard";
import { toast } from "react-toastify";
import {
  useGetVendorOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../services/orderApi";

const VendorOrdersPage = () => {
  const { data: orders, isLoading, refetch } = useGetVendorOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const [filterStatus, setFilterStatus] = useState("ALL"); // ALL, PENDING, DELIVERED, etc.
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus({ orderId, status }).unwrap();
      toast.success(`Order #${orderId} updated to ${status}`);
      refetch();
    } catch (err) {
      toast.error("Failed to update order status");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading orders...</p>;

  // Filter logic
  let filteredOrders = orders
    ? orders.filter((order) => {
      const statusMatch =
        filterStatus === "ALL" ? true : order.status === filterStatus;

      let dateMatch = true;
      const orderDate = new Date(order.orderDate);
      const orderDateOnly = new Date(
        orderDate.getFullYear(),
        orderDate.getMonth(),
        orderDate.getDate()
      );
      const parseDate = (dateStr) => {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day); 
      };
      if (startDate) {
        const start = parseDate(startDate);
        dateMatch = dateMatch && orderDateOnly >= start;
      }
      if (endDate) {
        const end = parseDate(endDate);
        dateMatch = dateMatch && orderDateOnly <= end;
      }

      return statusMatch && dateMatch;
    })
    : [];

  // All possible status filters
  const statusFilters = [
    { label: "Pending", value: "PENDING", color: "bg-yellow-400" },
    { label: "Confirmed", value: "CONFIRMED", color: "bg-purple-500" },
    { label: "Delivered", value: "DELIVERED", color: "bg-green-600" },
    { label: "Completed", value: "COMPLETED", color: "bg-blue-600" },
    { label: "Cancelled", value: "CANCEL", color: "bg-red-500" },
    { label: "All", value: "ALL", color: "bg-gray-400" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">My Orders</h1>

      {/* Status Filter Buttons */}
      <div className="flex gap-3 mb-4 flex-wrap items-center">
        {statusFilters.map((s) => (
          <button
            key={s.value}
            onClick={() => setFilterStatus(s.value)}
            className={`px-4 py-2 rounded text-white transition-all duration-200 ${filterStatus === s.value
              ? `${s.color} opacity-100`
              : "bg-gray-700 text-gray-700 hover:bg-gray-800"
              }`}
          >
            {s.label}
          </button>
        ))}

        {/* Date Range Filters */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded p-2 text-sm"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded p-2 text-sm"
        />

        <button
          onClick={() => {
            setStartDate("");
            setEndDate("");
          }}
          className="px-3 py-2 rounded bg-red-500 text-white text-sm"
        >
          Clear Dates
        </button>
      </div>

      {/* Orders Grid */}
      {filteredOrders && filteredOrders.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.orderId}
              order={order}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No orders found for selected filters.
        </p>
      )}
    </div>
  );
};

export default VendorOrdersPage;
