'use client'

import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filterSlice"; 
import categoriesReducer from "../features/categoriesSlice"; 
import blogReducer from "../features/blogSlice";
import CompanyReducer from "../features/companyCategoriesSlice";
import TechNewsReducer from "../features/techNewsSlice"
import SearchReducer from "../features/searchBlogSlice";
import latestBlogReducer from "../features/blogLatestSlice"; 
import latestNewsReducer, { latestNews } from "../features/latestNewsSlice"; // Import the latest news slice
import SubscribeUserReducer from "../features/userSlice"; // Import the user slice for subscription
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    categories: categoriesReducer, 
    blogs: blogReducer,
    companyList:CompanyReducer,
    techNews : TechNewsReducer, 
    search: SearchReducer, 
    latestBlogs: latestBlogReducer, 
    latestNews: latestNewsReducer, 
    SubscribeUser : SubscribeUserReducer,
  },
});
