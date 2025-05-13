import React from "react";
import Data from "./data/data.json";

function FootBar() {
  return (
    <div className="p-4 text-white  bg-[#0B0B0C]">
      <div className="main w-full flex flex-col">
        <div className=" container mx-auto heading text-center py-4 flex flex-col md:flex-row  px-4">
          {/* <span>© 2025 Big 4 Bytes</span><span className='ml-2'>Privacy ∙ Terms ∙ Conditions</span> */}
          <div className="w-full md:w-1/2 h-full  py-3">
          <div className="logo flex items-center justify-center">
            <div>
            <img
              src="/favicon/favicon.ico"
              alt="Logo"
              className="w-16 h-16 rounded-full mr-4"
            />
            </div>
            
            <h1 className="font-bold text-white pl-2 text-6xl">Big4Bytes</h1>
          </div>

          </div>
          <div className="w-full md:w-1/2 h-full flex p-2">
          <div className="w-full md:w-1/2 h-full flex p-2">
          {
            Object.values(Data.footbarlist).map((item, index) => {
              return (
                <div key={index} className="w-1/2 h-full flex flex-col items-center justify-center">
                  <ul className="flex flex-col items-start  py-4">
                    {item.map((itm, index) => {
                      return (
                        <li
                          key={index}
                          className="text-md text-white hover:text-gray-300 cursor-pointer my-2"
                        >
                          {itm}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })
          }
          </div>
          
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default FootBar;
