import { BiUser } from "react-icons/bi";
import Logo from "../../components/Logo";
import { Link } from "react-router-dom";

function VendorHeader() {
    return (
        <header className="flex w-full items-center justify-between px-6 py-4 bg-white">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <Logo />
            </div>
            <h1 className="hidden md:block text-2xl font-bold text-black">Vendor Dashboard</h1>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
                <Link to="/vendor/profile">
                    <BiUser className="text-purple-700 w-6 h-6 cursor-pointer" />
                </Link>
            </div>
        </header>
    );
}

export default VendorHeader;
