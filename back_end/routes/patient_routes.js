
const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const users = require("../models/users");
const query = require("../models/query");

router.post("/register", async (req, res) => {
    let data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    data.role = "patient";

    let newuser = new users(data);
    let result = await newuser.save();

    res.send(result);
});

router.post("/login", async (req, res) => {
    let user = await users.findOne({
        email: req.body.email,
        role: "patient"
    });

    if (user && await bcrypt.compare(req.body.password, user.password)) {
        res.json({
            message: "Patient login success",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } else {
        res.status(401).json({
            message: "Invalid email or password"
        });
    }
});

router.get("/profile/:id", async (req, res) => {
    let result = await users.findOne({
        _id: req.params.id,
        role: "patient"
    }).select("-password");

    res.send(result);
});

router.patch("/updateprofile/:id", async (req, res) => {
    let data = req.body;

    delete data.role;

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    let updatedata = await users.findOneAndUpdate(
        { _id: req.params.id, role: "patient" },
        { $set: data },
        { new: true }
    ).select("-password");

    res.send(updatedata);
});

router.delete("/profile/:id", async (req, res) => {
    try {
        let result = await users.findOneAndDelete({
            _id: req.params.id,
            role: "patient"
        });

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/query", async (req, res) => {
    try {
        let result = await query.create(req.body);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/query/:id", async (req, res) => {
    try {
        let result = await query.findById(req.params.id);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.put("/query/:id", async (req, res) => {
    try {
        let result = await query.findByIdAndUpdate(
            req.params.id,
            { query: req.body.query },
            { new: true }
        );

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete("/query/:id", async (req, res) => {
    try {
        let result = await query.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/predict", async (req, res) => {
    res.send("Prediction route called");
});

router.post("/detect", async (req, res) => {
    res.send("Detection route called");
});

router.get("/history/:id", async (req, res) => {
    try {
        let result = await query.find({
            patientId: req.params.id
        });

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
