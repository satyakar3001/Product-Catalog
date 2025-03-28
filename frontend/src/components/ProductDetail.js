import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams(); // ✅ Extract ID from URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || isNaN(id)) {
      setError("Invalid product ID.");
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${id}/`);
        setProduct(response.data);
      } catch (err) {
        setError("Error fetching product details.");
        console.error("Error fetching product details:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-blue-600 font-semibold">Price: ${product.price}</p>
    </div>
  );
}
