import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/User";

export async function POST(req, res) {
  const uri = process.env.MONGO_URL;

  let client;
  try {
    client = await mongoose.connect(uri);
  } catch (error) {
    console.log("UNABLE TO CONNECT:", error);
  }

  const data = await req.json();
  const { email, username, password } = data;
  //Password hashing for new users
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { email: email, username: username, password: hashedPassword };
  try {
    await User.create(user);
    
    return NextResponse.json({ message: "Message sent" }, { status: 201 });
  } catch (error) {
    console.log("UNABLE TO POST DATA:", error);
    return NextResponse.json(
      { message: "Error sending the message" },
      { status: 500 }
    );
  }
}
