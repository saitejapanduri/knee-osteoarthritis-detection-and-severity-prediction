import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        alert("Logged out successfully");
        navigate("/login");
    };

    return (
        <header className="header">
            <div className="header-logo">
                <Link to={user ? `/${user.role}/dashboard` : "/"}>
                    <h2>KneeCare AI</h2>
                </Link>
            </div>

            <nav>
                {user ? (
                    <>
                        <Link to={`/${user.role}/dashboard`}>Dashboard</Link>

                        {user.role === "patient" && (
                            <>
                                <Link to="/patient/profile">My Profile</Link>
                                <Link to="/patient/predict">Predict</Link>
                                <Link to="/patient/history">History</Link>
                                <Link to="/patient/queries">My Queries</Link>
                            </>
                        )}

                        {user.role === "doctor" && (
                            <>
                                <Link to="/doctor/profile">My Profile</Link>
                                <Link to="/doctor/queries">Patient Queries</Link>
                            </>
                        )}

                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;