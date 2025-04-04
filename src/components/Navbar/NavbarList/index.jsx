"use client";

import React from "react";
import Data from "./data.json";
import { usePathname } from "next/navigation";
import Link from "next/link";

function NavbarList() {
  const pathname = usePathname();
  return (
    <div className=" bg-white w-full min-h-[40px] flex items-center justify-center px-4 border-b-2 border-gray-200 mb-2">
      <ul>
        {Data.navlist.map((item, index) => (
          <Link href={item.path}>
            <li
              key={index}
              className={` ${
                pathname === item.path
                  ? "font-bold border-b-2 border-gray-600"
                  : "text-black"
              } mx-4 inline-block text-gray-800 hover:bg-gray-200 transition duration-300 ease-in-out py-2 px-1 h-full cursor-pointer`}
            >
              <span  className="text-[16px]">
                {item.title[0].toUpperCase() + item.title.slice(1)}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default NavbarList;
