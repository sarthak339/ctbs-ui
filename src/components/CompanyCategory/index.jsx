import React from 'react'
import CategoryBtn from '../CategoryBtn'


function CompanyCategory({companyList, selectedCategory,  handleCompanyCategory}) {
  return (
    <div className='flex flex-wrap justify-center item-center w-[80%] mx-auto py-2'>
      { 
        companyList.map((itm, index)=>{
          return <CategoryBtn key={index}  category={itm} selectedCategory={ selectedCategory} handleFunction= {()=>{handleCompanyCategory(itm)}}   />
        })
      }
    </div>
  )
}

export default CompanyCategory
