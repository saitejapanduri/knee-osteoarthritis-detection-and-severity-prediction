import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [role, setRole] = useState("patient");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:5000/${role}/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                }
            );

            const data = await response.text();

            if (response.ok && data.includes("login success")) {
                alert(data);
                navigate(`/${role}/dashboard`);
            } else {
                alert(data);
            }

        } catch (error) {
            alert("Unable to connect to server");
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleLogin}>
                <h2>Welcome Back</h2>
                <p>Login to your KneeCare AI account</p>

                <label>Select Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                </select> <br />

                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /> <br />

                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /> <br /> <br />

                <button type="submit">Login</button>

                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;