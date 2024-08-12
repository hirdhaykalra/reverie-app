import Post from "@/app/models/Post";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req, res) {
    const uri = process.env.MONGO_URL;
    let client;
    try {
        client = await mongoose.connect(uri);
    } catch (error) {
        console.log("UNABLE TO CONNECT:", error);
    }

    const url = new URL(req.url);
    const _id = url.pathname.split('/').pop();

    try {
        const post = await Post.findByIdAndDelete(_id, {useFindandModify: false });
        return NextResponse.json({ message: "Post deleted!" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Post not deleted!" }, { status: 401 });
    }
}