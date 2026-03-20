import { baseApi } from "./baseApi";

export const wishlistApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getWishlist: builder.query({
            query: () => "/api/v1/wishlist",
            providesTags: ["Wishlist"],
        }),

        addToWishlist: builder.mutation({
            query: ({ foodItemId }) => ({
                url: "/api/v1/wishlist",
                method: "POST",
                body: { foodItemId },
                headers: { "Content-Type": "application/json" },
            }),
            invalidatesTags: ["Wishlist"],
        }),

        removeFromWishlist: builder.mutation({
            query: (foodItemId) => ({
                url: `/api/v1/wishlist/${foodItemId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Wishlist"],
        }),
    }),
});

export const {
    useGetWishlistQuery,
    useAddToWishlistMutation,
    useRemoveFromWishlistMutation,
} = wishlistApi;
