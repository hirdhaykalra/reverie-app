import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
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
        const { title, message, tags, username, likes, mood } = data;
        console.log(username);
        let tagsplit = tags.split(",").map(tag => tag.trim());

        const postModel = new Post({ title, message, tags: tagsplit, username, likes, mood });
        await postModel.save();

        return NextResponse.json({ message: "Message sent" }, { status: 201 });
    }
    catch (error) {
        console.log("UNABLE TO POST DATA:", error);
        return NextResponse.json({ message: "Error sending the message" }, { status: 500 });
    }
}

export async function GET(req, res) {
    const uri = process.env.MONGO_URL;

    try {
        await mongoose.connect(uri);
        const allPosts = await Post.find();
        
        return NextResponse.json({ posts: allPosts });
    } catch (error) {
        console.log("UNABLE TO CONNECT OR FETCH DATA:", error);
        return NextResponse.json({ message: "Error fetching allPosts:", error }, { status: 500 });
    }
}