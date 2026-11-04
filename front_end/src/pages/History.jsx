function History() {
    return (
        <div className="history-page">
            <h2>Prediction History</h2>

            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Date</th>
                        <th>Left Knee</th>
                        <th>Right Knee</th>
                        <th>Severity</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Demo</td>
                        <td>Grade 1</td>
                        <td>Grade 2</td>
                        <td>Moderate</td>
                    </tr>
                </tbody>
            </table>

            <p>Actual prediction history integration is pending.</p>
        </div>
    );
}

export default History;