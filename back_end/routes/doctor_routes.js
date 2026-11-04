
const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const users = require("../models/users");
const query = require("../models/query");

router.post("/register", async (req, res) => {
    try {
        let data = req.body;
        data.password = await bcrypt.hash(data.password, 10);
        data.role = "doctor";

        let newuser = new users(data);
        let result = await newuser.save();

        res.send("Doctor registered successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        let user = await users.findOne({
            email: req.body.email,
            role: "doctor"
        });

        if (user && await bcrypt.compare(req.body.password, user.password)) {
            res.send("Doctor login success");
        } else {
            res.send("Invalid email or password");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/profile/:id", async (req, res) => {
    try {
        let result = await users.findOne({
            _id: req.params.id,
            role: "doctor"
        }).select("-password");

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.patch("/updateprofile/:id", async (req, res) => {
    let data = req.body;

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    let updatedata = await users.findOneAndUpdate(
        { _id: req.params.id, role: "doctor" },
        { $set: data },
        { new: true }
    ).select("-password");

    res.send(updatedata);
});

router.delete("/profile/:id", async (req, res) => {
    try {
        let result = await users.findOneAndDelete({
            _id: req.params.id,
            role: "doctor"
        });

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/queries", async (req, res) => {
    try {
        let result = await query.find();
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/knee", async (req, res) => {
    try {
        let result = await users.findOneAndUpdate(
            {
                _id: req.body.patientId,
                role: "patient"
            },
            { kneeData: req.body.kneeData },
            { new: true }
        );

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/knee/:id", async (req, res) => {
    try {
        let result = await users.findOne({
            _id: req.params.id,
            role: "patient"
        }).select("name kneeData");

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.put("/knee/:id", async (req, res) => {
    try {
        let result = await users.findOneAndUpdate(
            {
                _id: req.params.id,
                role: "patient"
            },
            { kneeData: req.body.kneeData },
            { new: true }
        );

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete("/knee/:id", async (req, res) => {
    try {
        let result = await users.findOneAndUpdate(
            {
                _id: req.params.id,
                role: "patient"
            },
            { $unset: { kneeData: 1 } },
            { new: true }
        );

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/query/:id/reply", async (req, res) => {
    try {
        let result = await query.findByIdAndUpdate(
            req.params.id,
            {
                reply: req.body.reply,
                status: "Answered"
            },
            { new: true }
        );

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
