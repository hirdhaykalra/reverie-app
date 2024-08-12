import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Comment from "@/app/models/Comment";

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
        const { postId, message, username } = data;

        const commentModel = new Comment({ postId, message, username });
        await commentModel.save();

        return NextResponse.json({ message: "Message sent" }, { status: 201 });
    }
    catch (error) {
        console.log("UNABLE TO POST DATA:", error);
        return NextResponse.json({ message: "Error sending the message" }, { status: 500 });
    }
}

// export async function GET(req, res) {
//     const uri = process.env.MONGO_URL;

//     try {
//         await mongoose.connect(uri);
//         const allComments = await Post.find();

//         console.log("ALL POSTS FETCHED");
//         // return NextResponse.json({ message: "Posts fetched" }, { status: 201 });
//         return NextResponse.json({ posts: allPosts });
//     } catch (error) {
//         console.log("UNABLE TO CONNECT OR FETCH DATA:", error);
//         return NextResponse.json({ message: "Error fetching allPosts:", error }, { status: 500 });
//     }
// }