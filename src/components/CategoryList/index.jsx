"use client";


function CategoryList({ categoryDisplayName }) {


  return (
    <div className="">
      {/* Styled Heading */}
      <div className="flex items-center gap-3 mb-3">
        <h1 className="text-2xl font-bold text-gray-800">
          <span className="text-grey-600">{categoryDisplayName}</span>
        </h1>
      </div>

      {/* You can render blogs here based on selectedCompany and categoryDisplayName */}
    </div>
  );
}

export default CategoryList;
