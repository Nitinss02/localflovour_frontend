import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: () => "/profile/get-profile",
        }),
        getUserProfileById: builder.query({
            query: (userId) => `/profile/${userId}`,
        }),
        editUserProfile: builder.mutation({
            query: (body) => ({
                url: "/profile/edit-profile",
                method: "PATCH",
                body,
            }),
        }),
        getAllAddresses: builder.query({
            query: () => "/api/v1/address",
            providesTags: ["Address"],
        }),
        addAddress: builder.mutation({
            query: (body) => ({
                url: "/api/v1/address",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Address"],
        }),
        editAddress: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/api/v1/address/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Address"],
        }),
        deleteAddress: builder.mutation({
            query: (id) => ({
                url: `/api/v1/address/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Address"],
        }),
        getAddressById: builder.query({
            query: (id) => `/api/v1/address/${id}`,
            providesTags: ["Address"],
        }),

    }),
});

export const {
    useGetUserProfileQuery,
    useGetUserProfileByIdQuery,
    useEditUserProfileMutation,
    useGetAllAddressesQuery,
    useAddAddressMutation,
    useEditAddressMutation,
    useDeleteAddressMutation,
    useGetAddressByIdQuery,
} = userApi;
