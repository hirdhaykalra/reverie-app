const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String },
    followers: [{ type: String }],
    following: [{ type: String }]
});

module.exports = mongoose.models.User ?? mongoose.model("User", userSchema);