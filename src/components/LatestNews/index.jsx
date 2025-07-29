import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { latestNews } from "@/src/features/latestNewsSlice";
import styles from "./style.module.css"; // ✅ custom scrollbar styles

function LatestNews() {
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector((state) => state.latestNews);

  useEffect(() => {
    dispatch(latestNews());
  }, [dispatch]);

  return (
    <section className="py-8  bg-white">
      <div className="w-full mx-auto px-4 md:px-14 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Latest News */}
        <div>
          {/* Heading with View All */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg md:text-xl font-semibold">
              Latest Tech News
            </h2>
            <a
              href="/tech-news"
              className="text-xs md:text-sm text-blue-600 hover:underline font-medium"
            >
              View All →
            </a>
          </div>

          {loading && (
            <p className="text-gray-600 text-xs md:text-sm">
              Loading latest news...
            </p>
          )}
          {error && (
            <p className="text-red-600 text-xs md:text-sm">Error: {error}</p>
          )}
          {!loading && !error && results.length === 0 && (
            <p className="text-gray-500 text-xs md:text-sm">
              No latest news available right now.
            </p>
          )}

          {!loading && !error && results.length > 0 && (
            <div
              className={`max-h-80 md:max-h-96 overflow-y-auto pr-1 md:pr-2 pb-4 md:pb-6 ${styles.noScrollbar}`}
            >
              <ul className="space-y-3">
                {results.map((news, idx) => (
                  <li
                    key={idx}
                    className="border-b pb-2 last:border-none last:pb-0"
                  >
                    {/* Title */}
                    <h4 className="text-sm md:text-base font-semibold text-gray-800">
                      {news.title}
                    </h4>

                    {/* Description one line only (truncate) */}
                    <p className="text-xs text-gray-600 truncate">
                      {news.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-1">
                      <p className="text-[11px] text-gray-500">
                        {news.source} · By {news.author || "Unknown"}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {new Date(news.time).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Read More */}
                    <a
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-[11px] text-blue-600 hover:underline"
                    >
                      Read more →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Side: Tech Blog Stats Section */}
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-2">
            Curated from Top Tech Blogs
          </h2>
          <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-6">
            Curated engineering blogs from Google, AWS, Microsoft, and more
            under one roof.
          </p>
          <div className="grid grid-cols-3 text-center mb-4 md:mb-6 gap-2">
            <div>
              <p className="text-lg md:text-2xl font-bold text-blue-600">50+</p>
              <p className="text-xs md:text-sm text-gray-600">tech sources</p>
            </div>
            <div>
              <p className="text-lg md:text-2xl font-bold text-blue-600">
                1000+
              </p>
              <p className="text-xs md:text-sm text-gray-600">articles</p>
            </div>
            <div>
              <p className="text-lg md:text-2xl font-bold text-blue-600">
                10000+
              </p>
              <p className="text-xs md:text-sm text-gray-600">readers</p>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-md p-3 md:p-4 text-xs md:text-sm text-gray-700">
            Curated engineering blogs from Google, AWS, Microsoft, and more
            under one roof.
            <br />
            50+ tech sources · 1000+ articles
          </div>
        </div>
      </div>
    </section>
  );
}

export default LatestNews;
