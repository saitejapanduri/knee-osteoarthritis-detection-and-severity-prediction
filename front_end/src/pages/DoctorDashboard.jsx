import { Link } from "react-router-dom";

function DoctorDashboard() {
    return (
        <div className="dashboard">
            <h1>Doctor Dashboard</h1>
            <p>Welcome to the KneeCare AI doctor portal.</p>

            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h3>My Profile</h3>
                    <p>View and update your doctor profile.</p>
                    <Link to="/doctor/profile">View Profile</Link>
                </div>

                <div className="dashboard-card">
                    <h3>Patient Queries</h3>
                    <p>View patient queries and provide replies.</p>
                    <Link to="/doctor/queries">Manage Queries</Link>
                </div>

                <div className="dashboard-card">
                    <h3>Patient Knee Data</h3>
                    <p>Manage patient knee examination records.</p>
                    <Link to="/doctor/knee-data">Manage Knee Data</Link>
                </div>
            </div>
        </div>
    );
}

export default DoctorDashboard;