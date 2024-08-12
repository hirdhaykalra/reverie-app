import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Comment from "@/app/models/Comment";

export async function GET(req, res) {
  const uri = process.env.MONGO_URL;
  
  const params = req.headers.get('postId');
  
  try {
    await mongoose.connect(uri);
    
    const allComments = await Comment.find({ postId: params });

    return NextResponse.json({ Comments: allComments });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching allComments:", error },
      { status: 500 }
    );
  }
}