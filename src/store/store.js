'use client'

import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filterSlice"; 
import categoriesReducer from "../features/categoriesSlice"; 
import blogReducer from "../features/blogSlice";
import CompanyReducer from "../features/companyCategoriesSlice";
import TechNewsReducer from "../features/techNewsSlice"
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    categories: categoriesReducer, 
    blogs: blogReducer,
    companyList:CompanyReducer,
    techNews : TechNewsReducer
  },
});
