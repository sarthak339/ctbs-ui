import React from "react";
import BlogList from "../../BlogsList";

function CompanyCategorization({ comp, isSearch }) {
  return (
    <div className="p-2 w-[90%] flex-col border-b border-gray-400">
      {!isSearch && (
        <div className="title company_name mx-1 font-medium text-2xl my-2">
          {comp[0]}
        </div>
      )}
      <BlogList blogs={!isSearch ? comp[1] : comp} />
    </div>
  );
}

export default CompanyCategorization;
