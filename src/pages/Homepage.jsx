import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetAllCategoriesQuery } from '../services/categoryApi';
import { useGetAllFoodsQuery } from '../services/foodApi';
import { getRegionImage, getCategoryImage, getFoodItemImage, getRegionBadgeCount } from '../utils/imageMapping';
import HeroImage1 from '../assets/image20.png';
import spicesimage from "../assets/spicesimage.png";
import saffronImg from "../assets/FreshlyArrived.png";
import sweetsImg from "../assets/DiwaliSweets.png";
import DharwadPedaImg from "../assets/DharwadPeda.png";
import KolhapuriMasalaImg from "../assets/KolhapuriMasala.png";
import OrangesImg from "../assets/Oranges.png";
import AlphonsoMangoImg from "../assets/AlphonsoMango.png";
import SameerImg from '../assets/Sameer.png';
import AnjaliImg from '../assets/Anjali.png';
import PriyaImg from '../assets/priya2.png';
import Categoriesbackroundimage from "../assets/Categoriesbackroundimage.png";
import 'swiper/css';
import 'swiper/css/pagination';
import { FaHandHoldingHeart } from "react-icons/fa6";
import { SiAdguard } from "react-icons/si";
import { GiDeliveryDrone } from "react-icons/gi";
import { TbWorldCheck } from "react-icons/tb";
import Testimonials from "../components/Testimonials";
import RatingStars from "../components/RatingStars";
import Gallery from "../components/Gallery";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Homepage = () => {
    const [expanded, setExpanded] = useState(null);
    const navigate = useNavigate();

    // Fetch dynamic data
    const { data: categoriesResponse, isLoading: categoriesLoading, isError: categoriesError } = useGetAllCategoriesQuery();
    const { data: foodsResponse, isLoading: foodsLoading, isError: foodsError } = useGetAllFoodsQuery();

    const categories = categoriesResponse?.data || [];
    const allFoods = foodsResponse?.data || [];

    // Dynamic regions - extract unique regions from food data
    const extractRegionsFromFoods = (foods) => {
        const regionSet = new Set();
        const regions = [];

        foods.forEach(food => {
            // Try to extract region/city information from food data
            // This might be from food.city, food.region, or parsed from food.name
            let region = null;
            if (food.city) region = food.city;
            else if (food.region) region = food.region;
            else if (food.name) {
                // Try to extract city names from food names
                const cityNames = ['pune', 'mumbai', 'nagpur', 'nashik', 'kolhapur', 'surat', 'ahmedabad', 'jaipur', 'dharwad', 'hubli'];
                const foundCity = cityNames.find(city => food.name.toLowerCase().includes(city));
                if (foundCity) region = foundCity;
            }

            if (region && !regionSet.has(region.toLowerCase())) {
                regionSet.add(region.toLowerCase());
                regions.push({
                    name: region.charAt(0).toUpperCase() + region.slice(1),
                    img: getRegionImage(region),
                    hasBadge: getRegionBadgeCount(region) !== null,
                    badgeCount: getRegionBadgeCount(region)
                });
            }
        });

        // Add default regions if not found in food data
        const defaultRegions = [
            { name: "Maharashtra", img: getRegionImage("Maharashtra") },
            { name: "Gujarat", img: getRegionImage("Gujarat") },
            { name: "Surat", img: getRegionImage("Surat") },
            { name: "Punjab", img: getRegionImage("Punjab") },
            { name: "Rajasthan", img: getRegionImage("Rajasthan") },
        ];

        return regions.length > 0 ? regions.slice(0, 8) : defaultRegions;
    };

    const dynamicRegions = extractRegionsFromFoods(allFoods);

    // Navigation handlers
    const handleRegionClick = (regionName) => {
        navigate(`/foods?type=region&value=${encodeURIComponent(regionName.toLowerCase())}&title=Foods from ${regionName}`);
    };

    const handleCategoryClick = (categoryName) => {
        navigate(`/foods?type=category&value=${encodeURIComponent(categoryName.toLowerCase())}&title=${categoryName} Items`);
    };

    const handleOrderNowClick = () => {
        navigate('/categories');
    };


    const stories = [
        {
            title: "Dharwad Peda",
            desc: `Made by the Thakur family who migrated from Uttar Pradesh in the 19th century, Dharwad Peda became famous for its grainy texture and rich taste. This sweet, rich in tradition, has carried forward the heritage of North Karnataka for generations, making it a must-try for anyone who visits Dharwad.`,
            img: DharwadPedaImg,
        },
        {
            title: "Kolhapuri Masala",
            desc: `Kolhapur is known for its fiery red masala and spicy Misal. The bold flavors represent the city’s royal culinary heritage. Kolhapuri Masala is often considered the soul of Maharashtrian curries, lending them an unmatched punch of flavor and authenticity.`,
            img: KolhapuriMasalaImg,
        },
        {
            title: "Oranges",
            desc: `Known as the “Orange City”, Nagpur produces the juiciest oranges in India. They are so famous that the city has a GI Tag for Nagpur Oranges. These oranges are exported worldwide and symbolize the agricultural pride of Vidarbha.`,
            img: OrangesImg,
        },
        {
            title: "Alphonso Mango",
            desc: `The king of mangoes, Ratnagiri Alphonso, is loved for its sweetness and aroma. Exported worldwide, it’s Maharashtra’s pride and has GI Tag. The fruit is celebrated not only for its taste but also for the cultural significance during the summer season.`,
            img: AlphonsoMangoImg,
        },
    ];


    const heroSlides = [
        {
            id: 1,
            text: `Preserving Traditions, Empowering Women - Bringing Authentic Homemade Goodness to Your Plate.`,
            subText: `Explore a world of traditional flavors and homemade delicacies from every corner of India, all carefully prepared by local hands and delivered fresh to your doorstep.`,
            img: HeroImage1,
        },
        {
            id: 2,
            text: `Preserving Traditions, Empowering Women - Bringing Authentic Homemade Goodness to Your Plate.`,
            subText: `Explore a world of traditional flavors and homemade delicacies from every corner of India, all carefully prepared by local hands and delivered fresh to your doorstep.`,
            img: spicesimage,
        }
    ];


    const testimonialsData = [
        { id: 1, text: `I ordered a few items including nashik raisins, solapur chutney, and same papads each product had its own authentic touch the raisins were fresh and juicy, the chutney had that traditional spicy pinch, and the papads were exactly like the once my mother used to make at home.this platform really gives us access to flavors. `, name: "Sameer P.", location: "Hyderabad", img: SameerImg, stars: 4 },
        { id: 2, text: `I tried the pune bhakarwadi for the first time through this platform, and i must say it was one of the best experiences. the snack was supar crunchy with just the right balance of sweet and spicy filling.More than that, it carried the taste of Pune’s culture. For someone living away from Maharashtra. `, name: "Anjali M.", location: "Bangalore", img: AnjaliImg, stars: 5 },
        { id: 3, text: `I ordered the Kolhapuri Masala from this marketplace, and I must say it completely transformed the taste of my curry. The spices were so fresh and aromatic that it reminded me of my grandmother’s cooking back in Kolhapur. The packaging was neat, delivery was on time, and I could really feel the authenticity in every bite. `, name: "Priya S.", location: "Mumbai", img: PriyaImg, stars: 5 },
    ];

    const features = [
        {
            icon: <FaHandHoldingHeart className="w-6 h-6 text-purple-600" />,
            title: "Sustainable",
            desc: "Handmade chemical free products good for you & your famaily",
        },
        {
            icon: <TbWorldCheck className="w-6 h-6 text-purple-600" />,
            title: "World Wide Shopping",
            desc: "Not only in India but world wide shipping to 106+ countries",
        },
        {
            icon: <SiAdguard className="w-6 h-6 text-purple-600" />,
            title: "100% Buyers Protection",
            desc: "Secure payments via Razorpay & stripe",
        },
        {
            icon: <GiDeliveryDrone className="w-6 h-6 text-purple-600" />,
            title: "Fast Delivery",
            desc: "Shipping in India via Bluedart & via DHL for Other countries",
        },
    ];

    return (
        <div
            className="flex flex-col min-h-screen w-full overflow-hidden bg-gray-100 bg-fixed bg-cover bg-center"
            style={{ backgroundImage: `url(${Categoriesbackroundimage})` }}
        >
            {/* HERO SECTION */}
            <motion.section
                className="relative w-full text-center text-white m-0 p-0"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
            >
                <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] m-0 p-0">
                    <Slider
                        dots={false}
                        infinite={true}
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                        autoplay={true}
                        autoplaySpeed={4000}
                    >
                        {heroSlides.map((slide) => (
                            <div key={slide.id} className="w-full m-0 p-0">
                                <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px]">
                                    <img
                                        src={slide.img}
                                        alt="Hero"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-40"></div>
                                    <div className="absolute inset-0 flex items-center justify-center p-4">
                                        <div className="relative max-w-4xl mx-auto z-10 px-4 text-center">
                                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                                {slide.text}
                                            </h1>
                                            <p className="text-lg sm:text-xl md:text-2xl mb-6">
                                                {slide.subText}
                                            </p>
                                            <button
                                                className="text-white py-3 sm:py-4 px-8 sm:px-16 rounded bg-purple-700 transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-purple-800"
                                                onClick={handleOrderNowClick}
                                            >
                                                Order Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </motion.section>

            {/* SHOP BY REGION */}
            <motion.section
                id="shop-region"
                className="py-12 w-full px-2 md:px-4"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
                    Shop By Region
                </h2>
                <div className="w-full max-w-[95%] md:max-w-screen-xl mx-auto overflow-hidden">
                    <Slider
                        dots={false}
                        infinite={true}
                        speed={500}
                        slidesToShow={4}
                        slidesToScroll={1}
                        autoplay={true}
                        responsive={[
                            { breakpoint: 1280, settings: { slidesToShow: 4 } },
                            { breakpoint: 1024, settings: { slidesToShow: 3 } },
                            { breakpoint: 768, settings: { slidesToShow: 2 } },
                            { breakpoint: 480, settings: { slidesToShow: 1 } },
                        ]}
                    >
                        {(foodsLoading
                            ? Array.from({ length: 5 }, (_, index) => index)
                            : foodsError
                                ? [
                                    { name: "Maharashtra", img: getRegionImage("Maharashtra") },
                                    { name: "Gujarat", img: getRegionImage("Gujarat") },
                                    { name: "Surat", img: getRegionImage("Surat"), hasBadge: true },
                                    { name: "Punjab", img: getRegionImage("Punjab") },
                                    { name: "Rajasthan", img: getRegionImage("Rajasthan") },
                                ]
                                : dynamicRegions
                        ).map((region, index) => (
                            <div key={index} className="p-2">
                                <div
                                    className="bg-white p-2 md:p-3 border border-gray-300 rounded-lg text-center 
                         hover:border-purple-600 transition-transform duration-300 
                         cursor-pointer transform hover:scale-105 w-full overflow-hidden"
                                    onClick={() =>
                                        !foodsLoading && !foodsError && handleRegionClick(region.name)
                                    }
                                >
                                    <div className="relative w-full aspect-square overflow-hidden mb-2">
                                        <img
                                            src={foodsLoading || foodsError ? region.img : region.img}
                                            alt={region.name}
                                            className="w-full h-full object-cover rounded-sm"
                                        />
                                        {region.hasBadge && region.badgeCount && (
                                            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                                                {region.badgeCount || 418}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-base sm:text-lg font-medium text-gray-800">
                                        {region.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </motion.section>

            <motion.section id="shop-category" className=" px-4 " variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h2 className="text-2xl font-semibold mb-6 text-center">Shop By Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                    {categoriesLoading ? (
                        // Loading state
                        Array.from({ length: 8 }, (_, index) => (
                            <motion.div key={index} className="bg-white shadow p-4 rounded text-center border border-gray-300 flex flex-col animate-pulse">
                                <div className="w-full h-24 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                            </motion.div>
                        ))
                    ) : categoriesError || categories.length === 0 ? (
                        // Error state or fallback - show default categories
                        [
                            { name: "Papad & More", image: getCategoryImage("Papad & More") },
                            { name: "Snack Items", image: getCategoryImage("Snack Items") },
                            { name: "Instant Premix", image: getCategoryImage("Instant Premix") },
                            { name: "Pickles & More", image: getCategoryImage("Pickles & More") },
                            { name: "Millet Based", image: getCategoryImage("Millet Based") },
                            { name: "Sweets & Treats", image: getCategoryImage("Sweets & Treats") },
                            { name: "Grains & Spices", image: getCategoryImage("Grains & Spices") },
                            { name: "Chutney & Masala", image: getCategoryImage("Chutney & Masala") },
                        ].map((category, index) => (
                            <motion.div
                                key={index}
                                className="bg-white shadow p-4 rounded text-center hover:scale-105 transition-transform border border-gray-300 flex flex-col cursor-pointer"
                                onClick={() => handleCategoryClick(category.name)}
                            >
                                <img src={category.image} alt={category.name} className="mx-auto mb-2 w-full h-24 object-contain" />
                                <p className="font-medium">{category.name}</p>
                            </motion.div>
                        ))
                    ) : (
                        // Dynamic categories from API
                        categories.slice(0, 8).map((category, index) => (
                            <motion.div
                                key={category.id || index}
                                className="bg-white shadow p-4 rounded text-center hover:scale-105 transition-transform border border-gray-300 flex flex-col cursor-pointer"
                                onClick={() => handleCategoryClick(category.name)}
                            >
                                <img
                                    src={category.imageUrl || getCategoryImage(category.name)}
                                    alt={category.name}
                                    className="mx-auto mb-2 w-full h-24 object-contain"
                                />
                                <p className="font-medium">{category.name}</p>
                                {category.description && (
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{category.description}</p>
                                )}
                            </motion.div>
                        ))
                    )}
                </div>
            </motion.section>

            <section className="w-full py-16 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center transition-transform hover:-translate-y-2"
                        >
                            <div className="w-16 h-16 flex items-center justify-center bg-purple-100 rounded-full mb-4 shadow-sm">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 max-w-[220px]">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
            <motion.section className=" px-4" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h2 className="text-2xl font-semibold mb-6 text-center">Featured Products</h2>
                <div className="flex flex-col md:flex-row gap-6 justify-center max-w-6xl mx-auto">
                    {foodsLoading ? (
                        // Loading state for featured products
                        Array.from({ length: 2 }, (_, index) => (
                            <motion.div
                                key={index}
                                className="flex flex-col sm:flex-row items-center bg-white border border-gray-200 shadow-md rounded-lg p-4 w-full md:w-1/2 animate-pulse"
                            >
                                <div className="w-24 h-24 bg-gray-200 rounded mb-4 sm:mb-0 sm:mr-4"></div>
                                <div className="flex flex-col flex-1">
                                    <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                </div>
                            </motion.div>
                        ))
                    ) : foodsError || allFoods.length === 0 ? (
                        // Fallback featured products
                        <>
                            <motion.div
                                className="flex flex-col sm:flex-row items-center bg-white border border-gray-200 shadow-md rounded-lg p-4 w-full md:w-1/2 cursor-pointer"
                                whileHover={{ scale: 1.03 }}
                                onClick={() => navigate('/foods?type=search&value=saffron&title=Saffron Products')}
                            >
                                <img
                                    src={saffronImg}
                                    alt="Freshly Arrived"
                                    className="w-24 h-24 rounded object-cover mb-4 sm:mb-0 sm:mr-4"
                                />
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-bold">Freshly Arrived</h3>
                                    <p className="text-sm text-gray-700">Kashmir Saffron 2025</p>
                                    <p className="text-purple-700 font-semibold mt-1">Premium Quality</p>
                                </div>
                            </motion.div>
                            <motion.div
                                className="flex flex-col sm:flex-row items-center bg-purple-50 border border-purple-200 shadow-md rounded-lg p-4 w-full md:w-1/2 cursor-pointer"
                                whileHover={{ scale: 1.03 }}
                                onClick={() => navigate('/foods?type=category&value=sweets&title=Sweet Treats')}
                            >
                                <img
                                    src={sweetsImg}
                                    alt="Festival Sweets"
                                    className="w-24 h-24 rounded object-cover mb-4 sm:mb-0 sm:mr-4"
                                />
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-bold">Festival Sweets</h3>
                                    <p className="text-sm text-gray-700">Traditional & Authentic</p>
                                    <p className="text-purple-700 font-semibold mt-1">Celebrate with Taste</p>
                                </div>
                            </motion.div>
                        </>
                    ) : (
                        // Dynamic featured products from API - get highest rated or newest items
                        allFoods
                            .filter(food => food.rating >= 4.0 || food.discount > 20) // Featured criteria
                            .slice(0, 2)
                            .map((food, index) => (
                                <motion.div
                                    key={food.id || index}
                                    className={`flex flex-col sm:flex-row items-center shadow-md rounded-lg p-4 w-full md:w-1/2 cursor-pointer ${index === 0
                                        ? 'bg-white border border-gray-200'
                                        : 'bg-purple-50 border border-purple-200'
                                        }`}
                                    whileHover={{ scale: 1.03 }}
                                    onClick={() => navigate(`/fooditemdetails/${food.id}`)}
                                >
                                    <img
                                        src={food.imageUrl || getFoodItemImage(food.name, food.categoryName)}
                                        alt={food.name}
                                        className="w-24 h-24 rounded object-cover mb-4 sm:mb-0 sm:mr-4"
                                    />
                                    <div className="flex flex-col justify-center items-center sm:justify-start sm:items-start text-center max-w-2xl">
                                        <h3 className="text-lg font-bold line-clamp-1">{food.name}</h3>

                                        <p className="text-sm text-gray-700">
                                            {food.rating >= 4.0 ? (
                                                <RatingStars rating={food.rating} />
                                            ) : (
                                                <span>{food.discount}% OFF</span>
                                            )}
                                        </p>

                                        <div className="mt-1">
                                            {food.discount > 0 ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-purple-700 font-semibold">₹{food.discountedPrice}</span>
                                                    <span className="text-xs text-gray-500 line-through">₹{food.price}</span>
                                                </div>
                                            ) : (
                                                <span className="text-purple-700 font-semibold">₹{food.price}</span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                    )}

                    {/* Fallback if no featured items meet criteria */}
                    {!foodsLoading && !foodsError && allFoods.length > 0 &&
                        allFoods.filter(food => food.rating >= 4.0 || food.discount > 20).length === 0 && (
                            allFoods.slice(0, 2).map((food, index) => (
                                <motion.div
                                    key={food.id || index}
                                    className={`flex flex-col sm:flex-row items-center shadow-md rounded-lg p-4 w-full md:w-1/2 cursor-pointer ${index === 0
                                        ? 'bg-white border border-gray-200'
                                        : 'bg-purple-50 border border-purple-200'
                                        }`}
                                    whileHover={{ scale: 1.03 }}
                                    onClick={() => navigate(`/fooditemdetails/${food.id}`)}
                                >
                                    <img
                                        src={food.imageUrl || getFoodItemImage(food.name, food.categoryName)}
                                        alt={food.name}
                                        className="w-24 h-24 rounded object-cover mb-4 sm:mb-0 sm:mr-4"
                                    />
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-bold line-clamp-1">{food.name}</h3>
                                        <p className="text-sm text-gray-700">{food.categoryName}</p>
                                        <span className="text-purple-700 font-semibold mt-1">₹{food.discountedPrice || food.price}</span>
                                    </div>
                                </motion.div>
                            ))
                        )}
                </div>
            </motion.section>

            <motion.section
                className=" py-12 px-4"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <h2 className="text-2xl font-semibold mb-6 text-center">Other Categories</h2>
                <div className="max-w-6xl mx-auto">
                    <Slider
                        dots={true}
                        infinite={true}
                        speed={500}
                        slidesToShow={3}
                        slidesToScroll={1}
                        autoplay={true}
                        responsive={[
                            { breakpoint: 1024, settings: { slidesToShow: 3 } },
                            { breakpoint: 768, settings: { slidesToShow: 2 } },
                            { breakpoint: 480, settings: { slidesToShow: 1 } }
                        ]}
                    >
                        {foodsLoading ? (
                            // Loading state for Other Categories
                            Array.from({ length: 5 }, (_, index) => (
                                <div key={index} className="p-2">
                                    <motion.div className="bg-white shadow p-4 rounded text-center border border-gray-300 animate-pulse">
                                        <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
                                        <div className="h-5 bg-gray-200 rounded w-2/3 mx-auto mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mb-3"></div>
                                        <div className="h-8 bg-gray-200 rounded w-24 mx-auto"></div>
                                    </motion.div>
                                </div>
                            ))
                        ) : foodsError || allFoods.length === 0 ? (
                            // Fallback to static data if API fails
                            [{ city: "Pune", product: "Bhakarwadi", state: "Maharashtra", price: "₹299", img: getFoodItemImage("Bhakarwadi") },
                            { city: "Nagpur", product: "Orange Barfi", state: "Maharashtra", price: "₹199", img: getFoodItemImage("Orange Barfi") },
                            { city: "Nashik", product: "Chivda", state: "Maharashtra", price: "₹149", img: getFoodItemImage("Chivda") },
                            { city: "Kolhapur", product: "Misal Masala", state: "Maharashtra", price: "₹89", img: getFoodItemImage("Misal Masala") },
                            { city: "Hubli", product: "Dharwad Peda", state: "Karnataka", price: "₹399", img: getFoodItemImage("Dharwad Peda") }].map((item, index) => (
                                <div key={index} className="p-2">
                                    <motion.div
                                        className="bg-white shadow p-4 rounded text-center hover:scale-105 transition-transform border border-gray-300 cursor-pointer"
                                        variants={fadeInUp}
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        onClick={() => handleRegionClick(item.city)}
                                    >
                                        <img src={item.img} alt={item.product} className="w-full h-40 object-contain mb-4 rounded" />
                                        <h3 className="text-lg font-semibold">{item.city}</h3>
                                        <p className="font-medium text-gray-800">{item.product}</p>
                                        <p className="text-sm text-gray-500">{item.state}</p>
                                        <p className="text-purple-700 font-bold mt-1">{item.price}</p>
                                        <button
                                            className="bg-purple-700 text-white px-4 py-2 rounded mt-3 hover:bg-purple-800 transition"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRegionClick(item.city);
                                            }}
                                        >
                                            Explore {item.city}
                                        </button>
                                    </motion.div>
                                </div>
                            ))
                        ) : (
                            // Dynamic food items from API
                            allFoods.slice(0, 6).map((food, index) => {
                                // Try to extract city from food data or name
                                const extractCity = (foodItem) => {
                                    if (foodItem.city) return foodItem.city;
                                    const cityNames = ['pune', 'mumbai', 'nagpur', 'nashik', 'kolhapur', 'surat', 'ahmedabad', 'jaipur', 'dharwad', 'hubli'];
                                    const foundCity = cityNames.find(city => foodItem.name?.toLowerCase().includes(city));
                                    return foundCity ? foundCity.charAt(0).toUpperCase() + foundCity.slice(1) : 'India';
                                };

                                const city = extractCity(food);
                                const displayPrice = food.discountedPrice || food.price;

                                return (
                                    <div key={food.id || index} className="p-2">
                                        <motion.div
                                            className="bg-white shadow p-4 rounded text-center hover:scale-105 transition-transform border border-gray-300 cursor-pointer"
                                            variants={fadeInUp}
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                            onClick={() => navigate(`/fooditemdetails/${food.id}`)}
                                        >
                                            <img
                                                src={food.imageUrl || getFoodItemImage(food.name, food.categoryName)}
                                                alt={food.name}
                                                className="w-full h-40 object-contain mb-4 rounded"
                                            />
                                            <h3 className="text-lg font-semibold">{city}</h3>
                                            <p className="font-medium text-gray-800 line-clamp-1">{food.name}</p>
                                            <p className="text-sm text-gray-500">{food.categoryName || 'Traditional'}</p>
                                            <div className="mt-1">
                                                {food.discount > 0 ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span className="text-purple-700 font-bold">₹{displayPrice}</span>
                                                        <span className="text-xs text-gray-500 line-through">₹{food.price}</span>
                                                        <span className="text-xs text-green-600 font-semibold">{food.discount}% OFF</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-purple-700 font-bold">₹{displayPrice}</span>
                                                )}
                                            </div>
                                            <button
                                                className="bg-purple-700 text-white px-4 py-2 rounded mt-3 hover:bg-purple-800 transition"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/fooditemdetails/${food.id}`);
                                                }}
                                            >
                                                View Details
                                            </button>
                                        </motion.div>
                                    </div>
                                );
                            })
                        )}

                    </Slider>
                </div>
            </motion.section>


            <motion.section
                className="py-12 px-4 "
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <h2 className="text-2xl font-semibold mb-6 text-center max-w-5xl mx-auto">Stories of Food & Culture</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {stories.map((story, index) => {
                        const isExpanded = expanded === index;
                        const shortDesc = story.desc.slice(0, 120) + "...";
                        return (
                            <motion.div key={index} className="bg-white shadow-sm rounded-lg p-4 flex flex-col sm:flex-row gap-6 items-start hover:scale-105 transition-transform border border-gray-300">
                                <img src={story.img} alt={story.title} className="w-full h-40 sm:w-36 sm:h-36 rounded-md object-cover flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{story.title}</h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {isExpanded ? story.desc : shortDesc}{" "}
                                        <span onClick={() => setExpanded(isExpanded ? null : index)} className="text-blue-600 cursor-pointer hover:underline font-medium">{isExpanded ? "Read Less" : "Read More"}</span>
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>

            <Testimonials />
            <Gallery />
        </div >
    );
};

export default Homepage;