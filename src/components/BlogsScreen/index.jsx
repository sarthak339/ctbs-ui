"use client";
import { useState, useEffect } from "react";
import useApi from "@/src/hooks/useApi";
import constant from "@/src/config/constant";
import BlogList from "../BlogsList";
import CompanyCategorization from "../CompanyCategorization";

function BlogScreen({ category }) {
  const { request } = useApi();
  const [blogs, setBlogs] = useState({ result: [] });
  const defaultCategory = category || "AI";

  useEffect(() => {
    const fetchBlogs = () => {
      try {
        request(
          `${constant.BLOGS_LIST_END_POINT}?category=${defaultCategory}`,
          "GET"
        ).then((res) => {
          if(!res){
            setBlogs({result:[]});
            return ; 
          }

          setBlogs(res);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, [category]);
  console.log(blogs.result)
  return (

    <div className="w-full flex flex-wrap justify-center">
        {  
            (Object.keys(blogs?.result).length>0 && Object.entries(blogs.result).map((comp, index)=>{
                return <CompanyCategorization key={index} comp={comp} />
            })) || <p className="text-center text-4xl font-bold">No Blogs Found</p>
        }
      
    </div>
  );
}

export default BlogScreen;
