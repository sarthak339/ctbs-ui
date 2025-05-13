"use client";

import { useState, useEffect } from "react";
import styles from "./style.module.css";
import Category from "../CuratedTechBlog/Category";
import BlogScreen from "../BlogsScreen";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/categoriesSlice";
import { fetchBlogs } from "../../features/blogSlice";
import { fetchCompanyCategories } from "@/src/features/companyCategoriesSlice";
import CuratedTechBlog from "../CuratedTechBlog";
import ArrowBackSharpIcon from "@mui/icons-material/WestSharp";
import EastSharpIcon from "@mui/icons-material/EastSharp";
import { CollectionsOutlined } from "@mui/icons-material";
import { useSelection } from "@/src/context/selectionContext";

function HomePage() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
    const { selectedCategory, selectedCompany} = useSelection();
  const { items: blogs, status: blogStatus } = useSelector(
    (state) => state.blogs
  );
  const { items: companyCategories, status: companyCategoryStatus } =
    useSelector((state) => state.companyList);

  useEffect(() => {
    if (companyCategoryStatus === "idle") {
      dispatch(fetchCompanyCategories());
    }
  }, []);
  useEffect(()=>{
    if((selectedCategory || selectedCompany) && isMobileView){
      setIsOpen(false); 
    }
     window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedCategory, selectedCompany])
  useEffect(()=>{
      const handleResize = () => {
          if (window.innerWidth <= 1000) {
              setIsOpen(false); 
              setIsMobileView(true);
          } 
          else {
            setIsMobileView(false);
          }
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => {
          window.removeEventListener("resize", handleResize);
      };
  }, []);

  useEffect(() => {
    if (
      companyCategoryStatus === "succeeded" &&
      selectedCategory &&
      selectedCompany
    ) {
      dispatch(
        fetchBlogs({ category: selectedCategory, company: selectedCompany })
      );
    }
  }, [companyCategoryStatus, selectedCategory, selectedCompany , dispatch]);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" w-full min-h-screen mt-[72px] bg-gray-100">
      <div className=" w-full min-h-full  flex">
       {isOpen &&  <div className={`fixed h-full   bg-gray-200  ${isOpen ? "w-[20%] block" : "w-0 hide"} ${isMobileView ? "w-[80%]" : ""} transition-all duration-300 overflow-y-auto z-100`}>
          {isOpen && <CuratedTechBlog companyList={companyCategories} />}
        </div>
}
          <button onClick={toggleSidebar} className={`fixed p-2 transition-all bg-gray-400 hover:bg-gray-500 cursor-pointer  ${  isOpen ? "left-[20%]" : "left-0"} ${isMobileView && isOpen ? "left-[80%]" : ""}  top-[82px]`}>
            <span className="material-icons text-white"> {isOpen ? <ArrowBackSharpIcon /> : <EastSharpIcon />} </span>
          </button>
        <div className={`${isOpen ? "ml-[23%]" : "ml-[2%] mx-auto"}  w-full h-full flex flex-col items-center justify-center  overflow-y-auto`}>
          <BlogScreen blogs={blogs} status={blogStatus} selectedCategory = {selectedCategory} selectedCompany = {selectedCompany} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
