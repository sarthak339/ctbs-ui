"use client";
import { useState } from "react";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import { useSelection } from "@/src/context/selectionContext";

function Category({ index, category, companyList }) {
  companyList = ['ALL', ...companyList];
  // const [isCategoryCLicked, setIsCategoryClicked] = useState(false);
    const { isCategoryCLicked , setSelection, handleCategoryClick  } = useSelection(); 
    const openCatgory = isCategoryCLicked ===category; 
   
  const handleCompanyClick = (company) => {
    setSelection(category, company); 
  };
  return (
    <div className="flex flex-col w-full  border-b border-gray-300 cursor-pointer ">
      <li
        key={index}
        className="w-full px-[16px] py-[10px] hover:text-gray-400 flex items-center justify-between text-2xl  my-1"
        onClick={() => {
          handleCategoryClick(category);
        }}
      >
        <span>{category}</span>
        {openCatgory  ? <RemoveSharpIcon /> : <AddSharpIcon />}
      </li>
      {openCatgory && (
        <ul className=" px-2 w-full py-2">
          {companyList.map((item, index)=>{
            return (
              <li
                key={index}
                className="w-full p-2 hover:text-gray-400 flex items-center justify-between text-[16x]  cursor-pointer"
                 onClick={() => handleCompanyClick(item)}
              >
                {item}
              </li>
            );
          })}
        </ul>
      )}
      
    </div>
  );
}

export default Category;
