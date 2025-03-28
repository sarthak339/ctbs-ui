

import Link from "next/link";


export default function BlogCard({ blog }) {
    console.log(blog.link); 
    return (
      <div className="w-full max-w-md border border-gray-300 rounded-xl p-4 shadow-md bg-white flex flex-col justify-between">
        <h2 className="text-lg font-bold text-gray-800 mb-2">{blog.title}</h2>
        <div className="text-sm text-gray-600 mt-1 mb-2">
          <span>📝 {blog.author || "Unknown"}</span> • <span>{new Date(blog.publishedDate).toDateString()}</span>
        </div>
        <div className="mt-2 inline-block px-3 py-1 text-xs font-semibold">
          {blog.categories}
        </div>
        <p className="mt-2 text-sm text-gray-700 ">Source: <span className="font-bold">{blog.blog}</span> </p>
        <Link
          href={blog.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-blue-600 hover:underline cursor-pointer"
        >
          Read More →
        </Link>
      </div>
    );
  }
  