import { useState } from "react";
import Category from "../Category";
const Sidebar = ({ companyList }) => {
  return (
    <>
      {
        <div
          className={ `mt-3 w-full   absolute p-4 space-y-4 `}
        >
          {Object.entries(companyList).map(([key, value], index) => {
            return key.toLowerCase()!='none' &&  <Category index={index} category={key} companyList={value}/>;
          })}
        </div>
      }
    </>
  );
};

export default Sidebar;
