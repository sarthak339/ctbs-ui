"use client";
import { createContext, useContext, useState } from "react";

const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("AI");
  const [selectedCompany, setSelectedCompany] = useState("ALL");
  const [isCategoryCLicked, setIsCategoryClicked] = useState(null);

  const setSelection = (category, company) => {
    setSelectedCategory(category);
    setSelectedCompany(company);
  };
  const handleCategoryClick = (category) => {
    setIsCategoryClicked((prev) => (prev === category ? null : category));
  };

  return (
    <SelectionContext.Provider
      value={{
        selectedCategory,
        selectedCompany,
        isCategoryCLicked,
        handleCategoryClick,
        setSelection,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => useContext(SelectionContext);
