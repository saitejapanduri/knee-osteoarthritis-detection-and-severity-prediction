const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
    patientId: String,
    query: String,
    reply: String,
    status: String
});

module.exports = mongoose.model("query", querySchema);