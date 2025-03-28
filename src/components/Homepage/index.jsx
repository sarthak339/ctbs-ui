'use client'


import {useState} from "react";
import "./style.module.css";
import Heading from "./Heading";
import Category from "../Category";
import BlogScreen from "../BlogsScreen";
function HomePage() {
 const [category, setCategory] = useState("AI");
 const handleCategory= (crntCategory)=>{
    setCategory(crntCategory); 
 }
  return (
    <div className="w-full h-screen">
      <Heading />
      <Category handleCategory = {handleCategory} />
      <div className="w-full h-screen">
        <BlogScreen category = {category} />
      </div>
    </div>
  );
}

export default HomePage;
