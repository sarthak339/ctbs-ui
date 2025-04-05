import React from "react";
import Image from "next/image";
const categories = [
  "Artificial Intelligence & Machine Learning",
  "Web Development & Frameworks",
  "Cloud Computing",
  "Cybersecurity",
  "DevOps & Infrastructure",
  "Software Engineering Practices",
  "Blockchain & FinTech",
  "Startup Engineering",
  "Open Source Contributions",
  "Product & UX Design",
];

const targetAudiences = [
  "Developers who want to learn from engineering blogs at companies like Meta, Netflix, Uber, and more.",
  "Product Managers looking for case studies and frameworks directly from top teams.",
  "Students & Learners who want to explore real-world applications of tech beyond textbooks.",
  "Entrepreneurs interested in understanding how tech giants solve problems at scale.",
  "Recruiters who want to understand team cultures and technical excellence at different organizations.",
];

function About() {
  return (
    <div className="min-h-[542px] w-full mt-3">
      <div className="flex flex-col lg:w-[60%] md:w-[80%] w-full mx-auto h-full  px-2">
        <div className="heading lg:w-[80%] w-full mx-auto px-4 lg:px-2 py-2 mb-2">
          <h1 className="font-bold text-3xl">About Big 4 Bytes</h1>
        </div>
        <div className=" flex-start lg:w-[80%] w-full mx-auto px-4 lg:px-0">
          <div className="flex-start w-full para_1 mb-2">
            <p className="text-justify text-[18px]">
              In a world where information is abundant but often scattered,
              finding relevant, high-quality tech content can feel like looking
              for a needle in a haystack. That’s where Big4Bytes steps in—your
              centralized destination for exploring curated tech blogs from the
              world’s leading companies, sorted by category, technology, and
              industry focus.
              <br />
              <br />
              At Big4Bytes, we believe that access to well-organized, insightful
              content is crucial for developers, IT professionals, startups,
              researchers, and tech enthusiasts who are constantly striving to
              stay ahead of the curve. Whether it’s the latest updates on
              artificial intelligence from Google, deep dives into cloud
              infrastructure from Amazon Web Services, or thought leadership
              pieces from Microsoft engineers, we bring it all together—under
              one digital roof.
            </p>
          </div>
          <div className="w-full flex items-center justify-center my-6">
            <Image
              src="/images/aboutImage/big4bytes.png"
              alt="about image"
              width={500}
              height={500}
              className="w-full max-w-[600px] h-[400px] object-cover rounded-lg"
            />
          </div>
          <div className="para_2 my-6">
            <h1 className="font-bold text-3xl mb-4">Vision</h1>
            <p className="text-justify text-[18px]">
              Big4Bytes was born from a simple yet powerful idea: to simplify
              how people access and consume technology content. In an age where
              innovation happens at breakneck speed, it's not just about having
              access to information; it's about accessing the right information,
              at the right time, in the right format. We aim to become the
              internet’s go-to hub for discovering and following tech blogs
              across various companies and categories, saving you time while
              expanding your knowledge horizon.
              <br />
              <br />
              Our platform is built on the belief that learning from the best
              minds in the industry shouldn’t require endless searching. It
              should be efficient, inspiring, and centralized.
            </p>
          </div>
          <div className="para_3 my-6">
            <h1 className="font-bold text-3xl mb-4">What We Do</h1>
            <p className="text-justify text-[18px]">
              At its core, Big4Bytes is a content aggregator that sources blog
              articles from major technology companies and industry leaders. We
              continuously track and update links to blog posts across various
              domains and group them under intuitive categories such as:
            </p>
          </div>
          <div className="ul_list para_4 my-6">
            {
              <ul className="list-disc pl-5 space-y-2">
                {categories.map((category, index) => (
                  <li key={index} className="font-bold text-gray-800">
                    {category}
                  </li>
                ))}
              </ul>
            }
          </div>
          <div className="para_4 my-6">
            <p className="text-justify text-[18px]">
              Each category houses posts from multiple companies, ensuring a
              rich blend of perspectives and approaches. Want to read about
              Kubernetes deployments from both Red Hat and Google? Curious about
              how fintech startups approach mobile development versus
              traditional banks? Big4Bytes lets you explore all that, with zero
              friction.
              <br />
              <br />
              We don’t just list links—we contextualize them. You’ll find post
              metadata such as publish dates, blog authors, source companies,
              and quick summaries, so you can make an informed choice on what to
              read next.
            </p>
          </div>
          <div className="para_5 my-6">
            <h1 className="font-bold text-3xl mb-4">Who Is This For?</h1>
            <p className="text-justify text-[18px]">
              Big4Bytes is for anyone who thrives on staying informed and
              inspired:
            </p>
            <div className="ul_list para_4 my-6">
              {
                <ul className="list-disc pl-5 space-y-2">
                  {targetAudiences.map((category, index) => (
                    <li key={index} className="font-bold text-gray-800">
                      {category}
                    </li>
                  ))}
                </ul>
              }
            </div>
            <p className="text-justify text-[18px]">
              We are not just another tech newsletter or blogging site. We are a
              discovery engine for the curious mind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
