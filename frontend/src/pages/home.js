import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h2>Welcome to Product Store</h2>
            <p>Please login or register to continue</p>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/register"><button>Register</button></Link>
        </div>
    );
}

export default Home;
