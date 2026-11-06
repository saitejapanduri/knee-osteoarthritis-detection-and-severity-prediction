import { useState } from "react";
import "./DoctorKneeData.css";

function DoctorKneeData() {
    const [patientId, setPatientId] = useState("");
    const [patientName, setPatientName] = useState("");

    const [kneeData, setKneeData] = useState({
        examinationDate: "",
        klGrade: "",
        findings: "",
        notes: ""
    });

    const [recordFound, setRecordFound] = useState(false);

    const handleChange = (e) => {
        setKneeData({
            ...kneeData,
            [e.target.name]: e.target.value
        });
    };

    const loadKneeData = async () => {
        if (!patientId) {
            alert("Please enter Patient MongoDB ID");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/doctor/knee/${patientId}`
            );

            const data = await response.json();

            if (response.ok && data) {
                setPatientName(data.name || "");

                if (data.kneeData) {
                    setKneeData({
                        examinationDate: data.kneeData.examinationDate || "",
                        klGrade: data.kneeData.klGrade || "",
                        findings: data.kneeData.findings || "",
                        notes: data.kneeData.notes || ""
                    });

                    setRecordFound(true);
                    alert("Knee data loaded successfully");
                } else {
                    setKneeData({
                        examinationDate: "",
                        klGrade: "",
                        findings: "",
                        notes: ""
                    });

                    setRecordFound(false);
                    alert("Patient found, but no knee data exists yet");
                }
            } else {
                alert("Patient not found");
                setPatientName("");
                setRecordFound(false);
            }
        } catch (error) {
            console.log(error);
            alert("Unable to connect to server");
        }
    };

    const addKneeData = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/doctor/knee",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        patientId: patientId,
                        kneeData: kneeData
                    })
                }
            );

            const data = await response.json();

            if (response.ok && data) {
                setRecordFound(true);
                alert("Knee data added successfully");
            } else {
                alert("Unable to add knee data");
            }
        } catch (error) {
            console.log(error);
            alert("Unable to connect to server");
        }
    };

    const updateKneeData = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:5000/doctor/knee/${patientId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        kneeData: kneeData
                    })
                }
            );

            const data = await response.json();

            if (response.ok && data) {
                setRecordFound(true);
                alert("Knee data updated successfully");
            } else {
                alert("Unable to update knee data");
            }
        } catch (error) {
            console.log(error);
            alert("Unable to connect to server");
        }
    };

    const deleteKneeData = async () => {
        if (!window.confirm("Are you sure you want to delete this knee data?")) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/doctor/knee/${patientId}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (response.ok && data) {
                setKneeData({
                    examinationDate: "",
                    klGrade: "",
                    findings: "",
                    notes: ""
                });

                setRecordFound(false);
                alert("Knee data deleted successfully");
            } else {
                alert("Unable to delete knee data");
            }
        } catch (error) {
            console.log(error);
            alert("Unable to connect to server");
        }
    };

    return (
        <div className="knee-page">
            <div className="knee-container">

                <div className="knee-heading">
                    <h2>Patient Knee Data</h2>
                    <p>Add and manage patient knee examination records</p>
                </div>

                <div className="patient-search">
                    <label>Patient MongoDB ID</label>

                    <div className="search-row">
                        <input
                            type="text"
                            placeholder="Enter patient's MongoDB ID"
                            value={patientId}
                            onChange={(e) => setPatientId(e.target.value)}
                        />

                        <button type="button" onClick={loadKneeData}>
                            Load Patient
                        </button>
                    </div>

                    {patientName && (
                        <p className="patient-name">
                            Patient Name: <strong>{patientName}</strong>
                        </p>
                    )}
                </div>

                <form className="knee-form" onSubmit={recordFound ? updateKneeData : addKneeData}>

                    <h3>Knee Examination Details</h3>

                    <div className="knee-fields">

                        <div className="knee-field">
                            <label>Examination Date</label>
                            <input
                                type="date"
                                name="examinationDate"
                                value={kneeData.examinationDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="knee-field">
                            <label>Kellgren-Lawrence Grade</label>
                            <select
                                name="klGrade"
                                value={kneeData.klGrade}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Grade</option>
                                <option value="0">Grade 0 - No OA</option>
                                <option value="1">Grade 1 - Doubtful OA</option>
                                <option value="2">Grade 2 - Mild OA</option>
                                <option value="3">Grade 3 - Moderate OA</option>
                                <option value="4">Grade 4 - Severe OA</option>
                            </select>
                        </div>

                        <div className="knee-field full-width">
                            <label>Examination Findings</label>
                            <textarea
                                name="findings"
                                placeholder="Enter knee examination findings"
                                value={kneeData.findings}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="knee-field full-width">
                            <label>Doctor Notes</label>
                            <textarea
                                name="notes"
                                placeholder="Enter additional notes"
                                value={kneeData.notes}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className="knee-buttons">
                        <button type="submit">
                            {recordFound ? "Update Knee Data" : "Add Knee Data"}
                        </button>

                        {recordFound && (
                            <button
                                type="button"
                                className="delete-knee-button"
                                onClick={deleteKneeData}
                            >
                                Delete Knee Data
                            </button>
                        )}
                    </div>

                </form>

            </div>
        </div>
    );
}

export default DoctorKneeData;