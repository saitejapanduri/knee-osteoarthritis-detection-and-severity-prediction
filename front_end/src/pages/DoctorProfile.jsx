import { useState } from "react";

function DoctorProfile() {
    const [id, setId] = useState("");

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        age: "",
        gender: "",
        phone: ""
    });

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const getProfile = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/doctor/profile/${id}`
            );

            const data = await response.json();
            setProfile(data);
        } catch {
            alert("Unable to load profile");
        }
    };

    const updateProfile = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:5000/doctor/updateprofile/${id}`,
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
        } catch {
            alert("Unable to connect to server");
        }
    };

    return (
        <div className="profile-page">
            <h2>Doctor Profile</h2>

            <input
                placeholder="Enter Doctor ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />

            <button onClick={getProfile}>Load Profile</button>

            <form onSubmit={updateProfile}>
                <input name="name" value={profile.name || ""} onChange={handleChange} placeholder="Name" />
                <input name="email" value={profile.email || ""} onChange={handleChange} placeholder="Email" />
                <input name="age" type="number" value={profile.age || ""} onChange={handleChange} placeholder="Age" />
                <input name="gender" value={profile.gender || ""} onChange={handleChange} placeholder="Gender" />
                <input name="phone" value={profile.phone || ""} onChange={handleChange} placeholder="Phone" />

                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

export default DoctorProfile;