import React from "react";
import Greenchill from "../assets/Greenchill.png";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAddToWishlistMutation, useGetWishlistQuery, useRemoveFromWishlistMutation } from "../services/wishlistApi";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useAddToCartMutation } from "../services/cartApi";


export default function FoodCards({ foodItems = [] }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    // Fetch wishlist data only if authenticated
    const { data: wishlistData, refetch } = useGetWishlistQuery(undefined, {
        skip: !isAuthenticated
    });
    // Handle nested foodItem if returned from backend
    const wishlist = Array.isArray(wishlistData?.data?.items)
        ? wishlistData.data.items
        : [];
    console.log("Wishlist Data:", wishlist);

    // Mutations
    const [addToWishlist] = useAddToWishlistMutation();
    const [removeFromWishlist] = useRemoveFromWishlistMutation();
    const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();

    // Helper to check if a food item is in wishlist
    const isInWishlist = (foodId) =>
        Array.isArray(wishlist) &&
        wishlist.some((item) => item.foodItem?.id === foodId);

    // Toggle wishlist
    const toggleWishlist = async (foodId, e) => {
        e.stopPropagation();
        
        if (!isAuthenticated) {
            toast.info("Please log in to add items to your wishlist");
            return;
        }
        
        try {
            if (isInWishlist(foodId)) {

                await removeFromWishlist(foodId).unwrap();
            } else {

                await addToWishlist({ foodItemId: foodId }).unwrap();
            }
            await refetch(); // Refresh wishlist state
        } catch (err) {
            if (err?.data?.code === "WISHLIST_ERROR") {
                console.log("Already in wishlist — ignoring");
            } else {
                console.error("Wishlist error:", err);
            }
        }
    };

    // Handle add to cart
    const handleAddToCart = async (foodId, e) => {
        e.stopPropagation();
        
        if (!isAuthenticated) {
            toast.info("Please log in to add items to your cart");
            return;
        }
        
        try {
            await addToCart({ foodId, quantity: 1 }).unwrap();
            toast.success("Item added to cart!");
        } catch (error) {
            console.error(error);
            toast.error(error?.data?.message || "Failed to add item to cart.");
        }
    };

    const isEmpty = !foodItems || foodItems.length === 0;

    return (
        <div className="container mx-auto px-4 py-10">
            {isEmpty ? (
                <div className="flex flex-col items-center justify-center text-center py-20">
                    <h2 className="text-3xl font-bold text-black mb-4">
                        No Food Items Available
                    </h2>
                    <p className="text-lg text-gray-800">
                        Please check back later or try refreshing the page.
                    </p>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-10">
                    {foodItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/fooditemdetails/${item.id}`)}
                            className="relative flex flex-col w-[350px] sm:w-[400px] bg-transparent transform hover:scale-[1.03] transition-all duration-300 ease-in-out cursor-default"
                        >
                            {/* Wishlist Heart Icon - Show for all users, but handle auth in click */}
                            <div
                                className="absolute top-4 right-4 text-2xl cursor-pointer z-10"
                                onClick={(e) => toggleWishlist(item.id, e)}
                            >
                                {isAuthenticated && isInWishlist(item.id) ? (
                                    <FaHeart className="text-red-500" />
                                ) : (
                                    <FaRegHeart className="text-white" />
                                )}
                            </div>

                            {/* Food Image */}
                            <div className="shadow-lg overflow-hidden rounded-lg">
                                <img
                                    src={item.imageUrl || Greenchill}
                                    alt={item.name || "Food Item"}
                                    className="w-full h-[250px] object-cover object-center"
                                />
                            </div>

                            {/* Food Details */}
                            <div className="-mt-8 mb-[-40px] mx-auto w-[280px] sm:w-[300px] bg-[#8800ae] text-white p-6 shadow-lg rounded-lg">
                                <h2 className="text-2xl font-bold mt-2 mb-3">
                                    {item.name || "Unknown Dish"}
                                </h2>
                                <p className="text-sm italic text-gray-300">
                                    ({item.description || "No description available."})
                                </p>

                                <div className="mt-3 space-y-1">
                                    <div className="gap-8 flex">
                                        <p className="text-lg text-gray-200">
                                            ₹{item.price ?? "N/A"}
                                        </p>
                                        <p
                                            className={`text-lg ${item.productType === "veg"
                                                ? "text-green-300"
                                                : item.productType === "non-veg"
                                                    ? "text-red-500"
                                                    : "text-gray-200"
                                                }`}
                                        >
                                            {item.productType ?? "N/A"}
                                        </p>
                                    </div>
                                    <div className="gap-8 flex">
                                        <p className="text-lg text-gray-200">
                                            {item.discount ?? 0}%Off
                                        </p>
                                        <p className="text-lg text-gray-200">
                                            Qty: {item.netQuantity + " gm" }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Add / Out of Stock Button */}
                            <button
                                disabled={!item.isAvailable || isAddingToCart}
                                onClick={(e) => item.isAvailable && handleAddToCart(item.id, e)}
                                className={`ml-auto w-auto px-12 py-4 text-2xl font-bold rounded-lg shadow-lg mt-4 transition duration-300 ease-in-out ${item.isAvailable
                                    ? "bg-[#f0f5f5] text-black hover:bg-gray-300 cursor-pointer"
                                    : "bg-gray-600 cursor-not-allowed text-white"
                                    }`}
                            >
                                {!item.isAvailable 
                                    ? "Out of Stock" 
                                    : isAddingToCart 
                                        ? "Adding..." 
                                        : "Add"}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}