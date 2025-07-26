"use client";

import { useState, useEffect } from "react";
import Data from "./data.json";
import { usePathname } from "next/navigation";
import Link from "next/link";
import HamburgerMenu from "@/src/components/UI/HamburgerMenu";
import MobileNabvar from "../MobileNavbar";

function NavbarList() {
  const [activateMobileView, setActivateMobileView] = useState(false);
  const [activateMobileGrid, setActivateMobileGrid] = useState(false);

  const handleMobleView = () => {
    setActivateMobileGrid(!activateMobileGrid);
  };
  const handleMobileGrid = (status) => {
    setActivateMobileGrid(status);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setActivateMobileView(true);
      } else {
        setActivateMobileView(false);
        setActivateMobileGrid(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const pathname = usePathname();
  return (
    <div className="fixed bg-white w-full min-h-[72px] flex items-center justify-center px-4 border-b-2 border-gray-200  fixed top-0 left-0 z-100 ">
      <div className="container w-full p-2 lg:w-[80%] mx-auto flex items-center justify-between">
        <div className="flex items-center justify-center">
          <Link href="/">
            <img
              src="/favicon/favicon.ico"
              alt="Logo"
              className="w-10 h-10 rounded-full mr-2"
            />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 pl-2">Big4Bytes</h1>
        </div>
        {!activateMobileView && (
          <div className="flex items-center justify-center ml-auto border border-gray-300 rounded-lg py-2 shadow-sm">
            <ul>
              {Data.navlist.map((item, index) => (
                <Link href={item.path}>
                  <li
                    key={index}
                    className={` ${
                      pathname === item.path
                        ? "font-bold bg-gray-200 rounded-lg border-gray-600"
                        : "text-black"
                    } mx-4 inline-block text-gray-800 hover:bg-gray-200 hover:rounded-lg transition duration-300 ease-in-out py-2 px-2 h-full cursor-pointer`}
                  >
                    <span className="text-[16px]">
                      {item.title[0].toUpperCase() + item.title.slice(1)}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
        {!activateMobileView && (
          <div className="flex items-center justify-center ml-auto">
            {/* <Link
              href="/login"
              className="bg-gray-200 hover:bg-gray-300  font-bold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
            >
              Sign In
            </Link> */}
          </div>
        )}
        {activateMobileView && (
          <HamburgerMenu handleMobleView={handleMobleView} />
        )}
        {activateMobileGrid && (
          <MobileNabvar navlist={Data} handleMobileGrid={handleMobileGrid} />
        )}
      </div>
    </div>
  );
}

export default NavbarList;
