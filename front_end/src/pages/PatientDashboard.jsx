
import { Link } from "react-router-dom";
import "./PatientDashboard.css";

function PatientDashboard() {
    return (
        <div className="patient-dashboard">

            <div className="patient-dashboard-welcome">
                <h1>Patient Dashboard</h1>
                <p>
                    Welcome to KneeCare AI.
                    Monitor your knee health and manage your information.
                </p>
            </div>

            <div className="patient-dashboard-cards">

                <div className="patient-dashboard-card">
                    <div className="patient-card-icon">👤</div>

                    <h3>My Profile</h3>

                    <p>
                        View and update your personal information
                        and contact details.
                    </p>

                    <Link to="/patient/profile">
                        View Profile →
                    </Link>
                </div>

                <div className="patient-dashboard-card">
                    <div className="patient-card-icon">🦵</div>

                    <h3>Osteoarthritis Prediction</h3>

                    <p>
                        Upload your knee X-ray image and
                        check the predicted osteoarthritis severity.
                    </p>

                    <Link to="/patient/predict">
                        Start Prediction →
                    </Link>
                </div>

                <div className="patient-dashboard-card">
                    <div className="patient-card-icon">📊</div>

                    <h3>Prediction History</h3>

                    <p>
                        View your previous knee examination
                        and prediction results.
                    </p>

                    <Link to="/patient/history">
                        View History →
                    </Link>
                </div>

                <div className="patient-dashboard-card">
                    <div className="patient-card-icon">💬</div>

                    <h3>My Queries</h3>

                    <p>
                        Submit questions about your knee health
                        and read replies from your doctor.
                    </p>

                    <Link to="/patient/queries">
                        Manage Queries →
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default PatientDashboard;
