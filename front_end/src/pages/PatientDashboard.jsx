import { Link } from "react-router-dom";

function PatientDashboard() {
    return (
        <div className="dashboard">
            <h1>Patient Dashboard</h1>
            <p>Welcome to your KneeCare AI dashboard.</p>

            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h3>My Profile</h3>
                    <p>View and update your personal information.</p>
                    <Link to="/patient/profile">View Profile</Link>
                </div>

                <div className="dashboard-card">
                    <h3>Predict Severity</h3>
                    <p>Upload your knee X-ray for AI analysis.</p>
                    <Link to="/patient/predict">Start Prediction</Link>
                </div>

                <div className="dashboard-card">
                    <h3>Prediction History</h3>
                    <p>View your previous prediction results.</p>
                    <Link to="/patient/history">View History</Link>
                </div>

                <div className="dashboard-card">
                    <h3>My Queries</h3>
                    <p>Submit and manage your doctor queries.</p>
                    <Link to="/patient/queries">Manage Queries</Link>
                </div>
            </div>
        </div>
    );
}

export default PatientDashboard;