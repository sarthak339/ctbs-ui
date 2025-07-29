"use client";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSelection } from "@/src/context/selectionContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/src/features/categoriesSlice";
import { fetchCompanyCategories } from "@/src/features/companyCategoriesSlice";
import { fetchBlogs } from "@/src/features/blogSlice";
import {
  searchBlogs,
  clearSearchResults,
} from "@/src/features/searchBlogSlice";
import BlogScreen from "@/src/components/BlogsScreen";

function AllBlogs() {
  const dispatch = useDispatch();

  // Redux: categories and companies
  const {
    items: categories,
    status: catStatus,
    error: catError,
  } = useSelector((state) => state.categories);
  const {
    items: companies,
    status: compStatus,
    error: compError,
  } = useSelector((state) => state.companyList);

  // Redux: blogs
  const { items: blogs, status: blogStatus } = useSelector(
    (state) => state.blogs
  );

  // Redux: searchBlogs
  const { results: searchResults, loading: searchLoading } = useSelector(
    (state) => state.search
  );

  // Context
  const { selectedCategory, selectedCompany, setSelection } = useSelection();
  const [searchText, setSearchText] = useState("");

  // 1. Set defaults + fetch categories (run once)
  useEffect(() => {
    if (!selectedCategory || selectedCategory === "ALL") {
      setSelection("AI", "ALL"); // default
    }
    dispatch(fetchCategories());
  }, []); // one-time effect

  // 2. Fetch companies when category changes
  useEffect(() => {
    if (selectedCategory && selectedCategory !== "ALL") {
      dispatch(fetchCompanyCategories(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  // 3. Fetch blogs when filters/search change
  useEffect(() => {
    if (searchText.trim()) {
      dispatch(searchBlogs(searchText));
    } else if (selectedCategory && selectedCategory !== "ALL") {
      dispatch(
        fetchBlogs({
          category: selectedCategory,
          company: selectedCompany,
          search: null,
        })
      );
    } else {
      dispatch(clearSearchResults());
    }
  }, [dispatch, selectedCategory, selectedCompany, searchText]);

  // show prompt if nothing is selected
  const showPrompt =
    !selectedCategory ||
    selectedCategory === "ALL" ||
    selectedCategory === "NONE";

  // check variable to indicate if results are from search
  const isSearch = !!searchText.trim();

  return (
    <div className="w-full mt-[66px] min-h-screen flex flex-col items-center bg-gray-50 px-4 py-6">
      {/* Filters */}
      <div className="w-full max-w-6xl bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row items-center gap-4">
        {/* Search Input */}
        <div className="flex-1 w-full">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Category Dropdown */}
        <div className="w-full md:w-48">
          <select
            value={selectedCategory || "AI"}
            onChange={(e) => setSelection(e.target.value, "ALL")}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option disabled value="ALL">
              Select Category
            </option>
            {catStatus === "loading" && <option disabled>Loading...</option>}
            {catStatus === "failed" && <option disabled>{catError}</option>}
            {catStatus === "succeeded" &&
              categories
                .filter((cat) => cat?.toLowerCase() !== "none")
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
          </select>
        </div>

        {/* Company Dropdown */}
        <div className="w-full md:w-48">
          <select
            value={selectedCompany || "ALL"}
            onChange={(e) => setSelection(selectedCategory, e.target.value)}
            disabled={showPrompt}
            className={`w-full px-4 py-3 rounded-lg border 
                       ${
                         showPrompt
                           ? "bg-gray-200 cursor-not-allowed"
                           : "border-gray-300"
                       }
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="ALL">All Companies</option>
            {compStatus === "loading" && <option disabled>Loading...</option>}
            {compStatus === "failed" && <option disabled>{compError}</option>}
            {compStatus === "succeeded" &&
              companies
                .filter((company) => company?.toLowerCase() !== "all")
                .map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
          </select>
        </div>
      </div>

      {/* Selected Filters Chips */}
      <div className="w-full max-w-6xl mt-4 flex flex-wrap gap-3">
        {selectedCategory &&
          selectedCategory !== "ALL" &&
          selectedCategory !== "NONE" && (
            <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium shadow">
              {selectedCategory}
              <button
                onClick={() => setSelection("ALL", selectedCompany)}
                className="ml-2 hover:text-red-500"
              >
                <CloseIcon fontSize="small" className="cursor-pointer" />
              </button>
            </div>
          )}
        {selectedCompany &&
          selectedCompany !== "ALL" &&
          selectedCompany !== "NONE" && (
            <div className="flex items-center bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium shadow">
              {selectedCompany}
              <button
                onClick={() => setSelection(selectedCategory, "ALL")}
                className="ml-2 hover:text-red-500"
              >
                <CloseIcon fontSize="small" className="cursor-pointer" />
              </button>
            </div>
          )}
      </div>

      {/* Blog Section */}
      <div className="flex-1 flex flex-col items-start justify-start w-full max-w-6xl mt-8">
        <div className="w-full border-b-2 border-gray-300 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 pb-2">
            Engineering Blogs
          </h2>
        </div>

        {isSearch ? (
          <BlogScreen
            blogs={searchResults}
            status={searchLoading ? "loading" : "succeeded"}
            selectedCategory={selectedCategory}
            selectedCompany={selectedCompany}
            isSearch={true} // ✅ pass the check flag
          />
        ) : showPrompt ? (
          <h3 className="text-lg font-semibold text-gray-600">
            Please select a Category or Company to get blogs
          </h3>
        ) : (
          <BlogScreen
            blogs={blogs}
            status={blogStatus}
            selectedCategory={selectedCategory}
            selectedCompany={selectedCompany}
            isSearch={false} // ✅ normal mode
          />
        )}
      </div>
    </div>
  );
}

export default AllBlogs;
import Link from "next/link";