import { baseApi } from "./baseApi";

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getCart: builder.query({
            query: () => "/api/v1/cart",
            providesTags: ["Cart"],
        }),

        addToCart: builder.mutation({
            query: ({ foodId, quantity = 1 }) => ({
                url: `/api/v1/cart/${foodId}?quantity=${quantity}`,
                method: "POST",
                body: { foodId, quantity },
            }),
            invalidatesTags: ["Cart"],
        }),

        deleteCartItem: builder.mutation({
            query: ({ foodItemId }) => ({
                url: `/api/v1/cart/${foodItemId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useDeleteCartItemMutation,
} = cartApi;
