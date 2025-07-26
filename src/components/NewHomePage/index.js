"use client";

import Link from "next/link";
import { fetchCategories } from "../../features/categoriesSlice";

import HeroSection from "./HeroSection";

export default function NewHomePage() {
  const posts = [
    {
      title: "Machine Learning in Big Mustaging",
      company: "Google",
      date: "Apr 15, 2021",
    },
    {
      title: "Starting-Liran Optimizing Code",
      company: "AWS",
      date: "Apr 15, 2021",
    },
    {
      title: "Bigsing Directing an AI-hybrid Block",
      company: "AWS",
      date: "Apr 15, 2021",
    },
    {
      title: "A Finpmentized Automation AI",
      company: "Microsoft",
      date: "Apr 15, 2021",
    },
  ];
  return (
    <div>
      {/* Hero Section */}
       <HeroSection />
      {/* Featured Posts */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Title Row */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Latest Blogs
            </h2>
            <button className="text-sm text-gray-700 font-medium hover:text-blue-600">
              A → Z
            </button>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <div
                key={index}
                className="flex items-start p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition cursor-pointer"
              >
                {/* Icon placeholder */}
                <div className="w-12 h-12 bg-blue-200 rounded-md mr-4" />

                {/* Post Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {post.company} · {post.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-semibold mb-4">Latest Posts</h2>
            <ul className="space-y-4">
              {[
                { title: "Fast is-Live and Boosting", company: "Google" },
                { title: "Dissecting Data in Java", company: "Microsoft" },
                { title: "Fiming More Cloudly", company: "AppDev" },
                { title: "Optimize Lineage & Internet", company: "Web derm" },
              ].map((post, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-md" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {post.company} · Apr 15, 2021
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Blog Stats Section */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Curated from Top Tech Blogs
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Curated engineering blogs from Google, AWS, Microsoft, and more
              under one roof.
            </p>
            <div className="grid grid-cols-3 text-center mb-6">
              <div>
                <p className="text-2xl font-bold text-blue-600">50+</p>
                <p className="text-sm text-gray-600">tech sources</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">1000+</p>
                <p className="text-sm text-gray-600">articles</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">10000+</p>
                <p className="text-sm text-gray-600">readers</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-md p-4 text-sm text-gray-700">
              Curated engineering blogs from Google, AWS, Microsoft, and more
              under one roof.
              <br />
              50+ tech sources · 1000+ articles
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 px-4 bg-gray-100 text-center">
        <h3 className="text-lg font-semibold mb-2">Newsletter CTA</h3>
        <p className="text-sm text-gray-700 mb-4">
          New posts delivered weekly. <strong>Stay in the loop.</strong>
        </p>
        <div className="flex justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border border-gray-300 rounded-l-md w-full"
          />
          <button className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}
