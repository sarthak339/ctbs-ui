'use client'

import {useState, useEffect} from 'react'
import useApi from '@/src/hooks/useApi'
import constant from '@/src/config/constant'
import CategoryBtn from '../CategoryBtn'


function Category({categories, selectedCategory, handleFunction}) {
  return (

    <div className=' pb-2 w-full '>
      <div className="mx-auto  flex flex-wrap justify-center border-b border-gray-200 pb-2">
      { categories && categories.length>0 &&
        categories.map((itm ,index)=>{
            return <CategoryBtn key={index} category={itm} selectedCategory = {selectedCategory} handleFunction={()=>handleFunction(itm)}/>
        })
      }
      </div>
    </div>
  )
}

export default Category
