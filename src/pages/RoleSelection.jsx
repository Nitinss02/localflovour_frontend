
import React from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import cartImg from "../assets/cart.png";
import vendorImg from "../assets/vendor.png";

const RoleSelection = () => {
    const navigate = useNavigate();
    const handleUserClick = () => {
        console.log("Continue as User clicked");
        navigate("/onboarding")
    };

    const handleVendorClick = () => {
        console.log("Continue as Vendor clicked");
        navigate("/vendor/login");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-6 p-6">
            <Card
                variant="profile"
                title="Continue As Customer/User"
                description="Shop Your Favorite regional foods"
                buttonText="Continue As User"
                onClick={handleUserClick}
                image={cartImg}
            />
            <Card
                variant="profile"
                title="Continue As Vendor/Seller"
                description="Manage your shop & sell product"
                buttonText="Continue As Vendor"
                onClick={handleVendorClick}
                image={vendorImg}
            />
        </div>
    );
};

export default RoleSelection;