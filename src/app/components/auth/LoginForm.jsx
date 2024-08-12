"use client";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [showError, setError] = useState(false);

  useEffect(() => {
    setError(showError);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.status == 200) {
      router.push('/dreams')
    } 
    //if we wanted to ever manually edit redirect after log in do it here
    setError(true);
    
  };
  return (
    <form className="space-y-2 w-full mb-" onSubmit={handleSubmit}>
      {showError ? (<div role="alert">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            Invalid Credentials
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>Invalid username/password </p>
          </div>
        </div>): (<></>)}
      
      <label htmlFor="email" className="text-m font-medium text-gray-900 ">
        Email:
      </label>
      <input
        type="email"
        id="email"
        className="hover:border-blue-600 w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
        name="email"
        required
      />
      <label
        htmlFor="password"
        className="block mb-2 text-m font-medium text-gray-900 "
      >
        Password:
      </label>
      <input
        type="password"
        id="password"
        className="hover:border-blue-600 transition-colors block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500"
        name="password"
        required
      />
      <div className="flex flex-row justify-evenly">
        <div className="w-96">
        
          <button
            type="submit"
            className="mt-4 w-full text-center py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
