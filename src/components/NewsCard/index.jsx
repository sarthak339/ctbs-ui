import React from "react";
import Link from "next/link";
const NewsCard = ({ news }) => {
  const { title, description, image, author, source, time, link } = news;

  return (
    <div className="block border rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-md transition duration-200 mb-6">
      {/* Content */}
      <div className="p-4">
        {/* Source */}
        <p className="text-xs text-blue-500 font-semibold mb-1">{source}</p>

        {/* Title */}
        <h3 className="text-lg font-bold mb-2 leading-snug">{title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-3">{description}</p>

        {/* Meta Info */}
        <div className="text-xs text-gray-500 flex justify-between items-center mb-3">
          <span>{author || "Unknown Author"}</span>
          <span>
            {time
              ? new Date(time).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""}
          </span>
          {/* <span>{formatDistanceToNow(new Date(time), { addSuffix: true })}</span> */}
        </div>

        {/* Read More Button */}
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 font-medium cursor-pointer hover:underline "
        >
          <span className="cursor-pointer">Read More →</span>
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
