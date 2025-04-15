import React, { useState } from 'react'

export default function Home() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching products:', error));
    }, [])


  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
    {products.map((product) => (
      <div key={product.id} className="border p-4 rounded shadow">
        <img src={product.image} className="h-40 object-contain mx-auto" alt={product.title} />
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p>${product.price}</p>
        <p className="text-sm text-gray-500">{product.category}</p>
      </div>
    ))}
  </div>  )
}
