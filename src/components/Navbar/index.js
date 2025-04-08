import React from "react";
import "./style.module.css";
import Link from "next/link";
import NavbarList from "./NavbarList";
import SignInButton from "../SignInBtn";
function Navbar() {
  return (
    <>
    <div className="bg-white  w-full h-16 flex items-center justify-between px-4 border-b-2 border-gray-200">
      <div className="logo pointer-cursor rounded  flex-start">
        <Link href="/">
          <img
            src="/images/logo/big4bytesLogo.png"
            alt=""
            width="45px"
            height="45px"
            className="rounded pointer-cursor hover:scale-105 transition-all duration-300 ease-in-out"
          />
        </Link>
      </div>
      <div className="heading">
        <h1 className="text-2xl font-bold text-gray-800 ">
           Big 4 Bytes
        </h1>
      </div>
      <div className="flex  items-center justify-center">
        <SignInButton/>
      </div>
    </div>
    <NavbarList />
    </>
  );
}

export default Navbar;
