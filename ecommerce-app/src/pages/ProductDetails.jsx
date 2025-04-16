import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  return <div className="p-4">Product Details for ID: {id}</div>;
};

export default ProductDetail;
