import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAddToCartMutation } from "../services/cartApi";
import { useAuth } from "../context/AuthContext";

const AddToCartButton = ({ foodId }) => {
    const [addToCart, { isLoading }] = useAddToCartMutation();
    const { isAuthenticated } = useAuth();

    const handleClick = async () => {
        if (!isAuthenticated) {
            toast.info("Please log in to add items to your cart");
            return;
        }

        try {
            await addToCart({ foodId, quantity: 1 }).unwrap();
            toast.success("Item added to cart!");
        } catch (error) {
            console.error(error);
            toast.error(error?.data?.message || "Failed to add item to cart.");
        }
    };

    return (
        <button
            className="flex-1 px-6 py-3 border-2 border-[#6A3EA7] text-[#6A3EA7] font-bold rounded-lg shadow-md hover:bg-purple-50 transition disabled:opacity-50"
            onClick={handleClick}
            disabled={isLoading}
        >
            {isLoading ? "Adding..." : "Add to Cart"}
        </button>
    );
};

export default AddToCartButton;
