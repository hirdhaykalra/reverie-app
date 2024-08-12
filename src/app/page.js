"use client";
import Header from "./components/Header";
import Image from "next/image";
import { useState, useEffect } from "react";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ReverieLogo from "./components/reverie/ReverieLogo";
import Login from "./login/page";

export default function Home() {
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    setShowLogin(showLogin);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/static/CC0-Background.jpg')" }}
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-30">
          <div className="text-white p-4">
            <div className="mb-8">
              <Image
                src="/static/sheep.gif" //gif is cool but hirdhay is going to need to crop down on the transparent space if we want to use it.
                width={150}
                height={150}
                alt="logo"
              />
            </div>
            <h1 className="py-3 px-2">Ever had that moment...</h1>
            <p className="py-3 px-2">
              ...when you wake up from the best dream ever, but by the time
              you&apos;re out of bed and scrambling for that journal, it&apos;s
              gone?
            </p>
            <p className="py-3 px-2">
              We all reach for our phones first in the morning, so why not try
              to embrace it and do something productive?
            </p>
            <p className="py-3 px-2">
              Welcome to reverie, a website that skips the journal and allows
              you to send your dreams across the 7 seas as soon as you wake up!
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center">
        <div className="w-96">
          <h1 className="py-2">{showLogin ? "Log in" : "Sign Up"}</h1>
          {showLogin ? <LoginForm /> : <SignUpForm />}

          <button
            onClick={() => setShowLogin(!showLogin)}
            className="mt-4 w-full text-center py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            {showLogin
              ? "Dont have an account? Sign Up"
              : "Already have an account? log in!"}
          </button>
        </div>
      </div>
    </div>
  );
}
