"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { latestBlogs } from "@/src/features/blogLatestSlice";
import Link from "next/link";
import { useSelection } from "@/src/context/selectionContext";

function LatestBlogs() {
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector((state) => state.latestBlogs);
  const { setSelection } = useSelection();

  useEffect(() => {
    dispatch(latestBlogs());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-600">
        Loading latest blogs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-6">
        Failed to load blogs: {error}
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="text-gray-600 text-center py-6">
        No blogs available at the moment.
      </div>
    );
  }

  return (
    <div>
      <section className="bg-white py-12 px-4">
        <div className="w-full lg:max-w-8xl md:px-8 lg:px-10 mx-auto">
          {/* Title Row */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Latest Blogs
            </h2>
            <Link href="/blogs" prefetch={false}>
              <button
                onClick={() => setSelection("AI", "ALL")}
                className="text-sm text-gray-700 font-medium hover:text-blue-600 hover:cursor-pointer transition"
              >
                A → Z
              </button>
            </Link>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((post, index) => (
              <div
                key={index}
                className="flex flex-col p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition hover:cursor-pointer"
              >
                {/* Blog Title */}
                <h3 className="text-lg font-semibold text-gray-800">
                  {post.title}
                </h3>

                {/* Blog + Categories on left, Author + Date on right */}
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-600">
                    <strong>{post.blog}</strong> · {post.categories}
                  </p>
                  <p className="text-xs text-gray-500 text-right">
                    By {post.author || "Unknown"} <br />
                    {new Date(post.publishedDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Read More Link */}
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-sm text-blue-600 hover:underline self-start"
                >
                  Read more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LatestBlogs;
