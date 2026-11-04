const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/patient", require("./routes/patient_routes"));
app.use("/doctor", require("./routes/doctor_routes"));

mongoose.connect("mongodb://127.0.0.1:27017/knee_oa")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.listen(5000, () => {
    console.log("Server running on port 5000");
});