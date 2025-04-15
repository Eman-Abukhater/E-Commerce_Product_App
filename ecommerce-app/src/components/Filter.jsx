import React from "react";

export default function Filter({ categories, selectedCategory, onCategoryChange, sort, onSortChange }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
      {/* Filter by Category */}
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Sort by Price */}
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Sort by Price</option>
        <option value="asc">Low → High</option>
        <option value="desc">High → Low</option>
      </select>
    </div>
  );
}