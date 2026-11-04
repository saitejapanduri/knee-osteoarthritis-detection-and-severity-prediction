import { useState } from "react";

function Predict() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handlePredict = () => {
        if (!image) {
            alert("Please upload a knee X-ray image");
            return;
        }

        alert("Image selected. ML prediction integration is pending.");
    };

    return (
        <div className="predict-page">
            <h2>Knee Osteoarthritis Prediction</h2>

            <p>Upload your knee X-ray image for severity prediction.</p>

            <input
                type="file"
                accept="image/*"
                onChange={handleImage}
            />

            {preview && (
                <img
                    src={preview}
                    alt="Knee X-ray preview"
                    width="300"
                />
            )}

            <button onClick={handlePredict}>
                Predict Severity
            </button>
        </div>
    );
}

export default Predict;