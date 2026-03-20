// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    useGetAllAddressesQuery,
    useAddAddressMutation,
    useEditAddressMutation,
    useDeleteAddressMutation,
} from "../services/userApi";
import { useGetCartQuery } from "../services/cartApi";
import { usePlaceOrderMutation } from "../services/orderApi";
import AddressModal from "../components/AddressModal";

const CheckoutPage = () => {
    const navigate = useNavigate();

    // Addresses
    const {
        data: addressData,
        isLoading: loadingAddresses,
        isError: errorAddresses,
        refetch: refetchAddresses,
    } = useGetAllAddressesQuery();

    const [addAddress] = useAddAddressMutation();
    const [editAddress] = useEditAddressMutation();
    const [deleteAddress] = useDeleteAddressMutation();

    // Cart
    const { data: cartData, isLoading: loadingCart, isError: errorCart } = useGetCartQuery();
    const [placeOrder, { isLoading: placing }] = usePlaceOrderMutation();

    // Local state
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    const addresses = addressData?.data || [];
    const items = cartData?.data?.items || [];
    const total = cartData?.data?.totalPrice ?? 0;

    // Preselect default address
    useEffect(() => {
        if (!selectedAddress && addresses.length > 0) {
            const def = addresses.find((a) => a.isDefault) || addresses[0];
            setSelectedAddress(def);
        }
    }, [addresses, selectedAddress]);

    // Place Order
    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            toast.warn("Please select a delivery address!");
            return;
        }

        if (!items || items.length === 0) {
            toast.warn("Your cart is empty!");
            return;
        }

        try {
            await placeOrder(selectedAddress.id).unwrap();

            toast.success("Order placed successfully!");
            navigate("/order-success");
        } catch (err) {
            console.error("Place order error", err);
            toast.error(err?.data?.message || "Failed to place order!");
        }
    };

    // Add / Edit Address
    const handleSaveAddress = async (data) => {
        try {
            if (editingAddress) {
                // ✅ Correct payload for PATCH
                await editAddress({ id: editingAddress.id, ...data }).unwrap();
                toast.success("Address updated successfully!");

                // Update selectedAddress if editing the currently selected one
                if (selectedAddress?.id === editingAddress.id) {
                    setSelectedAddress({ ...selectedAddress, ...data });
                }
            } else {
                await addAddress(data).unwrap();
                toast.success("Address added successfully!");
            }

            setShowModal(false);
            setEditingAddress(null);
            refetchAddresses();
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || "Failed to save address");
        }
    };

    // Delete Address
    const handleDeleteAddress = async (addr) => {
        if (!window.confirm("Delete this address?")) return;
        try {
            await deleteAddress(addr.id).unwrap();
            toast.success("Address deleted successfully");

            // If deleted address was selected, clear selection
            if (selectedAddress?.id === addr.id) setSelectedAddress(null);

            refetchAddresses();
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete address");
        }
    };

    if (loadingAddresses || loadingCart) return <div className="p-6">Loading...</div>;
    if (errorAddresses) return <div className="p-6 text-red-500">Failed to load addresses.</div>;
    if (errorCart) return <div className="p-6 text-red-500">Failed to load cart.</div>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6 text-purple-700">Checkout</h2>

            {/* Address Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">Select Delivery Address</h3>
                    <button
                        onClick={() => { setEditingAddress(null); setShowModal(true); }}
                        className="text-sm text-purple-700 underline hover:text-purple-800"
                    >
                        + Add New Address
                    </button>
                </div>

                {addresses.length > 0 ? (
                    addresses.map((addr) => (
                        <div
                            key={addr.id}
                            className={`flex items-center justify-between mb-2 p-2 border rounded ${selectedAddress?.id === addr.id ? "border-purple-700 bg-purple-50" : "border-gray-200"
                                }`}
                        >
                            <label className="flex items-center gap-2 flex-1 cursor-pointer">
                                <input
                                    type="radio"
                                    name="address"
                                    value={addr.id}
                                    checked={selectedAddress?.id === addr.id}
                                    onChange={() => setSelectedAddress(addr)}
                                    className="h-4 w-4"
                                />
                                <span className="text-sm">
                                    {addr.houseNo}, {addr.street}, {addr.city}, {addr.state} - {addr.zipCode}, {addr.country}
                                </span>
                            </label>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => { setEditingAddress(addr); setShowModal(true); }}
                                    className="px-2 py-1 bg-yellow-400 rounded text-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteAddress(addr)}
                                    className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 flex items-center gap-3">
                        <span>No address found. Please add one.</span>
                        <button
                            onClick={() => { setEditingAddress(null); setShowModal(true); }}
                            className="text-sm text-purple-700 underline"
                        >
                            + Add Address
                        </button>
                    </div>
                )}
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Order Summary</h3>

                {items.length > 0 ? (
                    items.map((item) => (
                        <div
                            key={item.foodId ?? item.foodItemId ?? item.id}
                            className="flex justify-between text-gray-700 mb-1"
                        >
                            <span>{item.name || item.title || item.foodName} × {item.quantity}</span>
                            <span>₹{(item.price ?? item.unitPrice ?? 0).toFixed(2)}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Your cart is empty.</p>
                )}

                <div className="flex justify-between font-bold mt-3">
                    <span>Total:</span>
                    <span className="text-purple-700">₹{Number(total).toFixed(2)}</span>
                </div>
            </div>

            {/* Place Order Button */}
            <button
                onClick={handlePlaceOrder}
                disabled={placing || !selectedAddress || items.length === 0}
                className="mt-6 w-full bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition disabled:opacity-50"
            >
                {placing ? "Placing Order..." : "Confirm & Place Order"}
            </button>

            {/* Address Modal */}
            <AddressModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSave={handleSaveAddress}
                initialData={editingAddress}
            />
        </div>
    );
};

export default CheckoutPage;
