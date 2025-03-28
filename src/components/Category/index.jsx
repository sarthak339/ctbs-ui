'use client'

import {useState, useEffect} from 'react'
import useApi from '@/src/hooks/useApi'
import constant from '@/src/config/constant'
import CategoryBtn from '../CategoryBtn'


function Category({handleCategory}) {
    const [category, setCategory] = useState([])    
    const [error, setError] = useState(null);
    const {request} = useApi()
    const [selectedCategory, setSelectedCategory] = useState("AI");


    useEffect(()=>{
       handleCategory(selectedCategory);
    }, [selectedCategory])
    useEffect(()=>{
        const fetchDashboardData = async () => {
            try {
               request(constant.CATEGORY_END_POINT, "GET")
               .then((res)=>{
                setCategory(res);
               })
             
            } catch (err) {
              setError(err.message);
            }
          };
            fetchDashboardData();
    }, [])

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
      }
  return (

    <div className=' py-2 w-full '>
      <div className="mx-auto  flex flex-wrap justify-center">
      { category && category.result &&
        category.result.map((itm ,index)=>{
            return <CategoryBtn key={index} category={itm} selectedCategory = {selectedCategory} onClick={()=>setSelectedCategory(itm)}/>
        })
      }
      </div>
    </div>
  )
}

export default Category
