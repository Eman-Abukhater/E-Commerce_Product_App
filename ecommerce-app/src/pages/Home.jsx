import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";  // Import the Filter component

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");  // State for selected category
  const [sort, setSort] = useState("");  // State for sorting order

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
        setCategories(uniqueCategories);  // Update categories list
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handler functions to update state
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);  // Update selected category
  };

  const handleSortChange = (sortOption) => {
    setSort(sortOption);  // Update sorting option (asc/desc)
  };

  // Filter and sort the products based on selected options
  const filteredProducts = products
    .filter((product) => {
      return (
        (selectedCategory === "" || product.category === selectedCategory) // Filter by category
      );
    })
    .sort((a, b) => {
      if (sort === "asc") return a.price - b.price;  // Sort by price (Low → High)
      if (sort === "desc") return b.price - a.price;  // Sort by price (High → Low)
      return 0;  // No sorting
    });

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-400 ">
        🛍️ Shop Our Products
      </h1>

      {/* Pass the props to the Filter component */}
      <Filter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        sort={sort}
        onSortChange={handleSortChange}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-400"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-48 object-contain w-full mb-4"
            />
            <h2 className="text-md font-semibold line-clamp-2 mb-2">{product.title}</h2>
            <p className="text-indigo-500 font-bold text-lg">${product.price}</p>
            <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              ⭐ {product.rating.rate} ({product.rating.count})
            </div>
            <button className="mt-4 w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
