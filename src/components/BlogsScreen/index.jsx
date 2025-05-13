"use client";
import { useState, useEffect } from "react";
import CompanyCategorization from "../CuratedTechBlog/CompanyCategorization";
import Loader from "../Loader";

function BlogScreen({ blogs, status, selectedCategory, selectedCompany }) {
  const [error, setError] = useState(null);
  return (
    <div className="w-full min-h-full flex flex-wrap justify-center overflow-y-auto">
    {status === 'loading' || status=="idle" ? (
      <Loader />
    ) : status === 'succeeded' && Object.keys(blogs).length > 0 ? (
      <div className="flex flex-col ">
        <div className="filter flex mt-3"> 
          <div className="title mx-1 font-medium text my-2">
            <span>Category : {selectedCategory}</span>
          </div>
          <div className="h-24px border border-gray-500 mx-2"></div>
          <div className="title mx-1 font-medium text my-2">
            <span>Company : {selectedCompany}</span>
          </div>
        </div>
        {Object.entries(blogs).map((comp, index) => (
          <CompanyCategorization key={comp.id || index} comp={comp} />
        ))}
      </div>
    ) : status === 'failed' ? (
      <div className="h-full w-full flex justify-center items-center">
        <p className="text-center text-4xl text-red-600">{error}</p>
      </div>
    ) : (
      <div className="h-full w-full flex justify-center items-center">
        <p className="text-center text-xl">No blogs found for this category.</p>
      </div>
    )}
  </div>
  );
}

export default BlogScreen;
