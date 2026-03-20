import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { endpoint }) => {
        const publicEndpoints = [
            "sendOtp", "verifyOtp", "registerUser", "resetPassword", "login", 
            "vendor/login", "vendor/register", "vendor/send-otp", "vendor/verify-otp", "vendor/reset-password",
            "getAllCategories", "getfoodbyid", "getFoodItems"
        ];

        if (!publicEndpoints.includes(endpoint)) {
            const token = localStorage.getItem("accessToken")?.replace(/"/g, "");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
        }
        return headers;
    },
});

const baseQueryWithAuthCheck = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401 || result?.error?.status === 403) {
        localStorage.removeItem("accessToken");
        toast.error("Session expired. Please sign in again.");
        window.location.href = "/roleselection";
    }
    return result;
};

export const baseApi = createApi({
    baseQuery: baseQueryWithAuthCheck,
    endpoints: () => ({}), // endpoints will be injected per domain
});
