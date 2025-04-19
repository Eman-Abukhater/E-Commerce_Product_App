import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
function ProductDetails() {
  // Fetch product details using the id
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);


  // fetching product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!product) return <p className="text-center py-10">Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded my-10">
    {/* Product Info */}
    <div className="flex flex-col md:flex-row gap-6">
      <img
        src={product.image}
        alt={product.title}
        className="h-64 w-64 object-contain mx-auto"
      />
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-lg text-indigo-500 font-semibold">
          ${product.price}
        </p>
        <p className="text-sm text-gray-600 mb-4 capitalize">
          {product.category}
        </p>
        <p className="mb-4">{product.description}</p>
        <p className="text-yellow-500 mb-4">
          ⭐ {product.rating?.rate} ({product.rating?.count})
        </p>

        {/* Add to Cart Button */}
        <button
          className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 transition"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>

        {/* Back Link */}
        <div className="mt-4">
          <Link
            to="/"
            className="text-indigo-500 underline hover:text-indigo-700"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ProductDetails;
