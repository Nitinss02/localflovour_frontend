import { baseApi } from "./baseApi";  

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => "/api/v1/categories",
            transformResponse: (response) => {
                if (Array.isArray(response)) return response;
                if (Array.isArray(response?.data)) return response.data;
                if (Array.isArray(response?.categories)) return response.categories;
                if (Array.isArray(response?.content)) return response.content;
                if (response && typeof response === "object" && response.id && response.name)
                    return [response];
                return [];
            },
            keepUnusedDataFor: 60,  
        }),
    }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
