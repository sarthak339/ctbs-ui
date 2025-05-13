import {useState} from "react";

function HamburgerMenu({handleMobleView}) {

    const handleViewGrid = () => { 
        handleMobleView();
    };
  return (
    <div className="flex flex-col justify-center items-center space-y-2 w-10 h-10 cursor-pointer" onClick={handleViewGrid}>
      <div className="w-8 h-1 bg-gray-400 rounded"></div>
      <div className="w-8 h-1 bg-gray-400 rounded"></div>
      <div className="w-8 h-1 bg-gray-400 rounded"></div>
    </div>
  );
}

export default HamburgerMenu;
