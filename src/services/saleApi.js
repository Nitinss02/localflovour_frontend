import { baseApi } from "./baseApi";

export const saleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDailyReport: builder.query({
            query: ({ start, end }) =>
                `/api/v1/vendor/sale-report/daily?start=${start}&end=${end}`,
        }),
        getTodayReport: builder.query({
            query: () => `/api/v1/vendor/sale-report/today`,
        }),
        getOrderStatusCounts: builder.query({
            query: ({ start, end }) =>
                `/api/v1/vendor/sale-report/orders/status?start=${start}&end=${end}`,
        }),
        getTotalRevenue: builder.query({
            query: ({ start, end }) =>
                `/api/v1/vendor/sale-report/revenue/total?start=${start}&end=${end}`,
        }),
        getTopProducts: builder.query({
            query: ({ start, end, top = 10 }) => `/api/v1/vendor/sale-report/products/top?start=${start}&end=${end}&top=${top}`,
        }),
    }),
});

export const {
    useGetDailyReportQuery,
    useGetTodayReportQuery,
    useGetOrderStatusCountsQuery,
    useGetTotalRevenueQuery,
    useGetTopProductsQuery,
} = saleApi;