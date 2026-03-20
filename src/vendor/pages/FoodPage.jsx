import React, { useState } from "react";
import FoodForm from "../components/FoodForm";
import FoodItemTable from "../components/FoodItemTable";

export default function FoodPage() {
    const [showForm, setShowForm] = useState(false);

    const handleToggle = () => {
        setShowForm((prev) => !prev);
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <button
                    className="px-4 py-2 text-purple-100 bg-purple-600 rounded"
                    onClick={handleToggle}
                >
                    {showForm ? "Back to Table" : "Add Food"}
                </button>
            </div>

            {showForm ? <FoodForm /> : <FoodItemTable />}
        </div>
    );
}
