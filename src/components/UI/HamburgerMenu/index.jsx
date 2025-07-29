import React from "react";

function HamburgerMenu({ handleMobleView, open }) {
  return (
    <div
      className="flex flex-col justify-center items-center w-10 h-10 cursor-pointer relative"
      onClick={handleMobleView}
    >
      {/* Line 1 */}
      <div
        className={`w-8 h-1 bg-gray-600 rounded absolute transition-all duration-500 ease-in-out 
        ${open ? "rotate-45 top-5" : "top-3"}`}
      ></div>

      {/* Line 2 */}
      <div
        className={`w-8 h-1 bg-gray-600 rounded absolute transition-all duration-500 ease-in-out 
        ${open ? "opacity-0" : "top-5"}`}
      ></div>

      {/* Line 3 */}
      <div
        className={`w-8 h-1 bg-gray-600 rounded absolute transition-all duration-500 ease-in-out 
        ${open ? "-rotate-45 top-5" : "top-7"}`}
      ></div>
    </div>
  );
}

export default HamburgerMenu;
