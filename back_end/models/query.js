const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
    patientId: String,
    message: String,
    reply: String,
    status: {
        type: String,
        default: "Pending"
    }
});

module.exports = mongoose.model("query", querySchema);