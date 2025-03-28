import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Welcome to Product Store</h1>
            <Link to="/products">View Products</Link>
        </div>
    );
};

export default Home;
