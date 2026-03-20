// Import all the existing images
import Maharashtra from "../assets/Maharashtra.png";
import Gujarat from "../assets/Gujarat.png";
import Surat from "../assets/Surat.png";
import Punjab from "../assets/Punjab.png";
import Rajasthan from "../assets/Rajasthan.png";

import PapadMore from "../assets/PapadMore.png";
import SnackImg from "../assets/Snacks&NamKeen.png";
import PremixImg from "../assets/InstantPremix.png";
import PicklesImg from "../assets/Pickles&More.png";
import MilletImg from "../assets/Milletsuperfood.png";
import SweetsImg from "../assets/Sweets&More.png";
import GrainsImg from "../assets/Seasonaltrend.png";
import CleaningImg from "../assets/Chutney&Masala.png";

import BhakarwadiImg from "../assets/Bhakarwadi.png";
import OrangeBarfiImg from "../assets/OrangeBarfi.png";
import ChivdaImg from "../assets/Chivda.png";
import DharwadPedaImg from "../assets/DharwadPeda.png";
import KolhapuriMasalaImg from "../assets/KolhapuriMasala.png";
import OrangesImg from "../assets/Oranges.png";
import AlphonsoMangoImg from "../assets/AlphonsoMango.png";
import saffronImg from "../assets/FreshlyArrived.png";
import sweetsImg from "../assets/DiwaliSweets.png";

// Default fallback image
import Greenchill from "../assets/Greenchill.png";

// Region mappings - map region names to images
export const regionImageMap = {
    "maharashtra": Maharashtra,
    "gujarat": Gujarat,
    "surat": Surat,
    "punjab": Punjab,
    "rajasthan": Rajasthan,
    "rajastha": Rajasthan, // Alternative spelling
    "mumbai": Maharashtra,
    "pune": Maharashtra,
    "nashik": Maharashtra,
    "nagpur": Maharashtra,
    "kolhapur": Maharashtra,
    "ahmedabad": Gujarat,
    "vadodara": Gujarat,
    "rajkot": Gujarat,
    "chandigarh": Punjab,
    "ludhiana": Punjab,
    "amritsar": Punjab,
    "jaipur": Rajasthan,
    "jodhpur": Rajasthan,
    "udaipur": Rajasthan,
    "hubli": DharwadPedaImg, // Karnataka
    "dharwad": DharwadPedaImg,
    "karnataka": DharwadPedaImg,
};

// Category mappings - map category names to images
export const categoryImageMap = {
    "papad": PapadMore,
    "papad & more": PapadMore,
    "papads": PapadMore,
    "snacks": SnackImg,
    "snack items": SnackImg,
    "snacks & namkeen": SnackImg,
    "namkeen": SnackImg,
    "instant premix": PremixImg,
    "premix": PremixImg,
    "pickles": PicklesImg,
    "pickles & more": PicklesImg,
    "millet": MilletImg,
    "millet based": MilletImg,
    "millets": MilletImg,
    "sweets": SweetsImg,
    "sweets & treats": SweetsImg,
    "sweet": SweetsImg,
    "grains": GrainsImg,
    "grains & spices": GrainsImg,
    "spices": GrainsImg,
    "chutney": CleaningImg,
    "chutney & masala": CleaningImg,
    "masala": CleaningImg,
    "seasonings": CleaningImg,
};

// Food item specific mappings - map food item names to images
export const foodItemImageMap = {
    "bhakarwadi": BhakarwadiImg,
    "pune bhakarwadi": BhakarwadiImg,
    "orange barfi": OrangeBarfiImg,
    "barfi": OrangeBarfiImg,
    "chivda": ChivdaImg,
    "nashik chivda": ChivdaImg,
    "dharwad peda": DharwadPedaImg,
    "peda": DharwadPedaImg,
    "kolhapuri masala": KolhapuriMasalaImg,
    "kolhapuri misal masala": KolhapuriMasalaImg,
    "misal masala": KolhapuriMasalaImg,
    "oranges": OrangesImg,
    "nagpur oranges": OrangesImg,
    "orange": OrangesImg,
    "alphonso mango": AlphonsoMangoImg,
    "mango": AlphonsoMangoImg,
    "alphonso": AlphonsoMangoImg,
    "saffron": saffronImg,
    "kashmir saffron": saffronImg,
    "kesar": saffronImg,
};

// Featured products mappings
export const featuredProductImages = {
    "freshly arrived": saffronImg,
    "diwali sweets": sweetsImg,
    "saffron": saffronImg,
    "sweets": sweetsImg,
};

/**
 * Get image for a region based on name
 * @param {string} regionName - The name of the region
 * @returns {string} - The image URL
 */
export const getRegionImage = (regionName) => {
    if (!regionName) return Greenchill;
    const normalizedName = regionName.toLowerCase().trim();
    return regionImageMap[normalizedName] || Greenchill;
};

/**
 * Get image for a category based on name
 * @param {string} categoryName - The name of the category
 * @returns {string} - The image URL
 */
export const getCategoryImage = (categoryName) => {
    if (!categoryName) return Greenchill;
    const normalizedName = categoryName.toLowerCase().trim();
    return categoryImageMap[normalizedName] || Greenchill;
};

/**
 * Get image for a food item based on name
 * @param {string} foodName - The name of the food item
 * @param {string} categoryName - Optional category name for fallback
 * @returns {string} - The image URL
 */
export const getFoodItemImage = (foodName, categoryName = null) => {
    if (!foodName) return Greenchill;
    
    const normalizedFoodName = foodName.toLowerCase().trim();
    
    // Try exact food item match first
    if (foodItemImageMap[normalizedFoodName]) {
        return foodItemImageMap[normalizedFoodName];
    }
    
    // Try partial matches for food items
    for (const [key, image] of Object.entries(foodItemImageMap)) {
        if (normalizedFoodName.includes(key) || key.includes(normalizedFoodName)) {
            return image;
        }
    }
    
    // Fallback to category image if provided
    if (categoryName) {
        return getCategoryImage(categoryName);
    }
    
    return Greenchill;
};

/**
 * Get featured product image
 * @param {string} productName - The name of the featured product
 * @returns {string} - The image URL
 */
export const getFeaturedProductImage = (productName) => {
    if (!productName) return saffronImg;
    const normalizedName = productName.toLowerCase().trim();
    return featuredProductImages[normalizedName] || saffronImg;
};

/**
 * Get region badge count (for display purposes)
 * @param {string} regionName - The name of the region
 * @returns {number|null} - The badge count or null if none
 */
export const getRegionBadgeCount = (regionName) => {
    const badgeCounts = {
        "surat": 418,
        "gujarat": 418,
        // Add more badge counts as needed
    };
    
    if (!regionName) return null;
    const normalizedName = regionName.toLowerCase().trim();
    return badgeCounts[normalizedName] || null;
};

// Export all images for direct use if needed
export {
    Maharashtra,
    Gujarat,
    Surat,
    Punjab,
    Rajasthan,
    PapadMore,
    SnackImg,
    PremixImg,
    PicklesImg,
    MilletImg,
    SweetsImg,
    GrainsImg,
    CleaningImg,
    BhakarwadiImg,
    OrangeBarfiImg,
    ChivdaImg,
    DharwadPedaImg,
    KolhapuriMasalaImg,
    OrangesImg,
    AlphonsoMangoImg,
    saffronImg,
    sweetsImg,
    Greenchill
};