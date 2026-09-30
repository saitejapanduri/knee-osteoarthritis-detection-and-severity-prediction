const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    age: Number,
    gender: String,
    phone: String,
    kneeData: Object
});

module.exports = mongoose.model("users", userSchema);