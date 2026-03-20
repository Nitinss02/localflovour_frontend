import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SameerImg from '../assets/Sameer.png';
import AnjaliImg from '../assets/Anjali.png';
import PriyaImg from '../assets/priya2.png';
import HomepageImg from '../assets/Homepageimage.jpg';
import RatingStars from "./RatingStars";
import Logo from "./Logo";

// Custom hook for media query
const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, [matches, query]);
    return matches;
};

// const testimonialsData = [
//     {
//         name: "Sudip Karmarkar",
//         quote:
//             "What truly resonated with me about give.do was the platform's trustworthiness and the assurance that my donation would be used effectively. The ease of use, excellent customer support, and verified NGOs all contributed to a positive giving experience.",
//         avatar: Anjali,
//         tagline:
//             "Joined the mission to turn compassion into action through giving and support.",
//     },
//     {
//         name: "Tejas Mahakal",
//         quote:
//             "What truly resonated with me about give.do was the platform's trustworthiness and the assurance that my donation would be used effectively. The ease of use, excellent customer support, and verified NGOs all contributed to a positive giving experience.",
//         avatar: Anjali,
//         tagline:
//             "Passionate about community welfare and sustainable development goals.",
//     },
//     {
//         name: "Aniket Mundhe",
//         quote:
//             "What truly resonated with me about give.do was the platform's trustworthiness and the assurance that my donation would be used effectively. The ease of use, excellent customer support, and verified NGOs all contributed to a positive giving experience.",
//         avatar: Anjali,
//         tagline:
//             "A true believer in collective good and empowering underprivileged.",
//     },
// ];

const testimonialsData = [
    {
        id: 1,
        text: `I ordered a few items including Nashik raisins, Solapur chutney, and some papads. Each product had its own authentic touch — the raisins were fresh and juicy, the chutney had that traditional spicy punch, and the papads tasted just like the ones my mother used to make at home. This platform truly gives us access to real local flavors.`,
        name: "Sameer P.",
        location: "Hyderabad",
        img: SameerImg,
        stars: 4,
    },
    {
        id: 2,
        text: `I tried the Pune Bhakarwadi for the first time through this platform, and I must say it was one of the best experiences! The snack was super crunchy with just the right balance of sweet and spicy filling. More than that, it carried the authentic taste of Pune’s culture — a true delight for someone living away from Maharashtra.`,
        name: "Anjali M.",
        location: "Bangalore",
        img: AnjaliImg,
        stars: 5,
    },
    {
        id: 3,
        text: `I ordered the Kolhapuri Masala from this marketplace, and it completely transformed the taste of my curry. The spices were so fresh and aromatic that they reminded me of my grandmother’s cooking back in Kolhapur. The packaging was neat, delivery was on time, and I could truly feel the authenticity in every bite.`,
        name: "Priya S.",
        location: "Mumbai",
        img: PriyaImg,
        stars: 5,
    },
];

const TestimonialCard = ({ item }) => (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-left transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full border-2 border-purple-300 ">
        <p className="text-gray-700 italic mb-6 text-base leading-relaxed flex-grow">
            “{item.text}”
        </p>
        <div className="flex items-start gap-4 mt-4">
            <img
                src={item.img}
                alt={item.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-teal-400 flex-shrink-0"
            />
            <div className="flex flex-col">
                <p className="font-semibold text-teal-700 text-lg">{item.name} <span className="text-sm text-gray-500">({item.location})</span></p>
                <p className="text-sm text-gray-500"><RatingStars rating={item.stars} /></p>
            </div>
        </div>
    </div>
);

const Testimonials = () => {
    const isDesktop = useMediaQuery("(min-width: 993px)");

    return (
        <section
            id="testimonials"
            className="relative bg-cover bg-center text-gray-800 py-16 md:py-24 overflow-hidden"
            style={{ backgroundImage: `url(${HomepageImg})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-400/60 z-10"></div>

            <div className="relative z-20 max-w-6xl mx-auto text-center flex flex-col items-center px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-10 text-black">
                    Here’s What People Say About{" "}
                    <span className="text-[#6A3EA7] font-extrabold">Local Flavors</span>
                </h2>

                {isDesktop ? (
                    <div className="flex justify-center gap-8 flex-wrap max-w-6xl items-start">
                        {testimonialsData.map((item, index) => (
                            <div
                                key={index}
                                className={`w-[350px] flex-shrink-0 ${index === 0 || index === 2 ? "mt-12" : "mt-0"
                                    }`}
                            >
                                <TestimonialCard item={item} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <Swiper
                        className="w-[90vw] max-w-5xl"
                        modules={[Autoplay, Navigation]}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        slidesPerView={1.2}
                        spaceBetween={20}
                        centeredSlides={true}
                        navigation={true}
                    >
                        {testimonialsData.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="p-4">
                                    <TestimonialCard item={item} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    );
};

export default Testimonials;
