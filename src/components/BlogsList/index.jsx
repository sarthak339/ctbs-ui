import React from 'react'
import BlogCard from '../BlogCard'

function BlogList({blogs}) {
  return (
    <div className="w-full max-w-6xl mx-auto py-2">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog, index) => (
        <div key={index} className="flex justify-center">
          <BlogCard blog={blog} />
        </div>
      ))}
    </div>
  </div>
  )
}

export default BlogList
