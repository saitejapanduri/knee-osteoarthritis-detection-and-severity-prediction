
import { Link } from "react-router-dom";
import "./DoctorDashboard.css";

function DoctorDashboard() {
    return (
        <div className="doctor-dashboard">

            <div className="dashboard-welcome">
                <h1>Doctor Dashboard</h1>
                <p>
                    Welcome to your KneeCare AI doctor portal.
                    Manage patient information and consultations.
                </p>
            </div>

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <div className="card-icon">👨‍⚕️</div>

                    <h3>My Profile</h3>

                    <p>
                        View and update your personal information
                        and professional profile.
                    </p>

                    <Link to="/doctor/profile">
                        View Profile →
                    </Link>
                </div>

                <div className="dashboard-card">
                    <div className="card-icon">💬</div>

                    <h3>Patient Queries</h3>

                    <p>
                        View patient questions, check their
                        problems and provide replies.
                    </p>

                    <Link to="/doctor/queries">
                        Manage Queries →
                    </Link>
                </div>

                <div className="dashboard-card">
                    <div className="card-icon">🦵</div>

                    <h3>Patient Knee Data</h3>

                    <p>
                        Add, view, update and manage
                        patient knee examination records.
                    </p>

                    <Link to="/doctor/knee">
                        Manage Knee Data →
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default DoctorDashboard;
