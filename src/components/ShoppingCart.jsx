import React from "react";
import { GiCancel } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import ChivdaImg from "../assets/Chivda.png";
import { toast } from "react-toastify";
import {
    useAddToCartMutation,
    useDeleteCartItemMutation,
    useGetCartQuery,
} from "../services/cartApi";
import { usePlaceOrderMutation } from "../services/orderApi";
import { useNavigate } from "react-router-dom";

function ShoppingCart({ onClose }) {
    const { data: cartData, isLoading, isFetching, refetch } = useGetCartQuery();

    const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
    const [deleteCartItem, { isLoading: isDeleting }] = useDeleteCartItemMutation();
    const [placeOrder, { isLoading: isPlacing }] = usePlaceOrderMutation();
    const navigate = useNavigate();

    if (isLoading || isFetching) return <p className="p-4">Loading...</p>;

    const items = cartData?.data?.items || [];
    const totalPrice = cartData?.data?.totalPrice || 0;

    // Add quantity
    const handleAdd = async (foodId) => {
        try {
            await addToCart({ foodId, quantity: 1 }).unwrap();
            refetch(); // refresh cart data
        } catch (error) {
            console.error("Failed to add item:", error);
            toast.error("Failed to add item");
        }
    };

    // Remove quantity or delete item
    const handleRemove = async (foodItemId) => {
        try {
            await deleteCartItem({ foodItemId }).unwrap();
            refetch(); // refresh cart data
        } catch (error) {
            console.error("Failed to remove item:", error);
            toast.error("Failed to remove item");
        }
    };

    // Place Order
    const handleCheckout = () => {
        onClose(); // close cart sidebar
        navigate("/checkout");
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
            <div className="w-full sm:w-[400px] bg-white h-full shadow-2xl flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold text-purple-700">Your Cart</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                        <GiCancel size={24} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.length === 0 ? (
                        <p className="text-center text-gray-500 mt-20">Your cart is empty</p>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.foodItemId}
                                className="flex items-center gap-4 border rounded-lg p-3 shadow-sm hover:shadow-md transition"
                            >
                                <img
                                    src={item.imageUrl || ChivdaImg}
                                    alt={item.name}
                                    className="w-16 h-16 rounded object-cover"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        ₹{item.unitPrice?.toFixed(2)} × {item.quantity}
                                    </p>
                                    <p className="font-bold text-purple-700">₹{item.price?.toFixed(2)}</p>

                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => handleRemove(item.foodItemId)}
                                            disabled={isDeleting || isPlacing}
                                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                        >
                                            -
                                        </button>
                                        <span className="px-3 font-semibold">{item.quantity}</span>
                                        <button
                                            onClick={() => handleAdd(item.foodItemId)}
                                            disabled={isAdding || isPlacing}
                                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t bg-gray-50">
                    <div className="flex justify-between text-lg font-semibold mb-4">
                        <span>Total:</span>
                        <span className="text-purple-700">₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        disabled={isPlacing || items.length === 0}
                        className="w-full py-3 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-800 transition"
                    >
                        {isPlacing ? "Placing Order..." : "Proceed to Checkout"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;
