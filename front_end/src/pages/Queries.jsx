import { useState } from "react";
import { useLocation } from "react-router-dom";

function Queries() {
    const location = useLocation();
    const isDoctor = location.pathname.startsWith("/doctor");

    const [patientId, setPatientId] = useState("");
    const [queryId, setQueryId] = useState("");
    const [message, setMessage] = useState("");
    const [reply, setReply] = useState("");
    const [queries, setQueries] = useState([]);

    const loadQueries = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/doctor/queries"
            );

            const data = await response.json();
            setQueries(data);
        } catch {
            alert("Unable to load queries");
        }
    };

    const addQuery = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/patient/query",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        patientId,
                        message,
                        status: "Pending"
                    })
                }
            );

            if (response.ok) {
                alert("Query submitted successfully");
                setMessage("");
            } else {
                alert("Query submission failed");
            }
        } catch {
            alert("Unable to connect to server");
        }
    };

    const replyQuery = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:5000/doctor/query/${queryId}/reply`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ reply })
                }
            );

            if (response.ok) {
                alert("Reply submitted successfully");
                setReply("");
                loadQueries();
            }
        } catch {
            alert("Unable to connect to server");
        }
    };

    return (
        <div className="queries-page">
            <h2>{isDoctor ? "Patient Queries" : "My Queries"}</h2>

            {isDoctor ? (
                <>
                    <button onClick={loadQueries}>Load All Queries</button>

                    {queries.map((item) => (
                        <div key={item._id} className="query-card">
                            <p><strong>Patient ID:</strong> {item.patientId}</p>
                            <p><strong>Message:</strong> {item.message}</p>
                            <p><strong>Status:</strong> {item.status}</p>
                        </div>
                    ))}

                    <form onSubmit={replyQuery}>
                        <input
                            placeholder="Enter Query ID"
                            value={queryId}
                            onChange={(e) => setQueryId(e.target.value)}
                            required
                        />

                        <textarea
                            placeholder="Write your reply"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            required
                        />

                        <button type="submit">Send Reply</button>
                    </form>
                </>
            ) : (
                <form onSubmit={addQuery}>
                    <input
                        placeholder="Enter Patient ID"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        required
                    />

                    <textarea
                        placeholder="Describe your knee problem"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />

                    <button type="submit">Submit Query</button>
                </form>
            )}
        </div>
    );
}

export default Queries;