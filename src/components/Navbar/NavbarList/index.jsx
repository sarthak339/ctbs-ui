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
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <Link href="/">
            <img
              src="/favicon/favicon.ico"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Big4Bytes</h1>
        </div>

        {/* Nav Links (Desktop) */}
        {!activateMobileView && (
          <ul className="hidden md:flex space-x-6 ml-auto">
            {Data.navlist.map((item, index) => (
              <li key={index}>
                <Link href={item.path}>
                  <span
                    className={`text-[16px] px-3 py-2 rounded-lg cursor-pointer transition duration-200 ${
                      pathname === item.path
                        ? "font-bold bg-gray-200 border border-gray-400"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {item.title[0].toUpperCase() + item.title.slice(1)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Subscribe Button (Desktop) */}
        {!activateMobileView && (
          <div className="hidden md:flex ml-4">
            <Link href="/subscribe">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Subscribe
              </button>
            </Link>
          </div>
        )}

        {/* Hamburger (Mobile) */}
        {activateMobileView && (
          <HamburgerMenu handleMobleView={handleMobleView} />
        )}

        {/* Mobile Menu Grid */}
        {activateMobileGrid && (
          <MobileNabvar navlist={Data} handleMobileGrid={handleMobileGrid} />
        )}
      </div>
    </nav>
  );
}

export default NavbarList;
