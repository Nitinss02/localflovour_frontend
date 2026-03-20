import React from "react";

const ContactUspage = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-purple-700">About Local Flavours</h1>
      <p className="mb-4 text-gray-700">
        Local Flavours is a social platform dedicated to promoting India's rich heritage of regional
        specialty foods and homemade products. Our mission is to empower small entrepreneurs,
        women-led businesses, and rural artisans by giving them a trusted platform to reach customers
        across the country.
      </p>
      <p className="mb-4 text-gray-700">
        Local Flavours showcases authentic, locally prepared items — from homemade pickles, sweets,
        chutneys, spices, snacks, to traditional recipes passed down through generations. We aim to
        connect customers with the true taste of India's regions, while supporting the people who
        preserve these flavors.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Through Local Flavours, sellers can:</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Showcase their products to a wider audience across India.</li>
        <li>Grow their business with organized, simple online tools.</li>
        <li>Share their story and build trust with customers who value authenticity.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">For customers, Local Flavours means:</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>
          Access to a wide variety of authentic homemade products from every corner of India.
        </li>
        <li>
          Confidence that your purchase supports women entrepreneurs, self-help groups, and small
          rural businesses.
        </li>
        <li>The joy of experiencing genuine, regional tastes made with love and tradition.</li>
      </ul>

      <p className="mt-6 text-gray-700">
        We see ourselves as a partner to both sellers and buyers — strengthening local economies,
        empowering artisans, and celebrating India's cultural food diversity.
      </p>
      <p className="mt-2 text-gray-700">
        Get in touch with us to join the journey, share your story, or explore authentic local
        flavors!
      </p>
    </div>
  );
};

export default ContactUspage;
