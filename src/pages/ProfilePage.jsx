import React, { useState } from "react";
import profilePic from "../assets/profile-edit.png";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { IoLanguageOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEditUserProfileMutation, useGetAllAddressesQuery, useGetUserProfileQuery } from "../services/userApi";
import { useGetWishlistQuery } from "../services/wishlistApi";
import { useGetCartQuery } from "../services/cartApi";
import { useGetOrdersQuery } from "../services/orderApi";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { data: profile, isLoading, isError, refetch } = useGetUserProfileQuery();
  const { data: address } = useGetAllAddressesQuery();
  const { data: wishlist } = useGetWishlistQuery();
  const { data: cart } = useGetCartQuery();
  const { data: ordder } = useGetOrdersQuery();
  const [editProfile] = useEditUserProfileMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", mobileNo: "" });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const handleEditProfile = () => {
    setFormData({
      name: profile?.data?.name || "",
      mobileNo: profile?.data?.mobileNo || "",
    });
    setErrors({});
    setIsEditing(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    navigate("/roleselection");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    // if (!formData.name.trim()) newErrors.name = "Name is required";
    // if (!/^\d{10}$/.test(formData.mobileNo)) newErrors.mobileNo = "Mobile number must be 10 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateForm()) return; // Stop if frontend validation fails
    try {
      const res = await editProfile(formData).unwrap();
      Swal.fire("Success", "Profile updated successfully", "success");
      setIsEditing(false);
      refetch();
    } catch (err) {
      console.error(err);
      if (err?.data?.data) {
        setErrors(err.data.data);
      } else {
        Swal.fire("Error", err?.data?.message || "Failed to update profile", "error");
      }
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading profile...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Failed to load profile</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between items-center p-6">
      <div className="w-full flex flex-col items-center">
        {/* Profile Card */}
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md flex items-start text-left mb-10">
          <img
            src={profile?.data?.profileImage || profilePic}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-gray-200 mr-6"
          />
          <div className="flex flex-col justify-center w-full">
            <h1 className="text-xl font-bold text-gray-900">{profile?.data?.name || "User"}</h1>
            <p className="text-gray-500">{profile?.data?.email || "N/A"}</p>
            <button
              onClick={handleEditProfile}
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md w-full"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Info Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <p className="text-gray-700 mb-2">Name: {profile?.data?.name || "-"}</p>
            <p className="text-gray-700 mb-2">Contact: {profile?.data?.mobileNo || "-"}</p>
            <p className="text-gray-700">Email: {profile?.data?.email || "-"}</p>

          </div>
          {console.log(ordder)}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Order Information</h2>
            <p className="text-gray-700 mb-2">My Orders : {ordder?.data?.length}</p>
            <p className="text-gray-700 mb-2">Wishlist : {wishlist?.data?.totalCount || 0}</p>
            <p className="text-gray-700">Cart : {cart?.data?.items.length || 0}</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Payment & Wallet</h2>
            <p className="text-gray-700 mb-2">Saved Card</p>
            <p className="text-gray-700">Wallet</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Settings & Privacy</h2>
            <div className="flex items-center gap-2 mb-2">
              <MdOutlineNotificationsNone className="text-lg" />
              <p>Notification</p>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <IoLanguageOutline className="text-lg" />
              <p>Language</p>
            </div>
            <div className="flex items-center gap-2">
              <FaRegMoon className="text-lg" />
              <p>Dark Mode</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Out */}
      <div className="w-full max-w-md">
        <button
          onClick={handleSignOut}
          className="mt-6 mb-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md w-full"
        >
          Sign Out
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full mb-1"
            />
            {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

            <label className="block mb-1 font-medium">Mobile Number</label>
            <input
              type="text"
              name="mobileNo"
              placeholder="Mobile Number"
              value={formData.mobileNo}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full mb-1"
            />
            {errors.mobileNo && <p className="text-red-500 text-sm mb-2">{errors.mobileNo}</p>}

            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
