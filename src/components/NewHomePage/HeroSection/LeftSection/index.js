
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/src/features/categoriesSlice";
import { useRouter } from "next/navigation";
import ScrollContainer from "@/src/components/ScrollContainer";
import { setCategory, setCompany } from "@/src/features/filterSlice";
import HomePageSearchBar from "@/src/components/HomePageSearchBar";

function LeftSection() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items: categories, status } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const slugify = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleCategoryClick = (category) => {
    dispatch(setCategory(category));
    dispatch(setCompany("ALL"))
    router.push(`/${slugify(category)}/blogs`);
  };

  const handleSearchSelect = (value) => {
    console.log("Search selected:", value);
    // You can also route to a search results page here
  };

  return (
    <div className="w-full md:w-1/2 text-center md:text-left relative px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
        Your Gateway to <br className="hidden sm:block" />
        Top Engineering Blogs
      </h1>

      <HomePageSearchBar onSelect={handleSearchSelect} />

      {status === "loading" && (
        <div className="my-2">
          <p>Loading categories...</p>
        </div>
      )}
      {status === "succeeded" && (
        <ScrollContainer>
          {categories
            .filter((tag) => tag !== "None")
            .map((tag, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(tag)}
                className="px-3 py-1 m-1 text-sm whitespace-nowrap rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 hover:cursor-pointer transition"
              >
                {tag}
              </button>
            ))}
        </ScrollContainer>
      )}
      {status === "failed" && (
        <div className="my-2">
          <p className="text-red-500">Failed to load categories</p>
        </div>
      )}
    </div>
  );
}

export default LeftSection;
