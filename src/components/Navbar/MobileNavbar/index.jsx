import React from "react";
import Link from "next/link";

function MobileNabvar({ navlist, handleMobileGrid }) {
  return (
    <div className="absolute w-full min-h-[200px] bg-white flex flex-col top-[65px] left-0 transform transition-transform duration-300 ease-in-out shadow-lg">
      <ul className="flex flex-col mb-4">
        {navlist.navlist?.map((item, index) => (
          <li
            key={index}
            className="border-b border-gray-300"
            onClick={() => handleMobileGrid(false)} // closes menu & resets hamburger
          >
            <Link
              href={item.path}
              className="block p-4 hover:bg-gray-100 font-bold"
            >
              <span className="px-2">
                {item.title[0].toUpperCase() + item.title.slice(1)}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Subscribe Button */}
      <div className="px-4 pb-4">
        <Link
          href="/subscribe"
          className="block text-center w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => handleMobileGrid(false)} // also closes menu
        >
          Subscribe
        </Link>
      </div>
    </div>
  );
}

export default MobileNabvar;
