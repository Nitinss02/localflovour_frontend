import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaListUl,
  FaInfoCircle,
  FaPhoneAlt,
  FaUserShield,
  FaQuestionCircle,
  FaTruck,
  FaUndoAlt,
  FaLock,
  FaFileContract,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaGoogle,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-700 text-sm">
        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-900">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <a href="#home" className="flex items-center gap-2 hover:text-purple-700">
                <FaHome className="text-blue-500" /> Home
              </a>
            </li>
            <li>
              <a href="#shop-region" className="flex items-center gap-2 hover:text-purple-700">
                <FaShoppingCart className="text-green-500" /> Shop by Region
              </a>
            </li>
            <li>
              <a href="#shop-category" className="flex items-center gap-2 hover:text-purple-700">
                <FaListUl className="text-orange-500" /> Shop by Category
              </a>
            </li>
            <li>
              <Link to="/about" className="flex items-center gap-2 hover:text-purple-700">
                <FaInfoCircle className="text-purple-500" /> About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="flex items-center gap-2 hover:text-purple-700">
                <FaPhoneAlt className="text-pink-500" /> Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-900">
            Customer Support
          </h3>
          <ul className="space-y-3">
            <li>
              <Link to="/faq" className="flex items-center gap-2 hover:text-purple-700">
                <FaQuestionCircle className="text-yellow-500" /> FAQ
              </Link>
            </li>
            <li>
              <Link to="/shipping-policy" className="flex items-center gap-2 hover:text-purple-700">
                <FaTruck className="text-blue-600" /> Shipping & Delivery Policy
              </Link>
            </li>
            <li>
              <Link to="/return-refund" className="flex items-center gap-2 hover:text-purple-700">
                <FaUndoAlt className="text-green-600" /> Return & Refund Policy
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="flex items-center gap-2 hover:text-purple-700">
                <FaLock className="text-gray-600" /> Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="flex items-center gap-2 hover:text-purple-700">
                <FaFileContract className="text-red-500" /> Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-900">
            Contact Info
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1 text-red-600" />
              <span>Alphaseam Enterprises, Vasai, Maharashtra</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-green-600" />
              <a href="tel:+9273576390" className="hover:text-purple-700">
                +9273576390
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500" />
              <a href="mailto:Alphaseam@gmail.com" className="hover:text-purple-700">
                Alphaseam@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-900">
            Connect With Us
          </h3>
          <div className="flex items-center gap-5 text-2xl">
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:scale-110 transition-transform"
            >
              <FaGoogle />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:scale-110 transition-transform"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:scale-110 transition-transform"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:scale-110 transition-transform"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t mt-8 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Alphaseam Enterprises. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
