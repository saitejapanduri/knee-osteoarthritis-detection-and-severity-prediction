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
                        patientId: queryId,
                        message: message,
                        status: "Pending"
                    })
                }
            );

            if (response.ok) {
                alert("Query submitted successfully");
                setMessage("");
                loadMyQueries();
            } else {
                alert("Query submission failed");
            }

        } catch (error) {
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

            const data = await response.json();

            if (response.ok && data) {
                alert("Reply submitted successfully");
                setReply("");
                setQueryId("");
                loadQueries();
            } else {
                alert("Reply failed: " + JSON.stringify(data));
            }

        } catch (error) {
            console.log(error);
            alert("Unable to submit reply");
        }
    };

    const loadMyQueries = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/patient/history/${queryId}`
            );

            const data = await response.json();
            setQueries(data);

        } catch (error) {
            console.log(error);
            alert("Unable to load your queries");
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
                            <p><strong>Doctor Reply:</strong> {item.reply || "Not answered yet"}</p>
                        </div>
                    ))}

                    <form onSubmit={replyQuery}>
                        <input
                            placeholder="Enter Patient ID"
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
                <>
            <>
                <form onSubmit={addQuery}>
                    <input
                        placeholder="Enter Patient ID"
                        value={queryId}
                        onChange={(e) => setQueryId(e.target.value)}
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

                <button onClick={loadMyQueries}>
                    View My Queries
                </button>

                <div className="my-queries">
                    <h3>My Submitted Queries</h3>

                    {queries.map((item) => (
                        <div key={item._id} className="query-card">
                            <p><strong>Message:</strong> {item.message}</p>
                            <p><strong>Status:</strong> {item.status}</p>
                            <p><strong>Doctor Reply:</strong> {item.reply || "Waiting for doctor reply"}</p>
                        </div>
                    ))}
                </div>
            </>

            <button onClick={loadMyQueries}>
                View My Queries
            </button>

            <div className="my-queries">
                <h3>My Submitted Queries</h3>

                {queries.filter(item => item.message).map((item) => (
                    <div key={item._id} className="query-card">

                        <p>
                            <strong>Patient ID:</strong> {item.patientId}
                        </p>

                        <p>
                            <strong>Message:</strong> {item.message}
                        </p>

                        <p>
                            <strong>Status:</strong> {item.status}
                        </p>

                        <p>
                            <strong>Doctor Reply:</strong>
                            {item.reply || "Waiting for doctor reply"}
                        </p>

                    </div>
                ))}
            </div>
            </>
                
            )}
        </div>
    );
}

export default Queries;