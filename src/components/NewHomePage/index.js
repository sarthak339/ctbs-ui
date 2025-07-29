"use client";

import Link from "next/link";
import { fetchCategories } from "../../features/categoriesSlice";

import HeroSection from "./HeroSection";
import LatestBlogs from "../LatestBlogs";
import LatestNews from "../LatestNews";
import SubscribedSection from "../SubscribedSection";
export default function NewHomePage() {
  
  return (
    <div>
      {/* Hero Section */}
       <HeroSection />
       <LatestBlogs/>
       <LatestNews/>
       <SubscribedSection />
    </div>
  );
}
