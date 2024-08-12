"use client";

import Header from "../components/Header";
import { useState } from "react";
import SignUpForm from "../components/auth/SignUpForm";

export default function Signup() {
  return (
    <div className="flex min-h-screen flex-col py-8">
      <Header />
      <div className="flex w-8/12 h-full p-20 mx-auto my-auto text-center border-4 justify-center rounded-lg">
        <div className="py-6 w-8/12 px-6 lg:px-8 text-left">
          <h3 className="mb-4 text-xl font-medium text-gray-900">
            Signup to start dreaming!
          </h3>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
