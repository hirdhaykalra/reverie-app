"use client";
import Header from "../components/Header";
import { signIn } from "next-auth/react";
import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col py-8">
      <Header />
      <div className="flex w-8/12 h-full p-20 mx-auto my-auto text-center border-4 justify-center rounded-lg">
        <div className="py-6 w-8/12 px-6 lg:px-8 text-left">
          <h3 className="mb-4 text-xl font-medium text-gray-900">
            Login to start dreaming!
          </h3>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
