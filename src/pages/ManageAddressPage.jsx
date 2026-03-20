// src/pages/ManageAddressPage.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import {
    useGetAllAddressesQuery,
    useAddAddressMutation,
    useEditAddressMutation,
    useDeleteAddressMutation,
} from "../services/userApi";
import AddressModal from "../components/AddressModal";

const ManageAddressPage = () => {
    const { user } = useAuth();
    const userId = user?.id;
    const {
        data: addressResponse,
        isLoading,
        isError,
    } = useGetAllAddressesQuery(userId, { skip: !userId });

    const addresses = (addressResponse?.data || []).map((addr) => ({
        id: addr.id ?? addr._id ?? addr.addressId,
        ...addr,
    }));

    const [addAddress] = useAddAddressMutation();
    const [editAddress] = useEditAddressMutation();
    const [deleteAddress] = useDeleteAddressMutation();

    const [modalOpen, setModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    const openAddModal = () => {
        setEditingAddress(null);
        setModalOpen(true);
    };

    const openEditModal = (addr) => {
        setEditingAddress(addr);
        setModalOpen(true);
    };

    const handleSave = async (data) => {
        try {
            if (editingAddress) {
                await editAddress({ id: editingAddress.id, body: data }).unwrap();
                toast.success("Address updated successfully!");
            } else {
                await addAddress({ userId, ...data }).unwrap();
                toast.success("Address added successfully!");
            }
            setModalOpen(false);
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || "Failed to save address");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this address?")) return;
        try {
            await deleteAddress(id).unwrap();
            toast.success("Address deleted successfully!");
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || "Failed to delete address");
        }
    };

    if (isLoading) return <div className="p-6">Loading...</div>;
    if (isError) return <div className="p-6 text-red-500">Failed to load addresses.</div>;

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-purple-700">Manage Addresses</h2>

            <button
                onClick={openAddModal}
                className="mb-4 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
            >
                + Add New Address
            </button>

            <ul>
                {addresses.length > 0 ? (
                    addresses.map((addr) => (
                        <li
                            key={addr.id}
                            className="flex justify-between border p-2 mb-2 rounded items-center"
                        >
                            {console.log(addr)}
                            <div className="text-sm">
                                {addr.houseNo}, {addr.street}, {addr.city}, {addr.state} - {addr.zipCode}, {addr.country}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => openEditModal(addr)} className="bg-yellow-400 px-2 rounded">
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(addr.id)}
                                    className="bg-red-500 px-2 rounded text-white"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">No addresses found.</p>
                )}
            </ul>

            <AddressModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                initialData={editingAddress}
            />
        </div>
    );
};

export default ManageAddressPage;
