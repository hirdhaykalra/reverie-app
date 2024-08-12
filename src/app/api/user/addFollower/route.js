import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";

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
        const { profileName, followerName } = data;

        const userBeingFollowed = await User.findOne({ username: profileName });
        if (userBeingFollowed.followers.includes(followerName)) {
            userBeingFollowed.followers.pull(followerName);
        }
        else {
            userBeingFollowed.followers.push(followerName);
        }
        await userBeingFollowed.save();

        const userFollowing = await User.findOne({ username: followerName });
        if (userFollowing?.following.includes(profileName)) {
            userFollowing?.following.pull(profileName);
        }
        else {
            userFollowing?.following.push(profileName);
        }
        await userFollowing.save();

        return NextResponse.json({ message: "User is now followed" }, { status: 201 });
    } catch (error) {
        console.log("UNABLE TO CONNECT OR SEND DATA:", error);
        return NextResponse.json({ message: "Error following user:", error }, { status: 500 });
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
        const profileName = req.headers.get('profileName');
        const userSession = req.headers.get('userSession');

        const loggedInUser = await User.findOne({ username: userSession });
        const isFollowing = loggedInUser?.following.includes(profileName);

        return NextResponse.json({ isFollowing }, { status: 200 });
    } catch (error) {
        console.log("UNABLE TO CONNECT OR RECEIVE DATA:", error);
        return NextResponse.json({ message: "Error checking status:", error }, { status: 500 });
    }
}