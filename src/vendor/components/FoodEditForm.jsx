import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useGetVendorFoodItemsQuery, usePutfoodMutation } from "../../services/foodApi";
import { useGetAllCategoriesQuery } from "../../services/categoryApi";

const FoodEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: foodData } = useGetVendorFoodItemsQuery();
    const [updateFood] = usePutfoodMutation();
    const { data: categories } = useGetAllCategoriesQuery();
    const [preview, setPreview] = useState(null);


    // Find the selected food item
    const existingFood = foodData?.data?.find(
        (f) => f.id === Number(id)
    );

    // Default form state
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

    // Populate form when data loads
    useEffect(() => {
        if (existingFood) {
            setFormData({
                name: existingFood.name || "",
                description: existingFood.description || "",
                price: existingFood.price || "",
                categoryId: existingFood.categoryId || "",
                discount: existingFood.discount || "",
                rating: existingFood.rating || "",
                quantity: existingFood.quantity || "",
                delivery: existingFood.delivery || "",
                manufacture: existingFood.manufacture || "",
                productType: existingFood.productType || "",
                productFeature: existingFood.productFeature || "",
                ingredient: existingFood.ingredient || "",
                packaging: existingFood.packaging || "",
                netQuantity: existingFood.netQuantity || "",
                countryOfOrigin: existingFood.countryOfOrigin || "",
                customerCare: existingFood.customerCare || "",
                existingImageUrl: existingFood.imageUrl,
            });
            setPreview(foodData.imageUrl);
        }
    }, [existingFood]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const requiredFields = [
            "name",
            "description",
            "price",
            "categoryId",
            "quantity",
            "delivery",
            "manufacture",
            "productType",
            "ingredient",
            "netQuantity",
            "countryOfOrigin",
        ];

        const errors = [];
        requiredFields.forEach((field) => {
            if (!formData[field] || !formData[field].toString().trim()) {
                errors.push(`${field} is required`);
            }
        });

        if (errors.length > 0) {
            toast.error(errors.join(", "), { autoClose: 5000 });
            return;
        }

        try {
            const payload = new FormData();
            if (formData.image) payload.append("imageFile", formData.image);

            const dto = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                categoryId: parseInt(formData.categoryId),
                discount: formData.discount ? parseFloat(formData.discount) : 0,
                rating: formData.rating ? parseInt(formData.rating) : 0,
                quantity: parseInt(formData.quantity),
                delivery: formData.delivery,
                manufacture: formData.manufacture,
                productType: formData.productType,
                productFeature: formData.productFeature,
                ingredient: formData.ingredient,
                packaging: formData.packaging,
                netQuantity: parseInt(formData.netQuantity),
                countryOfOrigin: formData.countryOfOrigin,
                customerCare: formData.customerCare ? parseInt(formData.customerCare) : null,
            };

            payload.append(
                "patchDto",
                new Blob([JSON.stringify(dto)], { type: "application/json" })
            );

            await updateFood({ id: Number(id), patchData: payload }).unwrap();
            toast.success("Food updated successfully!");
            navigate("/vendor/foodform");
        } catch (error) {
            console.error("Failed to update food:", error);
            toast.error("Failed to update food item.");
        }
    };

    return (
        <>
            <div className="bg-purple-500 border rounded-t-2xl p-4 mx-auto max-w-3xl">
                <h2 className="text-2xl font-bold text-center text-white"> Edit Food Item</h2>
            </div>
            <div className="p-6 md:p-8 border  bg-white mx-auto max-w-3xl">

                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="space-y-4"
                >
                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-semibold">Name *</label>
                        <input
                            type="text"
                            name="name"
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
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    {/* Price & Discount */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-semibold">Price *</label>
                            <input
                                type="number"
                                name="price"
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
                                value={formData.discount}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                    </div>

                    {/* Quantity, Rating, and Category */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block mb-1 font-semibold">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
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

                    {/* Additional Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-semibold">Delivery</label>
                            <input
                                type="text"
                                name="delivery"
                                value={formData.delivery}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-semibold">Manufacture</label>
                            <input
                                type="text"
                                name="manufacture"
                                value={formData.manufacture}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                    </div>

                    {/* Product Type & Feature */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-semibold">Product Type</label>
                            <input
                                type="text"
                                name="productType"
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
                        <label className="block mb-1 font-semibold">Upload New Image (optional)</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        {/* Image Preview */}
                        {preview && (
                            <div className="mt-3">
                                <p className="font-medium mb-2">Image Preview:</p>
                                <img
                                    src={preview || formData.existingImageUrl}
                                    alt="Preview"
                                    className="w-40 h-40 object-cover rounded border"
                                />
                            </div>
                        )}

                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition"
                    >
                        Update Food
                    </button>
                </form>
            </div>
        </>
    );
};

export default FoodEditForm;
