"use client";

import CategoryList from "@/src/components/CategoryList";
import CompanyList from "@/src/components/CompanyList";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../features/blogSlice";
import BlogScreen from "../BlogsScreen";

export default function BlogsByCategory({ category }) {
  const categoryDisplayName = formatCategoryName(category);
  const dispatch = useDispatch();
  const { items: blogs, status: blogStatus } = useSelector(
    (state) => state.blogs
  );
  const { selectedCategory, selectedCompany } = useSelector(
    (state) => state.filter
  );

  useEffect(() => {
    if (selectedCategory && selectedCompany) {
      dispatch(
        fetchBlogs({ category: selectedCategory, company: selectedCompany })
      );
    }
  }, [selectedCategory, selectedCompany, dispatch]);
  return (
    <div className="min-h-screen">
      <div className="w-full h-full flex flex-col">
        <div className="px-10 pt-20">
          <CategoryList categoryDisplayName={categoryDisplayName} selectedCompany= {selectedCompany} />
          <CompanyList categoryDisplayName={categoryDisplayName} />
        </div>
        <div className="flex-1 flex items-center justify-center  w-full h-full ">
           <BlogScreen blogs={blogs} status={blogStatus} selectedCategory = {selectedCategory} selectedCompany = {selectedCompany} />
        </div>
      </div>
    </div>
  );
}

function formatCategoryName(slug) {
  if (!slug || typeof slug !== "string") return "";

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
