"use client";
import { useState, useEffect } from "react";
import CompanyCategorization from "../CompanyCategorization";
import Loader from "../Loader";

function BlogScreen({ blogs, status }) {
  const [error, setError] = useState(null);
  return (
    <div className="w-full h-full flex flex-wrap justify-center">
    {status === 'loading' || status=="idle" ? (
      <Loader />
    ) : status === 'succeeded' && Object.keys(blogs).length > 0 ? (
      <div className="flex flex-col">
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
