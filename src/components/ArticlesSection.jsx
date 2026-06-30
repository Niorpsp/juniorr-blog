import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BlogCard from "./BlogCard";
import blogPosts from "@/data/blogPosts";

export default function ArticlesSection() {
  const [activeCategory, setActiveCategory] = useState("highlight");

  const categories = [
    { value: "highlight", label: "Highlight" },
    { value: "cat", label: "Cat" },
    { value: "inspiration", label: "Inspiration" },
    { value: "general", label: "General" },
  ];

  // Filter blog posts based on active category
  const filteredPosts = activeCategory === "highlight" 
    ? blogPosts 
    : blogPosts.filter(post => post.category.toLowerCase() === activeCategory);

  return (
    <section className="mx-auto mb-10 max-w-7xl px-4 md:px-6 lg:px-8">
      
      {/* Title */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">
          Latest articles
        </h2>
      </div>


      {/* Search + Category */}
      <div
        className="
          flex flex-col gap-4
          rounded-[2rem]
          bg-[#EFEEEB]
          px-5 py-4
          md:flex-row
          md:items-center
          md:justify-between
        "
      >

        {/* Desktop Category */}
        <div className="hidden md:flex flex-wrap gap-3">
          {categories.map((category) => {
            const isActive = activeCategory === category.value;

            return (
              <button
                key={category.value}
                type="button"
                onClick={() => setActiveCategory(category.value)}
                className={`
                  rounded-full
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  transition

                  ${
                    isActive
                      ? "bg-slate-950 text-white"
                      : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                  }
                `}
              >
                {category.label}
              </button>
            );
          })}
        </div>


        {/* Mobile Category */}
        <div className="w-full md:hidden">
          <Select
            value={activeCategory}
            onValueChange={(value) => setActiveCategory(value)}
          >

            <SelectTrigger
              className="
                w-full
                rounded-full
                border
                border-slate-200
                bg-white
                px-5
                py-3
                text-sm
                text-slate-900
              "
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>


            <SelectContent>
              {categories.map((category) => (
                <SelectItem
                  key={category.value}
                  value={category.value}
                >
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>


          </Select>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-82.5">
          <Search
            className="
              pointer-events-none
              absolute
              right-4
              top-1/2
              h-5
              w-5
              -translate-y-1/2
              text-slate-400
            "
          />

          <Input
            type="text"
            placeholder="Search"
            className="
              w-full
              rounded-full
              border
              border-slate-200
              bg-white
              px-5
              py-3
              text-sm
              text-slate-900
              placeholder:text-slate-400
              focus:border-slate-300
              focus:ring-0
            "
          />
        </div>

      </div>

      {/* Blog Cards Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.map((post) => (
          <BlogCard
            key={post.id}
            image={post.image}
            category={post.category}
            title={post.title}
            description={post.description}
            author={post.author}
            date={post.date}
          />
        ))}
      </div>

    </section>
  );
}