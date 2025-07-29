"use client";

function CategoryList({ categoryDisplayName, selectedCompany }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Responsive heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex flex-wrap items-center gap-2">
          <span className="text-gray-800">{categoryDisplayName}</span>
          <span className="hidden sm:inline-block h-5 border-l-2 border-gray-400"></span>
          <span className="text-gray-500">{selectedCompany}</span>
        </h1>
      </div>

      {/* Render content below */}
    </div>
  );
}

export default CategoryList;
