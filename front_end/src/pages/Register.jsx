import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [role, setRole] = useState("patient");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        phone: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:5000/${role}/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...formData,
                        age: Number(formData.age)
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful");
                navigate("/login");
            } else {
                alert(data.message || "Registration failed");
            }

        } catch (error) {
            alert("Unable to connect to server");
        }
    };

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleRegister}>
                <h2>Create Account</h2>
                <p>Register for KneeCare AI</p>

                <label>Register As</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                </select> <br />

                <label>Full Name</label>
                <input
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                /> <br />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                /> <br/>
                
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                /> <br />

                <label>Age</label>
                <input
                    type="number"
                    name="age"
                    placeholder="Enter age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                /> <br />

                <label>Gender</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select> <br />

                <label>Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                /> <br/>

                <button type="submit">Register</button>

                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;