import React from "react";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

function HeroSection() {
  return (
    <>
      <section className="pt-24 bg-white">
        <div className="px-14 mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
          {/* Left Content */}
          <LeftSection />

          {/* Right Illustration */}
          <RightSection />
        </div>
      </section>
    </>
  );
}

export default HeroSection;
