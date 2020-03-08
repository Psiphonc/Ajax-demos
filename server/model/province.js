const mongoose = require("mongoose");

module.exports = mongoose.model("Province", new mongoose.Schema({
    code: String,
    name: String,
    url: String,
    searched: Boolean
}));