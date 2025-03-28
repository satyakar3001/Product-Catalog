import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // ✅ Removed Router
import { loginUser, registerUser } from "./api/api";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password);
      localStorage.setItem("accessToken", response.access);
      navigate("/products");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const handleRegister = async () => {
    try {
      await registerUser(username, password);
      alert("Registration successful! Please login.");
    } catch (error) {
      alert("Registration failed.");
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-xl font-bold mb-4">Login / Register</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 mb-2 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 mb-2 rounded"
            />
            <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
              Login
            </button>
            <button onClick={handleRegister} className="bg-gray-500 text-white px-4 py-2 mt-2 rounded">
              Register
            </button>
          </div>
        }
      />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
    </Routes>
  );
}
