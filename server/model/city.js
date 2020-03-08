const mongoose = require("mongoose");
module.exports = mongoose.model("City", new mongoose.Schema({
    code: String,
    name: String,
    province_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Province"
    },
    url: String,
    searched: Boolean
}));