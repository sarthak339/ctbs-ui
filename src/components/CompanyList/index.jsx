"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyCategories } from "@/src/features/companyCategoriesSlice";
import ScrollContainer from "../ScrollContainer";
import { setCompany } from "@/src/features/filterSlice";

const CompanyList = ({ categoryDisplayName }) => {
  const dispatch = useDispatch();
  const [selectedCompany, setSelectedCompany] = useState("ALL");

  const { items: companies = [], status } = useSelector(
    (state) => state.companyList || {}
  );

  useEffect(() => {
    if (categoryDisplayName) {
      dispatch(fetchCompanyCategories(categoryDisplayName));
    }
  }, [categoryDisplayName, dispatch]);

  const handleClick = (company) => {
    dispatch(setCompany(company));
    setSelectedCompany(company);
  };

  return (
    <div className="w-full mb-6 rounded-lg overflow-hidden">
      {status === "loading" && (
        <p className="text-gray-500 text-sm px-4">Loading companies...</p>
      )}

      {status === "succeeded" && (
        <ScrollContainer>
          {companies.map((company, index) => {
            const isSelected = selectedCompany === company;
            return (
              <button
                key={index}
                onClick={() => handleClick(company)}
                className={`px-5 py-2 rounded-sm text-[16px] whitespace-nowrap transition duration-200  hover:cursor-pointer 
                  ${
                    isSelected
                      ? "bg-gray-300 text-black"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {company}
              </button>
            );
          })}
        </ScrollContainer>
      )}

      {status === "failed" && (
        <p className="text-red-500 text-sm px-4">Failed to load companies.</p>
      )}
    </div>
  );
};

export default CompanyList;
