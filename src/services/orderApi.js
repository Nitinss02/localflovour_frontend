import { baseApi } from "./baseApi";

export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        placeOrder: builder.mutation({
            query: (addressId) => ({
                url: `/api/v1/orders/place/${addressId}`,
                method: "POST",
            }),
            invalidatesTags: ["Cart"],
        }),
        getOrders: builder.query({
            query: () => ({
                url: "/api/v1/orders",
                method: "GET",
            }),
        }),

        getVendorOrders: builder.query({
            query: () => ({
                url: "/api/vendor/orders/my-orders",
                method: "GET",
            }),
        }),
        updateOrderStatus: builder.mutation({
            query: ({ orderId, status }) => ({
                url: `/api/vendor/orders/update-status/${orderId}`,
                method: "PATCH",
                body: { status },
            }),
        }),
    }),
});

export const {
    usePlaceOrderMutation,
    useGetVendorOrdersQuery,
    useUpdateOrderStatusMutation,
    useGetOrdersQuery,
} = orderApi;
