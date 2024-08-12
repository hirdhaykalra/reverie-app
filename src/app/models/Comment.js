

const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    message: { type: String, required: [true, 'A description is required'] },
    username: { type: String }
},
    { timestamps: true }
);

module.exports = mongoose.models.Comment ?? mongoose.model("Comment", commentSchema);