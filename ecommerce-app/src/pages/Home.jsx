import React, { useContext, useEffect, useState } from "react";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DarkModeContext } from '../context/DarkModeContext'; // Import the context

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("");
  const [searchText, setSearchText] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false); //New loading state for pagination
  const { darkMode, setDarkMode } = useContext(DarkModeContext); // Access context directly

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handlePageChange = (page) => {
    setIsPageLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsPageLoading(false);
    }, 500); //  Simulate loading time (optional)
  };

  const handleCategoryChange = (category) => setSelectedCategory(category);
  const handleSortChange = (sortOption) => setSort(sortOption);
  const handleMinPriceChange = (price) => setMinPrice(price);
  const handleMaxPriceChange = (price) => setMaxPrice(price);
  const handleMinRatingChange = (rating) => setMinRating(rating);
  const handleClearFilters = () => {
    setSelectedCategory("");
    setSort("");
    setSearchText("");
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sort, searchText, minPrice, maxPrice, minRating]);

  const filteredProducts = products
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((product) =>
      minPrice !== "" && parseFloat(minPrice) >= 0
        ? product.price >= parseFloat(minPrice)
        : true
    )
    .filter((product) =>
      maxPrice !== "" && parseFloat(maxPrice) >= 0
        ? product.price <= parseFloat(maxPrice)
        : true
    )    
    .filter((product) =>
      minRating ? product.rating.rate >= parseFloat(minRating) : true
    )
    .sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "za") return b.title.localeCompare(a.title);
      return 0;
    });

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-400">
        🛍️ Shop Our Products
      </h1>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 my-3  float-end rounded bg-indigo-400 text-white dark:bg-yellow-400 dark:text-black"
      >
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full p-2 border rounded-lg mb-6"
      />

      {/* Filters */}
      <Filter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        sort={sort}
        onSortChange={handleSortChange}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={handleMinPriceChange}
        onMaxPriceChange={handleMaxPriceChange}
        minRating={minRating}
        onMinRatingChange={handleMinRatingChange}
        onClearFilters={handleClearFilters}
      />

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading || isPageLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <Skeleton height={200} />
              <Skeleton count={2} />
              <Skeleton width="60%" />
            </div>
          ))
        ) : filteredProducts.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No products found.
          </p>
        ) : (
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center mt-6 gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isPageLoading}
            className="px-3 py-1 rounded bg-indigo-500 text-white disabled:bg-gray-300"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              disabled={isPageLoading}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isPageLoading}
            className="px-3 py-1 rounded bg-indigo-500 text-white disabled:bg-gray-300"
          >
            Next
          </button>
        </div>

        <p className="text-gray-600">
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
}
