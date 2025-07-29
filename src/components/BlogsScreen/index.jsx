"use client";
import { useState } from "react";
import CompanyCategorization from "../CuratedTechBlog/CompanyCategorization";
import Loader from "../Loader";

function BlogScreen({
  blogs,
  status,
  selectedCategory,
  selectedCompany,
  isSearch,
}) {
  const [error, setError] = useState(null);

  return (
    <div className="w-full min-h-full flex flex-wrap justify-center overflow-y-auto">
      {status === "loading" || status === "idle" ? (
        <Loader />
      ) : status === "succeeded" && blogs && Object.keys(blogs).length > 0 ? (
        <div className="flex flex-col">
          {isSearch ? (
            // ✅ Pass blogs directly without mapping
            <CompanyCategorization comp={blogs} isSearch={true} />
          ) : (
            // ✅ Normal flow when not search
            Object.entries(blogs).map((comp, index) => (
              <CompanyCategorization
                key={comp.id || index}
                comp={comp}
                isSearch={false}
              />
            ))
          )}
        </div>
      ) : status === "failed" ? (
        <div className="h-full w-full flex justify-center items-center">
          <p className="text-center text-4xl text-red-600">
            {error || "Failed to load blogs."}
          </p>
        </div>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <p className="text-center text-xl">
            No blogs found for this category.
          </p>
        </div>
      )}
    </div>
  );
}

export default BlogScreen;
