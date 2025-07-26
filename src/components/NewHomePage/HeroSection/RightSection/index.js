import React from 'react'
import Image from "next/image";

function RightSection() {
  return (
    <>
      <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
            <Image
              src="/images/homepage/home-page-banner.jpg" // Replace with your actual image path
              alt="Hero Illustration"
              width={500}
              height={500}
              className="object-contain"
              priority
            />
          </div>
    </>
  )
}

export default RightSection
