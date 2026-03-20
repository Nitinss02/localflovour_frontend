import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePostfoodMutation } from "../../services/foodApi";
import { useGetAllCategoriesQuery } from "../../services/categoryApi";

const FoodForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        categoryId: "",
        discount: "",
        rating: "",
        quantity: "",
        delivery: "",
        manufacture: "",
        productType: "",
        productFeature: "",
        ingredient: "",
        packaging: "",
        netQuantity: "",
        countryOfOrigin: "",
        customerCare: "",
        image: null,
    });

    const [preview, setPreview] = useState(null);
    const [postfood] = usePostfoodMutation();
    const { data: categories } = useGetAllCategoriesQuery();

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };


    // Validate form and show toast errors
    const validateForm = () => {
        const errors = [];

        if (!formData.name.trim()) errors.push("Name is required");
        if (!formData.description.trim()) errors.push("Description is required");
        if (!formData.price) errors.push("Price is required");
        if (!formData.categoryId) errors.push("Category is required");
        if (!formData.quantity) errors.push("Quantity is required");
        if (!formData.delivery.trim()) errors.push("Delivery info is required");
        if (!formData.manufacture.trim()) errors.push("Manufacturer is required");
        if (!formData.productType.trim()) errors.push("Product type is required");
        if (!formData.ingredient.trim()) errors.push("Ingredients are required");
        if (!formData.netQuantity) errors.push("Net quantity is required");
        if (!formData.countryOfOrigin.trim()) errors.push("Country of origin is required");
        if (!formData.image) errors.push("Image is required");

        if (errors.length > 0) {
            errors.forEach((err) => toast.error(err));
            console.log(errors)
            return false;
        }

        return true;
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const payload = new FormData();
        payload.append("imageFile", formData.image);
        payload.append(
            "createDto",
            new Blob(
                [
                    JSON.stringify({
                        name: formData.name,
                        description: formData.description,
                        price: parseFloat(formData.price) || 0,
                        categoryId: parseInt(formData.categoryId) || 0,
                        discount: parseFloat(formData.discount) || 0,
                        rating: parseInt(formData.rating) || 0,
                        quantity: parseInt(formData.quantity) || 0,
                        delivery: formData.delivery,
                        manufacture: formData.manufacture,
                        productType: formData.productType,
                        productFeature: formData.productFeature,
                        ingredient: formData.ingredient,
                        packaging: formData.packaging,
                        netQuantity: parseInt(formData.netQuantity) || 0,
                        countryOfOrigin: formData.countryOfOrigin,
                        customerCare: formData.customerCare ? parseInt(formData.customerCare) : null,
                    }),
                ],
                { type: "application/json" }
            )
        );

        try {
            await postfood(payload).unwrap();
            toast.success("Food created successfully!");

            // Reset form
            setFormData({
                name: "",
                description: "",
                price: "",
                categoryId: "",
                discount: "",
                rating: "",
                quantity: "",
                delivery: "",
                manufacture: "",
                productType: "",
                productFeature: "",
                ingredient: "",
                packaging: "",
                netQuantity: "",
                countryOfOrigin: "",
                customerCare: "",
                image: null,
            });
        } catch (err) {
            console.error("Failed to create food:", err);
            toast.error("Failed to create food item");
        }
    };

    return (
        <>
            <div className="bg-purple-500 border rounded-t-2xl p-4 mx-auto max-w-3xl">
                <h2 className="text-2xl font-bold text-center text-white"> Create Food Item</h2>
            </div>
            <div className="p-6 md:p-8 border shadow bg-white mx-auto max-w-3xl">
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-semibold">Name *</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter food name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 font-semibold">Description *</label>
                        <textarea
                            name="description"
                            placeholder="Short description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    {/* Price & Discount */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-semibold">Price (₹) *</label>
                            <input
                                type="number"
                                name="price"
                                placeholder="e.g. 199.99"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Discount (%)</label>
                            <input
                                type="number"
                                name="discount"
                                placeholder="e.g. 10"
                                value={formData.discount}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                    </div>

                    {/* Quantity, Rating, Category */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block mb-1 font-semibold">Quantity *</label>
                            <input
                                type="number"
                                name="quantity"
                                placeholder="e.g. 50"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Rating</label>
                            <input
                                type="number"
                                name="rating"
                                placeholder="e.g. 4"
                                value={formData.rating}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Category *</label>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            >
                                <option value="">Select Category</option>
                                {categories?.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Delivery & Manufacture */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-semibold">Delivery Info *</label>
                            <input
                                type="text"
                                name="delivery"
                                placeholder="e.g. Delivery within 30 mins"
                                value={formData.delivery}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Manufacturer *</label>
                            <input
                                type="text"
                                name="manufacture"
                                placeholder="e.g. Domino's Kitchen"
                                value={formData.manufacture}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                    </div>

                    {/* Product Type & Feature */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-semibold">Product Type *</label>
                            <input
                                type="text"
                                name="productType"
                                placeholder="e.g. Veg / Non-Veg"
                                value={formData.productType}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Product Feature</label>
                            <input
                                type="text"
                                name="productFeature"
                                placeholder="e.g. Extra cheesy crust"
                                value={formData.productFeature}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                    </div>

                    {/* Ingredients & Packaging */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-semibold">Ingredients *</label>
                            <input
                                type="text"
                                name="ingredient"
                                placeholder="e.g. Wheat, Cheese, Tomato Sauce"
                                value={formData.ingredient}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Packaging</label>
                            <input
                                type="text"
                                name="packaging"
                                placeholder="e.g. Eco-friendly box"
                                value={formData.packaging}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                    </div>

                    {/* Net Quantity & Country of Origin */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-semibold">Net Quantity (g/ml) *</label>
                            <input
                                type="number"
                                name="netQuantity"
                                placeholder="e.g. 500"
                                value={formData.netQuantity}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Country of Origin *</label>
                            <input
                                type="text"
                                name="countryOfOrigin"
                                placeholder="e.g. India"
                                value={formData.countryOfOrigin}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <label className="block mb-1 font-semibold">Customer Care (Phone)</label>
                        <input
                            type="text"
                            pattern="[0-9\-+() ]*"
                            name="customerCare"
                            placeholder="e.g. 1800-123-456"
                            value={formData.customerCare}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block mb-1 font-semibold">Upload Image *</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {/* Image Preview */}
                        {preview && (
                            <div className="mt-3">
                                <p className="font-medium mb-2">Image Preview:</p>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-40 h-40 object-cover rounded border"
                                />
                            </div>
                        )}

                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                    >
                        Create Food
                    </button>
                </form>
            </div>
        </>
    );
};

export default FoodForm;
