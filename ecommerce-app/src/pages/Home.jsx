import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";

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

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

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
      minPrice ? product.price >= parseFloat(minPrice) : true
    )
    .filter((product) =>
      maxPrice ? product.price <= parseFloat(maxPrice) : true
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
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-400 ">
        🛍️ Shop Our Products
      </h1>

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
        {filteredProducts.length === 0 ? (
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
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
