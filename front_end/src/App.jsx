import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientProfile from "./pages/PatientProfile";
import DoctorProfile from "./pages/DoctorProfile";
import Predict from "./pages/Predict";
import History from "./pages/History";
import Queries from "./pages/Queries";

import Header from "./components/Header";
import Footer from "./components/Footer";
import DoctorKneeData from "./pages/DoctorKneeData";

function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/patient/dashboard" element={<PatientDashboard />} />
                <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

                <Route path="/patient/profile" element={<PatientProfile />} />
                <Route path="/doctor/profile" element={<DoctorProfile />} />

                <Route path="/patient/predict" element={<Predict />} />
                <Route path="/patient/history" element={<History />} />
                <Route path="/patient/queries" element={<Queries />} />

                <Route path="/doctor/queries" element={<Queries />} />
                <Route path="/doctor/knee" element={<DoctorKneeData />} />
                
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;