import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page">

            <section className="hero">
                <div className="hero-content">
                    <h1>AI-Powered Knee Osteoarthritis Detection</h1>

                    <p>
                        Detect and predict the severity of Knee Osteoarthritis
                        using Artificial Intelligence and Deep Learning.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/register" className="btn-primary">
                            Get Started
                        </Link> <br />

                        <Link to="/login" className="btn-secondary">
                            Login
                        </Link>
                    </div>
                </div>

                <div className="hero-image">
                    <img
                        src="https://placehold.co/500x350/eaf4f8/123c50?text=Knee+X-Ray+Analysis"
                        alt="Knee X-ray analysis"
                    />
                </div>
            </section>

            <section className="features">
                <h2>Our Features</h2>

                <div className="feature-container">
                    <div className="feature-card">
                        <h3>AI Detection</h3>
                        <p>Analyze knee X-ray images using AI models.</p>
                    </div>

                    <div className="feature-card">
                        <h3>Severity Prediction</h3>
                        <p>Predict osteoarthritis severity from Grade 0 to Grade 4.</p>
                    </div>

                    <div className="feature-card">
                        <h3>Patient History</h3>
                        <p>View previous predictions and examination records.</p>
                    </div>

                    <div className="feature-card">
                        <h3>Doctor Consultation</h3>
                        <p>Connect with doctors and submit medical queries.</p>
                    </div>
                </div>
            </section>

            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps">
                    <p>01. Register or Login</p>
                    <p>02. Upload Knee X-ray</p>
                    <p>03. AI Analyzes the Image</p>
                    <p>04. View Predicted Severity</p>
                </div>
            </section>

        </div>
    );
}

export default Home;