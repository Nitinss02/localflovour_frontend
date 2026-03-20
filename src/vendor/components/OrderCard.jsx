import React, { useState } from "react";
import Button from "../../components/Button";
import { useGetAddressByIdQuery, useGetUserProfileByIdQuery } from "../../services/userApi";

const OrderCard = ({ order, onStatusChange }) => {
    const [showDetails, setShowDetails] = useState(false);
    const statuses = ["PENDING", "CONFIRMED", "DELIVERED", "COMPLETED", "CANCEL"];
    const { data: user } = useGetUserProfileByIdQuery(order.userId);
    const { data: address, isLoading, isError } = useGetAddressByIdQuery(order.addressId);

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        onStatusChange(order.orderId, newStatus);
    };
    const toggleDetails = () => setShowDetails((prev) => !prev);

    return (
        <div
            className="border flex flex-col rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={toggleDetails}
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                    Order #{order.orderId}
                </h3>
                <span
                    className={`px-3 py-1 rounded-full text-sm ${order.status === "DELIVERED"
                        ? "bg-green-200 text-green-800"
                        : order.status === "COMPLETED"
                            ? "bg-blue-200 text-blue-800"
                            : order.status === "CANCEL"
                                ? "bg-red-200 text-red-800"
                                : order.status === "CONFIRMED"
                                    ? "bg-purple-200 text-purple-800"
                                    : "bg-yellow-200 text-yellow-800"
                        }`}
                >
                    {order.status}
                </span>
            </div>

            <p className="text-gray-600 text-sm mb-1">
                Date: {new Date(order.orderDate).toLocaleString()}
            </p>
            <p className="text-gray-700 font-medium mb-2">
                Total: ₹{order.totalAmount.toFixed(2)}
            </p>

            {/* Expandable Details */}
            {showDetails && (
                <div className="mt-3 border-t pt-3 text-sm text-gray-700">
                    {/* User Info */}

                    {user && (
                        <div className="mb-2">
                            <h4 className="font-semibold text-gray-800">Customer Info:</h4>
                            <p>{user.data.name}</p>
                            <p>{user.data.email}</p>
                            <p>{user.data.mobileNo}</p>
                        </div>
                    )}

                    {/* Address */}
                    {address && (
                        <div className="mb-2">
                            <h4 className="font-semibold text-gray-800">Delivery Address:</h4>
                            <p>
                                {address?.data?.houseNo}, {address?.data?.street},<br />
                                {address?.data?.city}, {address?.data?.state} -{" "}
                                {address?.data?.zipCode}, {address?.data?.country}
                            </p>
                        </div>
                    )}

                    {/* Items */}
                    <div className="mb-2">
                        <h4 className="font-semibold text-gray-800">Items:</h4>
                        <ul className="list-disc pl-5">
                            {order.items?.map((item) => (
                                <li key={item.id}>
                                    {item.productName} × {item.quantity} — ₹
                                    {(item.price * item.quantity).toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Dropdown for status update (stays visible always) */}
            <div
                className="mt-4 flex items-center gap-2"
                onClick={(e) => e.stopPropagation()} // prevent toggle on select click
            >
                <label
                    htmlFor={`status-${order.orderId}`}
                    className="text-sm font-medium text-gray-700"
                >
                    Update Status:
                </label>
                <select
                    id={`status-${order.orderId}`}
                    value={order.status}
                    onChange={handleStatusChange}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>

            {/* Toggle button */}
            <div className="mt-3 text-right">
                <button
                    onClick={toggleDetails}
                    className="text-xs text-blue-600 underline"
                >
                    {showDetails ? "Hide Details ▲" : "View Details ▼"}
                </button>
            </div>
        </div>
    );
};

export default OrderCard;
