import React, { useState } from 'react';
import ImageCard from './ImageCard';

import happyCustomer1 from '../assets/happyCustomer1.png'
import happyCustomer2 from '../assets/Happycustomer2.jpg'
import happyCustomer3 from '../assets/happyCustomer3.png'
import happyCustomer4 from '../assets/Happycustomer4.png'

const imageData = [
    { id: 1, url: happyCustomer1, title: 'surabhi and family' },
    { id: 2, url: happyCustomer2, title: 'radhika ambani' },
    { id: 3, url: happyCustomer3, title: 'janavi kapur' },
    { id: 4, url: happyCustomer4, title: 'janakidevi famaily' }
];

const Gallery = () => {
    const [expandedId, setExpandedId] = useState(imageData[0].id);

    const handleCardHover = (id) => {
        setExpandedId(id);
    };

    const handleCardLeave = () => {
        setExpandedId(imageData[0].id);
    };


    return (
        <div className="p-4 sm:p-8  min-h-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 sm:mb-10 text-gray-800">
                Happy Customer
            </h2>
            <div
                className="flex flex-col md:flex-row justify-center items-center h-full max-w-7xl mx-auto space-y-4 md:space-y-0 md:space-x-4 p-0 sm:p-4"
                style={{ minHeight: '500px' }}
            >
                {imageData.map((item) => (
                    <ImageCard
                        key={item.id}
                        image={item.url}
                        title={item.title}
                        isExpanded={item.id === expandedId}
                        onMouseEnter={() => handleCardHover(item.id)}
                        onMouseLeave={handleCardLeave}
                    />
                ))}
            </div>
        </div>
    );
};

export default Gallery;