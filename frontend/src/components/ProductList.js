import React, { useEffect, useState } from "react";
import { getProducts } from "../api";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.prodId}>
                        <Link to={`/products/${product.prodId}`}>{product.name} - ${product.price}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/add-product">Add Product</Link>
        </div>
    );
};

export default ProductList;
