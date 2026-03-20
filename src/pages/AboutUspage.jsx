import React from 'react';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
               
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-left">About Us</h1>

               
                <div className="bg-white p-8 rounded-lg shadow-md">
                    
                    <p className="text-gray-700 leading-relaxed mb-6">
                        <span className="font-semibold">Local Flavours</span> is a unique online marketplace that brings together regional food producers, local women entrepreneurs, and small
                        businesses from across India. Our platform helps them showcase and sell authentic homemade and traditional food products to customers
                        nationwide.
                    </p>

                    
                    <p className="text-gray-700 leading-relaxed mb-6">
                        We aim to empower rural entrepreneurs and women-led businesses, giving them a digital space to grow, manage their businesses in an
                        organized way, and reach a wider audience. From homemade snacks and pickles to regional specialties, Local Flavours connects authentic
                        tastes of India directly to your doorstep.
                    </p>

                    
                    <p className="text-gray-700 leading-relaxed mb-8">
                        Through Local Flavours, sellers gain more visibility and customer reach. We are a trusted partner for Self Help Groups, local artisans, and
                        rural businesses, supporting them with tools, visibility, and growth opportunities.
                    </p>

                   
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Empowering Communities:</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                            <li>Over 500+ local sellers are part of our platform.</li>
                            <li>Many women entrepreneurs have scaled their businesses to achieve turnovers of ₹1-5 lakhs annually.</li>
                            <li>By supporting Local Flavours, you are contributing to the financial independence of rural households and preserving India’s rich culinary heritage.</li>
                        </ul>
                    </div>

                    
                    <p className="text-gray-700 leading-relaxed text-lg font-medium">
                        Our vision is simple — to celebrate local tastes, empower rural entrepreneurs, and deliver authentic food experiences across India.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;