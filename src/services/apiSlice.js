// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { toast } from "react-toastify";

// //Base query with Authorization header
// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:8080",
//   prepareHeaders: (headers, { endpoint }) => {
//     const publicEndpoints = ["sendOtp", "verifyOtp", "registerUser", "resetPassword", "login"];

//     if (!publicEndpoints.includes(endpoint)) {
//       const token = localStorage.getItem("accessToken")?.replace(/"/g, "");
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//     }
//     return headers;
//   },
// });

// //Add a wrapper to check for expired/invalid tokens globally
// const baseQueryWithAuthCheck = async (args, api, extraOptions) => {
//   const result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 401 || result?.error?.status === 403) {
//     // Token expired or invalid
//     localStorage.removeItem("accessToken");
//     toast.error("Session expired. Please sign in again.");

//     // Redirect user to login page
//     window.location.href = "/roleselection";
//   }

//   return result;
// };

// //Use the new baseQueryWithAuthCheck in createApi
// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: baseQueryWithAuthCheck,

//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (credentials) => ({
//         url: "/jwt/login",
//         method: "POST",
//         body: credentials,
//         responseHandler: (response) => response.text(),
//       }),
//       async onQueryStarted(arg, { queryFulfilled }) {
//         try {
//           const { data } = await queryFulfilled;
//           console.log("Login response token:", data);
//           if (data) {
//             localStorage.setItem("accessToken", data);
//           }
//         } catch (err) {
//           console.error("Login error:", err);
//         }
//       },
//     }),

//     registerUser: builder.mutation({
//       query: (userData) => ({
//         url: "/account/register",
//         method: "POST",
//         body: userData,
//       }),
//     }),

//     sendOtp: builder.mutation({
//       query: (requestData) => ({
//         url: "/account/send-otp",
//         method: "POST",
//         body: requestData,
//       }),
//     }),

//     verifyOtp: builder.mutation({
//       query: (otpData) => ({
//         url: "/account/verify-otp",
//         method: "POST",
//         body: otpData,
//       }),
//     }),

//     resetPassword: builder.mutation({
//       query: (passwordData) => ({
//         url: "/account/reset-password",
//         method: "POST",
//         body: passwordData,
//       }),
//     }),

//     getUserProfile: builder.query({
//       query: () => ({
//         url: "/profile/get-profile",
//         method: "GET",
//       }),
//     }),

//     editUserProfile: builder.mutation({
//       query: (body) => ({
//         url: "/profile/edit-profile",
//         method: "PATCH",
//         body,
//       }),
//     }),


//     getfoodbyid: builder.query({
//       query: (id) => `/api/v1/foods/${id}`,
//     }),


//     // cart endpoints
//     addToCart: builder.mutation({
//       query: ({ foodId, quantity = 1 }) => ({
//         url: `/api/v1/cart/${foodId}?quantity=${quantity}`,
//         method: "POST",
//         body: { foodId, quantity },
//       }),
//       invalidatesTags: ["Cart"],
//     }),

//     getCart: builder.query({
//       query: () => ({
//         url: "/api/v1/cart",
//         method: "GET",
//       }),
//       providesTags: ["Cart"],
//     }),

//     deleteCartItem: builder.mutation({
//       query: ({ foodItemId }) => ({
//         url: `/api/v1/cart/${foodItemId}`,
//         method: "DELETE",
//         body: { foodItemId },
//       }),
//       invalidatesTags: ["Cart"],
//     }),

//     // place oreder 

//     placeOrder: builder.mutation({
//       query: (orderData) => ({
//         url: "/api/v1/orders/place",
//         method: "POST",
//         body: orderData,
//       }),
//       invalidatesTags: ["Cart"],
//     }),

//     //wishlist endpoints

//     getWishlist: builder.query({
//       query: () => ({
//         url: "/api/v1/wishlist",
//         method: "GET",
//       }),
//       providesTags: ["Wishlist"],
//     }),

//     addToWishlist: builder.mutation({
//       query: ({ foodItemId }) => ({
//         url: "/api/v1/wishlist",
//         method: "POST",
//         body: { foodItemId },
//         headers: { "Content-Type": "application/json" },
//       }),
//       invalidatesTags: ["Wishlist"],
//     }),

//     removeFromWishlist: builder.mutation({
//       query: (foodItemId) => ({
//         url: `/api/v1/wishlist/${foodItemId}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Wishlist"],
//     }),


//     getAllCategories: builder.query({
//       query: () => "/api/v1/categories",
//       transformResponse: (response) => {
//         if (Array.isArray(response)) return response;
//         if (Array.isArray(response?.data)) return response.data;
//         if (Array.isArray(response?.categories)) return response.categories;
//         if (Array.isArray(response?.content)) return response.content;
//         if (
//           response &&
//           typeof response === "object" &&
//           response.id &&
//           response.name
//         )
//           return [response];
//         return [];
//       },
//       keepUnusedDataFor: 60,
//     }),

//     // vendor specific endpoints can be added here

//     postfood: builder.mutation({
//       query: (foodData) => ({
//         url: "/api/v1/vendor/food",
//         method: "POST",
//         body: foodData,
//       }),
//       invalidatesTags: ["Food"],
//     }),

//     putfood: builder.mutation({
//       query: ({ id, patchData }) => ({
//         url: `/api/v1/vendor/food/${id}`,
//         method: "PATCH",
//         body: patchData,
//       }),
//       invalidatesTags: ["Food"],
//     }),


//     deletefood: builder.mutation({
//       query: (foodId) => ({
//         url: `/api/v1/vendor/food/${foodId}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Food"],
//     }),

//     getFoodItems: builder.query({
//       query: () => "/api/v1/vendor/food",
//     }),
//     providesTags: ["Food"],
//   }),
// });

// export const {
//   useLoginMutation,
//   useRegisterUserMutation,
//   useSendOtpMutation,
//   useVerifyOtpMutation,
//   useResetPasswordMutation,
//   useGetUserProfileQuery,
//   useEditUserProfileMutation,
//   useGetAllCategoriesQuery,
//   usePostfoodMutation,
//   usePutfoodMutation,
//   useGetfoodbyidQuery,
//   useAddToCartMutation,
//   useLazyGetCartQuery,
//   useDeleteCartItemMutation,
//   usePlaceOrderMutation,
//   useGetWishlistQuery,
//   useAddToWishlistMutation,
//   useRemoveFromWishlistMutation,
//   useGetFoodItemsQuery,
//   useDeletefoodMutation,
// } = apiSlice;
