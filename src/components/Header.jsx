import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { FaRegUserCircle } from 'react-icons/fa';
import Logo from './Logo';
import { useGetCartQuery } from '../services/cartApi';
import ShoppingCart from './ShoppingCart';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  // Only fetch cart data if user is authenticated
  const { data: cartData, isLoading, isError, refetch: getCart } = useGetCartQuery(undefined, {
    skip: !isAuthenticated
  });

  const handleCartClick = () => {
    if (!isAuthenticated) {
      toast.info("Please log in to view your cart");
      return;
    }

    setShowCart(true);
    getCart().unwrap().catch(err => {
      console.error("Failed to load cart:", err);
      toast.warn("Failed to load cart. Please try again.");
    });
  };

  const handleUserIconClick = () => {
    if (!isAuthenticated) {
      toast.info("Please log in to access your profile");
    } else {
      navigate('/profile');
    }
  };

  const handleLinkClick = () => setIsMenuOpen(false);

  //Calculate total cart items (only for authenticated users)
  const totalItems = isAuthenticated ? (cartData?.data?.items?.length || 0) : 0;

  return (
    <header className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Logo />
        </div>

        {/* Mobile Cart + Menu */}
        <div className="md:hidden flex items-center gap-4 relative">
          {/* Mobile Cart */}
          <div className="relative">
            <FiShoppingCart
              className="text-purple-700 w-6 h-6 cursor-pointer"
              onClick={handleCartClick}
            />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {totalItems}
              </span>
            )}
          </div>

          <FaRegUserCircle
            className="text-purple-700 w-6 h-6 cursor-pointer"
            onClick={handleUserIconClick}
          />

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-purple-700 focus:outline-none"
          >
            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-15 text-base font-medium text-gray-800">
          <Link to="/" className="hover:text-purple-600">Home</Link>
          <Link to="/categories" className="hover:text-purple-600">Categories</Link>
          <Link to="/about" className="hover:text-purple-600">About Us</Link>
          {!isAuthenticated && (
            <Link to="/roleselection" className="hover:text-purple-600">Sign in</Link>
          )}
        </nav>

        {/* Desktop Cart + User Icon */}
        <div className="hidden md:flex items-center gap-4 relative">
          <div className="relative">
            <FiShoppingCart
              className="text-purple-700 w-6 h-6 cursor-pointer"
              onClick={handleCartClick}
            />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {totalItems}
              </span>
            )}
          </div>

          <FaRegUserCircle
            className="text-purple-700 w-6 h-6 cursor-pointer"
            onClick={handleUserIconClick}
          />
        </div>

        {/* Shopping Cart Modal */}
        {showCart && (
          <ShoppingCart
            cartData={cartData}
            refetchCart={getCart}
            onClose={() => setShowCart(false)}
          />
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md py-4 px-4 flex flex-col items-center space-y-4">
          <Link to="/" onClick={handleLinkClick} className="hover:text-purple-600">Home</Link>
          <Link to="/categories" onClick={handleLinkClick} className="hover:text-purple-600">Categories</Link>
          <Link to="/about" onClick={handleLinkClick} className="hover:text-purple-600">About Us</Link>
          {!isAuthenticated && (
            <Link to="/roleselection" onClick={handleLinkClick} className="hover:text-purple-600">Sign in</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;