// src/pages/OrderSuccessPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col justify-center items-center text-center p-6">
            <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-6">
                Thank you for your order. We'll notify you once it's out for delivery.
            </p>
            <div className="flex gap-3">
                <button
                    onClick={() => navigate("/categories")}
                    className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition"
                >
                    View My Orders
                </button>

                <button
                    onClick={() => navigate("/")}
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
