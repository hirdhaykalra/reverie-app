import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/app/models/Post";
import User from "@/app/models/User";

export async function GET(req, res) {
  const uri = process.env.MONGO_URL;

  //note for hirdhay: params.profilename wont exist how it did in the page, all that lives under req so req.params isnt a thing but req.headers is
  
  // console.log(req.headers.get('profilename'));
  const params = req.headers.get('profilename');
  // console.log(params);

  try {
    await mongoose.connect(uri);
    const allPosts = await Post.find({ username: params });
    const userFollowers = await User.findOne({ username: params }).populate('followers');
    const userFollowing = await User.findOne({ username: params }).populate('following');

    const postCount = allPosts.length;
    const followerCount = userFollowers.followers.length;
    const followingCount = userFollowing.following.length;
    
    return NextResponse.json({ posts: allPosts, postCount, followerCount, followingCount });
  } catch (error) {
    console.log("UNABLE TO CONNECT OR FETCH DATA:", error);

    return NextResponse.json(
      { message: "Error fetching allPosts:", error },
      { status: 500 }
    );
  }
}
