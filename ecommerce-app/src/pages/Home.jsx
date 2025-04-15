import React, { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.image} className="w-30 h-auto" alt={product.title} />
          <h2>{product.title}</h2>
          <p>${product.price}</p>
          <p>{product.category}</p>
        </div>
      ))}
    </div>
  );
}
