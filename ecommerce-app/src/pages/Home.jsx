import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const [sort, setSort] = useState(""); // State for sorting order
  const [searchText, setSearchText] = useState(""); // State for search input

  useEffect(() => {
    // Fetch products from API
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);

        // Extract unique categories from the products
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories); // Update categories list
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handler functions to update state
  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // Update selected category
  };

  const handleSortChange = (sortOption) => {
    setSort(sortOption); // Update sorting option (asc/desc)
  };

  // Filter and sort the products based on selected options
  const filteredProducts = products
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      return 0;
    });

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

      {/* Pass the props to the Filter component */}
      <Filter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        sort={sort}
        onSortChange={handleSortChange}
      />

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No products found.
          </p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
