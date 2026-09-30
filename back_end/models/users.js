const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/knee_oa")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use("/auth", authRoutes);
app.use("/patient", patientRoutes);
app.use("/doctor", doctorRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});