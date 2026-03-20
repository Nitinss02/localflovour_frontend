import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/jwt/login",
                method: "POST",
                body: credentials,
                responseHandler: (response) => response.text(),
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) localStorage.setItem("accessToken", data);
                } catch (err) {
                    console.error("Login error:", err);
                }
            },
        }),

        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/account/register",
                method: "POST",
                body: userData,
            }),
        }),

        sendOtp: builder.mutation({
            query: (requestData) => ({
                url: "/account/send-otp",
                method: "POST",
                body: requestData,
            }),
        }),

        verifyOtp: builder.mutation({
            query: (otpData) => ({
                url: "/account/verify-otp",
                method: "POST",
                body: otpData,
            }),
        }),

        resetPassword: builder.mutation({
            query: (passwordData) => ({
                url: "/account/reset-password",
                method: "POST",
                body: passwordData,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterUserMutation,
    useSendOtpMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
} = authApi;
