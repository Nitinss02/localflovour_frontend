import { baseApi } from "./baseApi";

export const foodApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getfoodbyid: builder.query({
            query: (id) => `/api/v1/foods/${id}`,
        }),
        getAllFoods: builder.query({
            query: () => "/api/v1/foods/all",
        }),

        getFoodWithPagination: builder.query({
            query: ({ page, size }) => `/api/v1/foods?page=${page}&size=${size}`,
        }),

        searchFoodByName: builder.query({
            query: ({ keyword, page = 0, size = 10, sortBy = 'name', sortDirection = 'asc' }) => 
                `/api/v1/foods/search?keyword=${keyword}&page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`,
        }),

        filterFoods: builder.query({
            query: (params) => {
                const {
                    categoryId,
                    categoryName,
                    nameKeyword,
                    minPrice,
                    maxPrice,
                    isAvailable,
                    rating,
                    minDiscount,
                    maxDiscount,
                    sortBy = 'name',
                    sortDirection = 'asc',
                    page = 0,
                    size = 10
                } = params || {};
                
                const queryParams = new URLSearchParams();
                if (categoryId) queryParams.append('categoryId', categoryId);
                if (categoryName) queryParams.append('categoryName', categoryName);
                if (nameKeyword) queryParams.append('nameKeyword', nameKeyword);
                if (minPrice) queryParams.append('minPrice', minPrice);
                if (maxPrice) queryParams.append('maxPrice', maxPrice);
                if (isAvailable !== undefined) queryParams.append('isAvailable', isAvailable);
                if (rating) queryParams.append('rating', rating);
                if (minDiscount) queryParams.append('minDiscount', minDiscount);
                if (maxDiscount) queryParams.append('maxDiscount', maxDiscount);
                queryParams.append('sortBy', sortBy);
                queryParams.append('sortDirection', sortDirection);
                queryParams.append('page', page);
                queryParams.append('size', size);
                
                return `/api/v1/foods/filters?${queryParams.toString()}`;
            }
        }),

        // vendor food management
        getVendorFoodItems: builder.query({
            query: () => "/api/v1/vendor/food/own",
            providesTags: ["Food"],
        }),

        postfood: builder.mutation({
            query: (foodData) => ({
                url: "/api/v1/vendor/food",
                method: "POST",
                body: foodData,
            }),
            invalidatesTags: ["Food"],
        }),

        putfood: builder.mutation({
            query: ({ id, patchData }) => ({
                url: `/api/v1/vendor/food/${id}`,
                method: "PATCH",
                body: patchData,
            }),
            invalidatesTags: ["Food"],
        }),

        deletefood: builder.mutation({
            query: (foodId) => ({
                url: `/api/v1/vendor/food/${foodId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Food"],
        }),
    }),
});

export const {
    useGetVendorFoodItemsQuery,
    useGetAllFoodsQuery,
    useFilterFoodsQuery,
    useGetFoodWithPaginationQuery,
    useSearchFoodByNameQuery,
    useGetfoodbyidQuery,
    usePostfoodMutation,
    usePutfoodMutation,
    useDeletefoodMutation,
} = foodApi;
