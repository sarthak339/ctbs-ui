import BlogsByCategory from "@/src/components/BlogsByCategory";

export default function Page({ params }) {
  const category = params?.category; // make sure it's defined
  return <BlogsByCategory category={category} />;
}