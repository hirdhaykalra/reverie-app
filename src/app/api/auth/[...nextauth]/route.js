import { dbConnect } from "@/app/lib/mongodb";
import User from "@/app/models/User";

// Auth Imports
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

// db/password hasing stuff
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const handler = NextAuth({
  providers: [
    //https://next-auth.js.org/providers/credentials#example---username--password
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        await dbConnect();

        const user = await mongoose
          .model("User")
          .findOne({ email: credentials.email });

        if (user) {
          const passwordCompare = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (passwordCompare) {
            //add stuff here to add to cookie
            //see src\app\components\Header.jsx on how to access data from cookie
            return { name: user.username, email: user.email };
          } else {
            console.log('error');
            return {error:'Invalid username or password'}
          }
        } else {
          return {error:'No user found'}
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({user}){
      if(user?.error){
        throw new Error(user?.error)
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
