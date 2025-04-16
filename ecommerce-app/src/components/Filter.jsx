import React from "react";

export default function Filter({
  categories,
  selectedCategory,
  onCategoryChange,
  sort,
  onSortChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  minRating,
  onMinRatingChange,
  onClearFilters,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center mb-6 justify-center  ">
      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border p-2 rounded-lg"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Price Range Filter */}
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => onMinPriceChange(e.target.value)}
        className="border p-2 rounded-lg w-28 mx-auto sm:mx-0"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => onMaxPriceChange(e.target.value)}
        className="border p-2 rounded-lg w-28 mx-auto sm:mx-0 "
      />

      {/* Rating Filter */}
      <select
        value={minRating}
        onChange={(e) => onMinRatingChange(e.target.value)}
        className="border p-2 rounded-lg"
      >
        <option value="">Min Rating</option>
        {[1, 2, 3, 4, 5].map((rate) => (
          <option key={rate} value={rate}>
            {rate}+
          </option>
        ))}
      </select>

      {/* Sort Options */}
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="border p-2 rounded-lg"
      >
        <option value="">Sort</option>
        <option value="asc">Price: Low → High</option>
        <option value="desc">Price: High → Low</option>
        <option value="az">Title: A → Z</option>
        <option value="za">Title: Z → A</option>
      </select>
       {/* Clear Filters Button */}
       <button
        onClick={onClearFilters}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
      >
        Clear Filters
      </button>
    </div>
  );
}
