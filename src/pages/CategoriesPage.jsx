import React, { useState, useEffect } from "react";
import FoodCards from "../components/FoodCard";
import Categoriesbackground from "../assets/CategoriesbackroundImage.png";
import { useGetAllCategoriesQuery } from "../services/categoryApi";


const CategoriesPage = () => {
    const {
        data: categories,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch,
    } = useGetAllCategoriesQuery();

    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        if (categories?.length > 0 && !activeCategory) {
            setActiveCategory(categories[0].name);
        }
    }, [categories, activeCategory]);

    let content;
    let activeCategoryData = null;


    if (isLoading) {
        content = (
            <div className="flex flex-col justify-center items-center py-20 w-full">
                <div className="loader"></div>
            </div>
        );
    }




    else if (isError) {
        content = (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-red-600 font-medium text-lg">
                    Failed to load categories
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    {error?.error || JSON.stringify(error?.data?.message)}
                </p>
                <button
                    onClick={() => refetch()}
                    className="mt-4 px-5 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
                >
                    Retry
                </button>
            </div>
        );
    }


    else if (isSuccess && categories?.length > 0) {
        activeCategoryData = categories.find((cat) => cat.name === activeCategory);

        content = (
            <>

                <div className="flex flex-wrap justify-center gap-3 my-8">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.name)}
                            className={`px-6 py-2 text-sm font-semibold rounded-full border transition-all duration-300 ${activeCategory === cat.name
                                ? "bg-purple-700 text-white shadow-lg scale-105"
                                : "bg-white text-purple-700 border-purple-600 hover:bg-purple-50"
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>


            </>
        );
    }


    else if (isSuccess && categories?.length === 0) {
        content = (
            <div className="text-center py-16 text-gray-500 text-lg">
                No categories found.
            </div>
        );
    }

    return (
        <section className=" bg-gradient-to-b from-white to-purple-50 min-h-screen">
            <div
                className="min-h-screen bg-fixed bg-cover bg-right text-white"
                style={{
                    backgroundImage: `url(${Categoriesbackground})`
                }}
            >
                <div className="mx-auto">
                    <h2 className="text-3xl pt-6 flex justify-center font-bold text-purple-800 mb-8 text-center md:text-left">
                        Top Selling Products
                    </h2>


                    {content}


                    <div className="mt-12">
                        <FoodCards foodItems={activeCategoryData?.foodItems || []} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoriesPage;