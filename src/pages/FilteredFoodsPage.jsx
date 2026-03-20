import React, { useState, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import FoodCards from "../components/FoodCard";
import { useFilterFoodsQuery, useSearchFoodByNameQuery } from "../services/foodApi";
import Categoriesbackroundimage from "../assets/Categoriesbackroundimage.png";
import { motion } from "framer-motion";

const FilteredFoodsPage = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(0);

    // Get filter parameters from URL
    const filterType = searchParams.get('type'); // 'category', 'region', 'search'
    const filterValue = searchParams.get('value');
    const pageTitle = searchParams.get('title') || filterValue || 'Filtered Foods';

    // Build filter params based on type
    const filterParams = useMemo(() => {
        const params = {
            page: currentPage,
            size: 12,
            sortBy: 'name',
            sortDirection: 'asc'
        };
        if (filterType === 'category') params.categoryName = filterValue;
        else if (filterType === 'region') params.nameKeyword = filterValue;
        return params;
    }, [filterType, filterValue, currentPage]);

    // Build search params if filterType is 'search'
    const searchParamsMemo = useMemo(() => ({
        keyword: filterValue,
        page: currentPage,
        size: 12
    }), [filterValue, currentPage]);

    // Decide which query to use
    const shouldUseFilter = filterType === 'category' || filterType === 'region';
    const shouldUseSearch = filterType === 'search';

    const filteredQuery = useFilterFoodsQuery(filterParams, {
        skip: !shouldUseFilter || !filterValue,
        refetchOnMountOrArgChange: true
    });

    const searchQuery = useSearchFoodByNameQuery(searchParamsMemo, {
        skip: !shouldUseSearch || !filterValue,
        refetchOnMountOrArgChange: true
    });

    // Combine data
    const data = shouldUseFilter ? filteredQuery.data : searchQuery.data;
    const isLoading = shouldUseFilter ? filteredQuery.isLoading : searchQuery.isLoading;
    const isError = shouldUseFilter ? filteredQuery.isError : searchQuery.isError;
    const error = shouldUseFilter ? filteredQuery.error : searchQuery.error;

    const foodItems = data?.data?.foods || [];
    const totalPages = data?.data?.totalPages || 0;
    const currentPageNum = data?.data?.currentPage || 0;
    const totalItems = data?.data?.totalItems || 0;

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
            window.scrollTo(0, 0);
        }
    };

    if (isLoading) {
        return (
            <section className="bg-gradient-to-b from-white to-purple-50 min-h-screen">
                <div className="text-center flex flex-col items-center">
                    <div className="loader"></div>
                </div>
            </section>
        );
    }


    if (isError) {
        return (
            <section className="bg-gradient-to-b from-white to-purple-50 min-h-screen">
                <div
                    className="min-h-screen bg-fixed bg-cover bg-right"
                    style={{ backgroundImage: `url(${Categoriesbackroundimage})` }}
                >
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <p className="text-red-600 font-medium text-lg mb-2">
                            Failed to load foods
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                            {error?.error || error?.data?.message || 'Something went wrong'}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-5 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-gradient-to-b from-white to-purple-50 min-h-screen">
            <div
                className="min-h-screen bg-fixed bg-cover bg-right"
                style={{ backgroundImage: `url(${Categoriesbackroundimage})` }}
            >
                <motion.div
                    className="container mx-auto px-4 py-8"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-purple-800 mb-2">
                            {pageTitle}
                        </h1>
                        <p className="text-gray-600">
                            {filterType === 'category' && `Explore delicious ${filterValue} items`}
                            {filterType === 'region' && `Authentic flavors from ${filterValue}`}
                            {filterType === 'search' && `Search results for "${filterValue}"`}
                        </p>
                        <p className="text-sm text-purple-600 mt-2">
                            {totalItems} items found
                        </p>
                    </div>

                    {/* Food Items */}
                    <FoodCards foodItems={foodItems} />

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <motion.div
                            className="flex justify-center mt-12 space-x-2"
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                        >
                            <button
                                onClick={() => handlePageChange(currentPageNum - 1)}
                                disabled={currentPageNum === 0}
                                className="px-4 py-2 bg-white text-purple-700 border border-purple-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-50 transition"
                            >
                                Previous
                            </button>

                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                const pageNum = i + Math.max(0, currentPageNum - 2);
                                if (pageNum >= totalPages) return null;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`px-4 py-2 rounded-lg transition ${currentPageNum === pageNum
                                            ? "bg-purple-700 text-white"
                                            : "bg-white text-purple-700 border border-purple-600 hover:bg-purple-50"
                                            }`}
                                    >
                                        {pageNum + 1}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => handlePageChange(currentPageNum + 1)}
                                disabled={currentPageNum >= totalPages - 1}
                                className="px-4 py-2 bg-white text-purple-700 border border-purple-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-50 transition"
                            >
                                Next
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default FilteredFoodsPage;
