"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyCategories } from "@/src/features/companyCategoriesSlice";

const CompanyList = ({ categoryDisplayName }) => {
  const dispatch = useDispatch();
  const [selectedCompany, setSelectedCompany] = useState("ALL");

  // ✅ Corrected: Access the correct Redux slice
  const { items: companies = [], status } = useSelector(
    (state) => state.companyList || {}
  );

  useEffect(() => {
    if (categoryDisplayName) {
      dispatch(fetchCompanyCategories(categoryDisplayName));
    }
  }, [categoryDisplayName, dispatch]);

  const handleClick = (company) => {
    setSelectedCompany(company);
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4 mb-6">
      {status === "loading" && <p>Loading companies...</p>}

      {status === "succeeded" &&
        companies.map((company, index) => (
          <button
            key={index}
            onClick={() => handleClick(company)}
            className={`px-4 py-2 text-sm font-semibold border rounded-md hover:cursor-pointer
              ${
                selectedCompany === company
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-300"
              } transition duration-200`}
          >
            {company}
          </button>
        ))}

      {status === "failed" && (
        <p className="text-red-500">Failed to load companies.</p>
      )}
    </div>
  );
};

export default CompanyList;
