"use client";
import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

const SignUpForm = () => {
  //   const [data, setData] = useState({});

  //   //   const handleData = (event) => {
  //   //     setData({ ...data, [event.target.name]: event.target.value });
  //   //   };

  const saveUserToDB = async (event) => {
    event.preventDefault();
    //had to change behavior slightly
    const email = event.target.email.value;
    const username = event.target.username.value;
    const password = event.target.password.value;
    const data = { email, username, password };

    try {
      const response = await fetch("../api/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const res = await signIn("credentials", {
          redirect: true,
          callbackUrl: "/dreams",
          email,
          password,
        });
      } else {
        console.log("data not sent");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="space-y-2 w-full" onSubmit={saveUserToDB}>
      <label className="block mb-2 text-m font-medium text-gray-900 ">
        Email
      </label>
      <input
        type="email"
        id="email"
        className="hover:border-blue-600 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
        name="email"
        required
      ></input>

      <label className="block mb-2 text-m font-medium text-gray-900 ">
        Username
      </label>
      <input
        type="text"
        id="username"
        className="hover:border-blue-600 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
        name="username"
        required
      ></input>

      <label className="block mb-2 text-m font-medium text-gray-900 ">
        Password
      </label>
      <input
        type="password"
        id="password"
        className="hover:border-blue-600 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
        name="password"
        required
      ></input>

      <div className="flex flex-row justify-evenly">
        <div className="w-96">
          <button
            type="submit"
            className="mt-4 w-full text-center py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Sign up
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
