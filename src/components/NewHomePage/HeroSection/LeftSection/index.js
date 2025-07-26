import React, { useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/src/features/categoriesSlice";
import { useRouter } from "next/navigation";

function LeftSection() {
  const router = useRouter();

  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const dispatch = useDispatch();
  const { items: categories, status } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 150;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };
  const slugify = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  return (
    <div className="md:w-1/2 text-center md:text-left">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
        Your Gateway to <br />
        Top Engineering Blogs
      </h1>

      {/* Search Bar */}
      <div className="flex mt-6 shadow-sm max-w-md mx-auto md:mx-0">
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none text-sm"
        />
        <button className="bg-blue-600 px-4 text-white font-medium rounded-r-md text-sm hover:bg-blue-700 transition hover:cursor-pointer">
          <SearchIcon className="text-white" />
        </button>
      </div>

      {/* Category Chips with clean scroll arrows */}
      <div className="relative w-full mt-4 flex items-center gap-3">
        {/* Left Arrow (outside scroll area) */}
        <button
          onClick={() => scroll("left")}
          className="text-gray-700 hover:text-blue-600 transition"
        >
          <ArrowBackIosNewIcon fontSize="small" className="cursor-pointer" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="overflow-x-auto no-scrollbar flex space-x-3 py-2"
          style={{ scrollBehavior: "smooth", cursor: "grab", flex: 1 }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {status === "loading" && <p>Loading...</p>}

          {status === "succeeded" &&
            categories
              .filter((tag) => tag !== "None")
              .map((tag, index) => (
                <button
                  key={index}
                   onClick={() => router.push(`/${slugify(tag)}/blogs`)}
                  className="px-4 py-1 text-sm whitespace-nowrap rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 hover:cursor-pointer transition"
                >
                  {tag}
                </button>
              ))}

          {status === "failed" && (
            <p className="text-red-500">Failed to load categories</p>
          )}
        </div>

        {/* Right Arrow (outside scroll area) */}
        <button
          onClick={() => scroll("right")}
          className="text-gray-700 hover:text-blue-600 transition"
        >
          <ArrowForwardIosIcon fontSize="small" className="cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

export default LeftSection;
