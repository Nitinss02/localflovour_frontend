import { NavLink, useNavigate } from "react-router-dom";
import {
    BiBarChart,
    BiLogOut,
    BiShoppingBag,
    BiUser,
} from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu";

const navItems = [
    { name: "Dashboard", icon: LuLayoutDashboard, path: "/vendor/dashboard" },
    { name: "Sales Report", icon: BiBarChart, path: "/vendor/sales-report" },
    { name: "Add Food", icon: BiShoppingBag, path: "/vendor/foodform" },
    { name: "Profile", icon: BiUser, path: "/vendor/profile" },
    { name: "Orders", icon: BiShoppingBag, path: "/vendor/orders" }
];

function Sidebar({ onClose }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole");
        navigate("/vendor/login");
    };

    return (
        <div className="flex flex-col justify-between h-full p-4 bg-white border-r border-gray-200">
            {/* Navigation Section */}
            <div className="flex-1 overflow-y-auto">
                <nav className="space-y-2">
                    {navItems.map(({ name, icon: Icon, path }) => (
                        <NavLink
                            key={name}
                            to={path}
                            onClick={() => onClose && onClose()}
                            className={({ isActive }) =>
                                `flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${isActive
                                    ? "bg-purple-600 text-white shadow-md"
                                    : "text-purple-800 hover:bg-purple-100"
                                }`
                            }
                        >
                            <Icon className="w-5 h-5 mr-3" />
                            <span>{name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Logout Button */}
            <div>
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full p-3 mt-4 bg-red-500 text-gray-100 border border-gray-300 rounded-lg hover:bg-red-600 transition-colors"
                >
                    <BiLogOut className="w-5 h-5 mr-2" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
