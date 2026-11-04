import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="header-logo">
                <Link to="/">
                    <h2>KneeCare AI</h2>
                </Link>
            </div>

            <nav>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
    );
}

export default Header;