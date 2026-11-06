import { useState, useEffect } from "react";
import "./Profile.css";

function DoctorProfile() {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        age: "",
        gender: "",
        phone: ""
    });

    const getProfile = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/doctor/profile/${user._id}`
            );

            const data = await response.json();

            if (response.ok) {
                setProfile(data);
            } else {
                alert("Unable to load profile");
            }
        } catch (error) {
            alert("Unable to load profile");
        }
    };

    useEffect(() => {
        if (user?._id) {
            getProfile();
        }
    }, []);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const updateProfile = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:5000/doctor/updateprofile/${user._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(profile)
                }
            );

            const data = await response.json();

            if (response.ok) {
                setProfile(data);
                alert("Profile updated successfully");
            } else {
                alert("Profile update failed");
            }
        } catch (error) {
            alert("Unable to connect to server");
        }
    };

    if (!user?._id) {
        return <p>Please login again.</p>;
    }

    return (
        <div className="profile-page">
            <div className="profile-container">

                <div className="profile-heading">
                    <div className="profile-avatar">D</div>
                    <h2>Doctor Profile</h2>
                    <p>Manage your personal information</p>
                </div>

                <form className="profile-form" onSubmit={updateProfile}>

                    <div className="profile-field">
                        <label>Full Name</label>
                        <input
                            name="name"
                            value={profile.name || ""}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="profile-field">
                        <label>Email Address</label>
                        <input
                            name="email"
                            type="email"
                            value={profile.email || ""}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="profile-field">
                        <label>Age</label>
                        <input
                            name="age"
                            type="number"
                            value={profile.age || ""}
                            onChange={handleChange}
                            placeholder="Enter your age"
                        />
                    </div>

                    <div className="profile-field">
                        <label>Gender</label>
                        <input
                            name="gender"
                            value={profile.gender || ""}
                            onChange={handleChange}
                            placeholder="Enter your gender"
                        />
                    </div>

                    <div className="profile-field">
                        <label>Phone Number</label>
                        <input
                            name="phone"
                            value={profile.phone || ""}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <button className="profile-button" type="submit">
                        Update Profile
                    </button>

                </form>
            </div>
        </div>
    );
}

export default DoctorProfile;