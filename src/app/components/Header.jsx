"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import ReverieLogo from "./reverie/ReverieLogo";
const Header = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <div className="sticky top-0 px-8 py-4 bg-white shadow border-b-4 flex justify-between items-center border-indigo-500">
          <ReverieLogo />
          <nav className="flex space-x-6 text-m font-medium">
            <a
              className="hover:text-indigo-600"
              href={"/profile/" + session.user.name}
            >
              {" "}
              Welcome {session.user.name}
            </a>
            <a className="hover:text-indigo-600" href="/dreams">
              Dreams
            </a>
            <a
              className="hover:text-indigo-600"
              href="#"
              onClick={() => signOut()}
            >
              Sign Out
            </a>
          </nav>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
