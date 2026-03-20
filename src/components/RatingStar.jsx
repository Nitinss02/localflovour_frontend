import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Using Font Awesome icons from react-icons

/**
 * A reusable component to display a star rating.
 * @param {number} rating - The star rating value (e.g., 4.0).
 * @param {number} [totalStars=5] - The total number of stars to display.
 * @param {string} [starSize='text-xl'] - Tailwind class for star size.
 */
const RatingStars = ({ rating, totalStars = 5, starSize = 'text-xl' }) => {
    // Ensure the rating is a number and within the valid range
    const normalizedRating = Math.max(0, Math.min(totalStars, rating || 0));

    // Calculate the number of filled, half, and empty stars
    const filledStars = Math.floor(normalizedRating);
    const hasHalfStar = normalizedRating % 1 !== 0; // Check for a non-integer part

    // In a simple 5-star system like the image, we only need filled and empty
    const emptyStars = totalStars - filledStars - (hasHalfStar ? 1 : 0);

    // We'll stick to full stars and empty stars for simplicity, like the image
    // You can use FaStarHalfAlt if you want to support half-stars (e.g., 4.5)

    // Array to generate the stars
    const stars = [];

    // 1. Add Filled Stars (e.g., 4 stars for a 4.0 rating)
    for (let i = 0; i < filledStars; i++) {
        stars.push(
            <FaStar key={`filled-${i}`} className={`text-orange-500 ${starSize}`} />
        );
    }

    // 2. Add the remaining stars as Empty/Outline stars
    // Note: This logic assumes we only show full stars and one outline star for 4.0/5
    for (let i = 0; i < (totalStars - filledStars); i++) {
        stars.push(
            <FaRegStar key={`empty-${i}`} className={`text-orange-500 ${starSize}`} />
        );
    }

    return (
        <div className="flex items-center space-x-1">
            <span className="text-xl font-bold text-gray-800 mr-2">{normalizedRating.toFixed(1)}</span>
            <div className="flex">
                {stars}
            </div>
        </div>
    );
};

export default RatingStars;