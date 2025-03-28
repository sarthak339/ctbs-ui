'use client'

import {useState} from 'react'

function CategoryBtn({category,selectedCategory, onClick}) {

  return (
    <div>
      <button
       onClick={onClick}
      className={`${selectedCategory==category? "bg-gray-200" : "bg-white hover:bg-gray-200"} m-2 px-4 py-2 rounded-full  text-black border border-gray-400  transition cursor-pointer`}
    >
      {category}
    </button>
    </div>
  )
}

export default CategoryBtn
