import {useState} from 'react'
import Sidebar from './SideBar'




function CuratedTechBlog({ companyList}) {
    
  return (
    <div className={`w-full  my-auto overflow-y-auto`}>
      <Sidebar  companyList={companyList} />
    </div>
  )
}

export default CuratedTechBlog
