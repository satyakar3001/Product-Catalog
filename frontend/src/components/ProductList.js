import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}> {/* ✅ FIXED: Added key prop */}
            <Link to={`/products/${product.id}`} className="text-blue-500">
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
