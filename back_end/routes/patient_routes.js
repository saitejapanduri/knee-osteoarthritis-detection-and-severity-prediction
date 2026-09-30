const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const users = require("../models/users");
const query = require("../models/query");

router.post("/register", async (req, res) => {
    let data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    data.role = "patient";

    let result = await users.create(data);
    res.send(result);
});

router.post("/login", async (req, res) => {
    let user = await users.findOne({ email: req.body.email });

    if (user && await bcrypt.compare(req.body.password, user.password)) {
        res.send("Patient login success");
    } else {
        res.send("Invalid email or password");
    }
});

router.put("/profile", async (req, res) => {
    let result = await users.findOneAndUpdate(
        { email: req.body.email },
        req.body,
        { new: true }
    );

    res.send(result);
});

router.post("/query", async (req, res) => {
    let result = await query.create(req.body);
    res.send(result);
});

router.get("/query/:id", async (req, res) => {
    let result = await query.findById(req.params.id);
    res.send(result);
});

router.put("/query/:id", async (req, res) => {
    let result = await query.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.send(result);
});

router.post("/predict", async (req, res) => {
    res.send("Prediction route called");
});

router.post("/detect", async (req, res) => {
    res.send("Detection route called");
});

router.get("/history/:id", async (req, res) => {
    let result = await query.find({
        patientId: req.params.id
    });

    res.send(result);
});

module.exports = router;