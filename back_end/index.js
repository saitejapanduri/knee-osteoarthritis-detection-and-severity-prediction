const express = require("express");
const mongoose = require("mongoose");

const patient_routes = require("./routes/patient_routes");
const doctor_routes = require("./routes/doctor_routes");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/knee_oa")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use("/patient", patient_routes);
app.use("/doctor", doctor_routes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});