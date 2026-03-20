import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import VendorHeader from "./VendorHeader";
import { BiMenu, BiX } from "react-icons/bi";

const VendorLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
                <VendorHeader />
                <button
                    className="md:hidden text-purple-700"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? <BiX className="w-7 h-7" /> : <BiMenu className="w-7 h-7" />}
                </button>
            </div>

            {/* Main Area */}
            <div className="flex flex-1 mt-[72px]">
                {/* Sidebar */}
                <div
                    className={`fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
                >
                    <Sidebar onClose={() => setSidebarOpen(false)} />
                </div>

                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 bg-opacity-70 z-30 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                <main className="flex-1 ml-0 md:ml-64 p-4 md:p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default VendorLayout;
