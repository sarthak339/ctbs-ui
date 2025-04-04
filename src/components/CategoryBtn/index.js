'use client'

import {useState} from 'react'

function CategoryBtn({category,selectedCategory, handleFunction}) {

  return (
    <div>
      <button
       onClick={handleFunction}
      className={`${selectedCategory==category? "bg-gray-300" : "bg-white hover:bg-gray-300"} m-2 px-4 py-2 rounded-full  text-black border border-gray-400  transition cursor-pointer`}>
      {category}
    </button>
    </div>
  ) 
}

export default CategoryBtn
