"use client";

import CategoryList from "@/src/components/CategoryList";
import CompanyList from "@/src/components/CompanyList";

export default function BlogsByCategory({ category }) {
  const categoryDisplayName = formatCategoryName(category);
  console.log("BlogsByCategory rendered with categoryDisplayName:", categoryDisplayName);

  return (
    <div className="min-h-screen">
      <div className="p-20">
        <CategoryList categoryDisplayName={categoryDisplayName} />
        <CompanyList categoryDisplayName={categoryDisplayName} />
      </div>
    </div>
  );
}

function formatCategoryName(slug) {
  if (!slug || typeof slug !== "string") return "";

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}