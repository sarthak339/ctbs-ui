"use client";

import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import {
  searchBlogs,
  clearSearchResults,
} from "@/src/features/searchBlogSlice";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // ✅ control dropdown visibility
  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const {
    results: filteredResults,
    loading: searchLoading,
    error,
  } = useSelector((state) => state.search);

  useEffect(() => {
    if (query.trim() === "") {
      dispatch(clearSearchResults());
      setHasSearched(false);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(() => {
      dispatch(searchBlogs(query));
      setHasSearched(true);
      setShowDropdown(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [query, dispatch]);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (link) => {
    window.open(link, "_blank");
    setShowDropdown(false);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-3 relative max-w-full sm:max-w-md" ref={wrapperRef}>
      <div className="mt-6 flex flex-col sm:flex-row shadow-sm w-full gap-2 sm:gap-0">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search blogs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim() !== "" && setShowDropdown(true)} // ✅ show dropdown on focus if query exists
            className="w-full px-4 py-2 border border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none text-sm"
          />

          {searchLoading && query.trim() !== "" && (
            <div className="absolute top-2.5 right-2">
              <CircularProgress size={18} />
            </div>
          )}

          {/* Result dropdown */}
          {showDropdown && query.trim() !== "" && (
            <div
              ref={dropdownRef}
              className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-lg shadow-lg max-h-96 overflow-auto"
            >
              {searchLoading && (
                <div className="p-3 text-gray-500">Searching...</div>
              )}

              {!searchLoading &&
                hasSearched &&
                filteredResults.length === 0 && (
                  <div className="p-3 text-gray-500">No blogs found.</div>
                )}

              {filteredResults.length > 0 && !searchLoading && (
                <ul>
                  {filteredResults.map((result, index) => (
                    <li
                      key={index}
                      onClick={() => handleResultClick(result.link)}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 transition"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-base font-semibold text-gray-900">
                          {result.title}
                        </span>
                        <span className="text-xs text-gray-500">
                          by {result.author} • {formatDate(result.publishedDate)}
                        </span>
                        {result.blog && (
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {result.blog}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <button
          className="hidden sm:block bg-blue-600 px-4 py-2 text-white font-medium rounded-md sm:rounded-r-md sm:rounded-l-none text-sm hover:bg-blue-700 transition hover:cursor-pointer"
          type="button"
        >
          <SearchIcon className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
