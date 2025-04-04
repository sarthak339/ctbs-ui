import React from 'react'
import BlogList from '../BlogsList'

function CompanyCategorization({comp}) {
  return (
    <div className='p-2 w-[90%] flex-col border-b border-gray-400'>
        <div className="title company_name mx-1 font-medium text-2xl my-2">
            {comp[0]}
        </div>
        <BlogList blogs={comp[1]} />
    </div>
  )
}

export default CompanyCategorization
