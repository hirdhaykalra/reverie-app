import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import Post from "@/app/models/Post";

export async function POST(req, res) {
    const uri = process.env.MONGO_URL;

    let client;
    try {
        client = await mongoose.connect(uri);
    } catch (error) {
        console.log("UNABLE TO CONNECT:", error);
    }

    try {
        const data = await req.json();
        const { postId, userSession } = data;

        const postInQuestion = await Post.findById(postId);
        let numLikes = postInQuestion.likes.length;
        if (postInQuestion.likes.includes(userSession)) {
            postInQuestion.likes.pull(userSession);
            numLikes--;
        }
        else {
            postInQuestion.likes.push(userSession);
            numLikes++;
        }
        await postInQuestion.save();

        return NextResponse.json({ likes: numLikes }, { status: 201 });
    } catch (error) {
        console.log("UNABLE TO CONNECT OR SEND DATA:", error);
        return NextResponse.json({ message: "Error liking post:", error }, { status: 500 });
    }
}

export async function GET(req, res) {
    const uri = process.env.MONGO_URL;

    let client;
    try {
        client = await mongoose.connect(uri);
    } catch (error) {
        console.log("UNABLE TO CONNECT:", error);
    }

    try {
        const userSession = req.headers.get('userSession');
        const postId = req.headers.get('postId');
        const loggedInUser = await User.findOne({ username: userSession });
        const postWithId = await Post.findById(postId);
        const isPostLiked = postWithId?.likes.includes(loggedInUser.username);
        const numLikes = postWithId?.likes.length;
        console.log(postWithId?.likes);
        console.log(numLikes);
        return NextResponse.json({ isPostLiked, numLikes }, { status: 200 });
    } catch (error) {
        console.log("UNABLE TO CONNECT OR RECEIVE DATA:", error);
        return NextResponse.json({ message: "Error checking status:", error }, { status: 500 });
    }
}