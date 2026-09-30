const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const users = require("../models/users");
const query = require("../models/query");

router.post("/register", async (req, res) => {
    let data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    data.role = "doctor";

    let result = await users.create(data);
    res.send(result);
});

router.post("/login", async (req, res) => {
    let user = await users.findOne({ email: req.body.email });

    if (user && await bcrypt.compare(req.body.password, user.password)) {
        res.send("Doctor login success");
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

router.get("/queries", async (req, res) => {
    let result = await query.find();
    res.send(result);
});

router.post("/knee", async (req, res) => {
    let result = await users.findByIdAndUpdate(
        req.body.patientId,
        { kneeData: req.body.kneeData },
        { new: true }
    );

    res.send(result);
});

router.put("/knee/:id", async (req, res) => {
    let result = await users.findByIdAndUpdate(
        req.params.id,
        { kneeData: req.body.kneeData },
        { new: true }
    );

    res.send(result);
});

router.delete("/knee/:id", async (req, res) => {
    let result = await users.findByIdAndUpdate(
        req.params.id,
        { $unset: { kneeData: 1 } },
        { new: true }
    );

    res.send(result);
});

router.post("/query/:id/reply", async (req, res) => {
    let result = await query.findByIdAndUpdate(
        req.params.id,
        {
            reply: req.body.reply,
            status: "Answered"
        },
        { new: true }
    );

    res.send(result);
});

module.exports = router;