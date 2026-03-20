import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeletefoodMutation, useGetVendorFoodItemsQuery } from "../../services/foodApi";
import Swal from "sweetalert2";

export default function FoodItemTable() {
    const { data: foodItems = [], isLoading, isError } = useGetVendorFoodItemsQuery();
    const [deleteFood] = useDeletefoodMutation();
    const navigate = useNavigate();
    console.log(foodItems)
    const [selectedFood, setSelectedFood] = useState(null);
    const [showModal, setShowModal] = useState(false);
    console.log(foodItems)
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteFood(id).unwrap();
                    Swal.fire(
                        "Deleted!",
                        "Food deleted successfully.",
                        "success"
                    );
                } catch (err) {
                    console.error(err);
                    Swal.fire(
                        "Error!",
                        "Failed to delete food. It might be linked to existing orders.",
                        "error"
                    );
                }
            }
        });
    };


    const handleView = (food) => {
        setSelectedFood(food);
        setShowModal(true);
    };

    if (isLoading) return <p className="text-center">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Failed to load data</p>;

    return (
        <div className="overflow-x-auto">
            <h2 className="text-2xl sticky left-0 font-semibold mb-4">Food Items</h2>

            {/* TABLE */}
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2 sticky left-0 bg-gray-200">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Category</th>
                        <th className="border border-gray-300 px-4 py-2">Price</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {foodItems?.data?.map((item) => (
                        <tr key={item.id}>
                            <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                            <td className="border border-gray-300 px-4 py-2 sticky left-0 bg-gray-200">{item.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.categoryName}</td>
                            <td className="border border-gray-300 px-4 py-2">₹{item.price}</td>
                            <td className="border border-gray-300 px-4 py-2 flex gap-2">
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleView(item)}
                                >
                                    View
                                </button>
                                <button
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                    onClick={() => navigate(`/vendor/edit-food/${item.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* MODAL */}
            {showModal && selectedFood && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto p-6 relative">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                            onClick={() => setShowModal(false)}
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-center">{selectedFood.name}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p><strong>Category:</strong> {selectedFood.categoryName}</p>
                            <p><strong>Price:</strong> ₹{selectedFood.price}</p>
                            <p><strong>Discount:</strong> {selectedFood.discount}%</p>
                            <p><strong>Discounted Price:</strong> ₹{selectedFood.discountedPrice}</p>
                            <p><strong>Quantity:</strong> {selectedFood.quantity}</p>
                            <p><strong>Net Quantity:</strong> {selectedFood.netQuantity} g</p>
                            <p><strong>Availability:</strong> {selectedFood.isAvailable ? 'Available' : 'Not Available'}</p>
                            <p><strong>Product Type:</strong> {selectedFood.productType}</p>
                            <p><strong>Rating:</strong> {selectedFood.rating}</p>
                            <p><strong>Country of Origin:</strong> {selectedFood.countryOfOrigin}</p>
                            <p><strong>Manufacture:</strong> {selectedFood.manufacture}</p>
                            <p><strong>Packaging:</strong> {selectedFood.packaging}</p>
                            <p className="md:col-span-2"><strong>Description:</strong> {selectedFood.description}</p>
                            <p className="md:col-span-2"><strong>Ingredients:</strong> {selectedFood.ingredient}</p>
                            <p className="md:col-span-2"><strong>Product Features:</strong> {selectedFood.productFeature}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
