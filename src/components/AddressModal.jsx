// src/components/AddressModal.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const DEFAULT = {
    houseNo: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
};

const AddressModal = ({ isOpen, onClose, onSave, initialData, title }) => {
    const [formData, setFormData] = useState(DEFAULT);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (initialData) setFormData({ ...DEFAULT, ...initialData });
        else setFormData(DEFAULT);
    }, [initialData, isOpen]);

    const handleChange = (e) =>
        setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        // basic validation
        if (!formData.city || !formData.zipCode || !formData.country) {
            return alert("Please fill required fields: city, postal code, country");
        }
        try {
            setSaving(true);
            await onSave(formData);
        } catch (err) {
            // parent should handle toast; keep fallback
            console.error("Save address failed", err);
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4"
        >
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-purple-700 text-center">
                    {title || (initialData ? "Edit Address" : "Add Address")}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <label className="block">
                        <span className="text-sm text-gray-700">House / Flat No.</span>
                        <input
                            name="houseNo"
                            value={formData.houseNo || ""}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm text-gray-700">Street / Locality</span>
                        <input
                            name="street"
                            value={formData.street || ""}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm text-gray-700">City</span>
                        <input
                            name="city"
                            value={formData.city || ""}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm text-gray-700">State</span>
                        <input
                            name="state"
                            value={formData.state || ""}
                            onChange={handleChange}
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm text-gray-700">Postal Code</span>
                        <input
                            name="zipCode"
                            value={formData.zipCode || ""}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm text-gray-700">Country</span>
                        <input
                            name="country"
                            value={formData.country || ""}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </label>

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded border hover:bg-gray-100"
                            disabled={saving}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-purple-700 text-white hover:bg-purple-800"
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

AddressModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired, // expects a promise
    initialData: PropTypes.object,
    title: PropTypes.string,
};

AddressModal.defaultProps = {
    isOpen: false,
    initialData: null,
    title: null,
};

export default AddressModal;
