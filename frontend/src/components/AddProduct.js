import React, { useState } from "react";
import { addProduct } from "../api/api";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [available, setAvailable] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = { name, price, description, available };

        addProduct(newProduct)
            .then(() => {
                alert("Product Added Successfully!");
                navigate("/products");
            })
            .catch((error) => console.error("Error adding product:", error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Product</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <label>
                Available:
                <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
            </label>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;
