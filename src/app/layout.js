"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
const inter = Inter({ subsets: ["latin"] });
/*
export const metadata = {
  title: "reverie | Dreaming Worldwide!",
  description:
    "Upload, share, and view dreams from across the 7 seas here at reverie!",
};
*/
export default function RootLayout({ children }) {
  return (

    <html lang="en">

      <body className={inter.className}>
        <AuthProvider><NextUIProvider>{children}</NextUIProvider></AuthProvider>
      </body>


    </html>

  );
}
