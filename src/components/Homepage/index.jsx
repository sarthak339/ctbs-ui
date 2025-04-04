"use client";

import { useState, useEffect } from "react";
import "./style.module.css";
import Category from "../Category";
import BlogScreen from "../BlogsScreen";
import CompanyCategory from "../CompanyCategory";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/categoriesSlice";
import { fetchBlogs } from "../../features/blogSlice";
import { fetchCompanyCategories } from "@/src/features/companyCategoriesSlice";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("AI");
  const [defaultCompany, setDefaultCompany] = useState("ALL");
  const dispatch = useDispatch();
  const {
    items: categories,
    status: categoryStatus,
    error,
  } = useSelector((state) => state.categories);
  const { items: blogs, status: blogStatus } = useSelector(
    (state) => state.blogs
  );
  const { items: companyCategories, status: companyCategoryStatus } =
    useSelector((state) => state.companyList);

  // fetch categoires
  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [categoryStatus, dispatch]);

  useEffect(() => {
    if (
      categoryStatus === "succeeded" &&
      categories.length > 0 &&
      selectedCategory &&
      defaultCompany
    ) {
      const defaultCat = selectedCategory;
      dispatch(fetchBlogs({ category: selectedCategory, company: defaultCompany }));
      dispatch(fetchCompanyCategories(selectedCategory));
      
    }
  }, [categoryStatus, categories, selectedCategory,defaultCompany, dispatch]);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setDefaultCompany("ALL");
  };

  const handleCompanyCategory = (companyName) => {
    setDefaultCompany(companyName);

  }

  return (
    <div className="w-full min-h-screen  p-4">
      <Category
        categories={categories}
        selectedCategory={selectedCategory}
        handleFunction={handleCategoryClick}
      />
      <CompanyCategory
        companyList={companyCategories}
        selectedCategory={defaultCompany}
        handleCompanyCategory={handleCompanyCategory}
      />
      <div className="w-full h-full">
        <BlogScreen blogs={blogs} status={blogStatus} />
      </div>
    </div>
  );
}

export default HomePage;
