const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'A title is required'] },
    message: { type: String, required: [true, 'A description is required'] },
    tags: { type: [String], required: [true, 'Tags are required. Seperate them with commas'] },
    username: { type: String },
    likes: { type: [String] },
    mood: { type: Number }
},
    { timestamps: true }
);

module.exports = mongoose.models.Post ?? mongoose.model("Post", postSchema);