const mongoose = require("mongoose");

module.exports = mongoose.model("County", new mongoose.Schema({
    code: String,
    name: String,
    city_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City"
    },
    url: String,
    searched: Boolean
}));