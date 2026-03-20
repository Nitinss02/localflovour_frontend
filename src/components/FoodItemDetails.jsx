import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BiCopy, BiShare } from "react-icons/bi";
import AddToCart from "./AddToCart";
import RatingStars from "./RatingStar";
import { useGetfoodbyidQuery } from "../services/foodApi";
import { toast } from "react-toastify";
import { FaShareAlt } from "react-icons/fa";

const FoodItemDetails = () => {
    const { id } = useParams();

    // RTK Query hook 
    const { data: fooditem, isLoading, isError } = useGetfoodbyidQuery(id);

    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_LENGTH = 150;

    const shouldTruncate = fooditem?.data?.description?.length > MAX_LENGTH;
    const displayedText = isExpanded
        ? fooditem?.data?.description
        : fooditem?.data?.description?.substring(0, MAX_LENGTH) + (shouldTruncate ? "..." : "");

    if (isLoading)
        return (
            <div className="flex justify-center items-center min-h-screen text-xl text-[#6A3EA7]">
                <div className="loader"></div>
            </div>
        );

    if (isError || !fooditem)
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500 text-xl font-semibold">
                Failed to load fooditem details.
            </div>
        );

    // SHARE HANDLER
    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/fooditemdetails/${id}`;
        const title = fooditem?.data?.name || "Delicious Food Item";
        const text = "Check out this amazing food item!";

        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url: shareUrl,
                });
                toast.success("Shared successfully!");
            } catch (err) {
                console.error("Share failed:", err);
                toast.warn("Sharing cancelled or failed.");
            }
        } else {
            // fallback: copy to clipboard
            navigator.clipboard.writeText(shareUrl);
            toast.info("Link copied to clipboard!");
        }
    };

    //COPY HANDLER
    const handleCopy = () => {
        const copyUrl = `${window.location.origin}/fooditemdetails/${id}`;
        navigator.clipboard.writeText(copyUrl);
        toast.success("Link copied!");
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-lg font-sans">
            <div className="flex justify-between m-4">
                <p className="text-xl font-bold">Food Item Description</p>
                <p className="text-blue-400 font-medium">
                    Enter pincode for delivery estimate
                </p>
                <div className="flex gap-4">
                    <FaShareAlt
                        onClick={handleShare}
                        className="w-6 h-6 text-[#6A3EA7] cursor-pointer hover:text-purple-800"
                        title="Share this item"
                    />
                    <BiCopy
                        onClick={handleCopy}
                        className="w-6 h-6 text-[#6A3EA7] cursor-pointer hover:text-purple-800"
                        title="Copy link"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ================== Left: Images ================== */}
                <div className="lg:col-span-1">
                    <div className="w-full h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        {fooditem.data.imageUrl ? (
                            <img
                                src={fooditem.data.imageUrl}
                                alt={fooditem.data.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                No Image Available
                            </div>
                        )}
                    </div>
                </div>

                {/* ================== Right: fooditem Details ================== */}
                <div className="lg:col-span-2 overflow-y-scroll max-h-[400px] pr-4 scrollbar-hide">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{fooditem.data.name}</h1>

                    <div className="mb-4">
                        <span className="text-4xl font-extrabold text-black mr-3">
                            ₹{fooditem.data.discountedPrice}
                        </span>
                        <span className="text-lg font-semibold text-[#6A3EA7]">
                            {fooditem.data.discount} % Off
                        </span>
                        <div>
                            <span className="text-lg text-gray-500 line-through mr-3">
                                M.R.P: ₹{fooditem.data.price}
                            </span>
                            <p className="text-sm text-gray-500">(Incl. of all taxes)</p>
                        </div>
                        <div className="mb-4">
                            <RatingStars rating={fooditem.data.rating} starSize="text-2xl" />
                        </div>
                    </div>

                    <hr className="my-4 border-t border-gray-200" />

                    <div className="mb-6">
                        <p className="text-lg font-semibold text-[#6A3EA7]">
                            Delivery: {fooditem.data.delivery || "Available across India"}
                        </p>
                        <p className="text-md text-gray-600">
                            <span className="font-semibold text-green-700">
                                {fooditem.data.isAvailable ? "In Stock" : "Out of Stock"}
                            </span>
                        </p>
                    </div>

                    <hr className="my-4 border-t border-gray-200" />

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-[#6A3EA7] mb-2">
                            Description
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-base">
                            {displayedText}
                            {shouldTruncate && (
                                <span
                                    className="text-[#6A3EA7] cursor-pointer hover:underline ml-1 font-medium"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                >
                                    {isExpanded ? "Read Less" : "Read More"}
                                </span>
                            )}
                        </p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-[#6A3EA7] mb-2">
                            Features & Details
                        </h2>
                        <ul className="text-gray-600 leading-relaxed text-base">
                            <li>Category: {fooditem.data.categoryName || "General"}</li>
                            <li>Ingredient: {fooditem.data.ingredient || "Various"}</li>
                            <li>Quantity: {fooditem.data.netQuantity + " gm" || "1 unit"}</li>
                            <li>Ratings: {fooditem.data.rating || "Not rated yet"}</li>
                            <li>Packaging: {fooditem.data.packaging || "No packaging yet"}</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-8 pt-4 border-t border-gray-200">
                <AddToCart foodId={fooditem.data.id} />
                <button className="flex-1 px-6 py-3 bg-[#6A3EA7] text-white font-bold rounded-lg shadow-md hover:bg-[#552d8c] transition">
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default FoodItemDetails;
