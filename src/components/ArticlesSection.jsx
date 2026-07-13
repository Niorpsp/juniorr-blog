import { useEffect, useMemo, useState } from "react";
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
  // -----------------------------
  // State
  // -----------------------------
  const [activeCategory, setActiveCategory] = useState("highlight");
  const [searchText, setSearchText] = useState("");
  const [keyword, setKeyword] = useState("");

  // -----------------------------
  // Category
  // -----------------------------

  // ใช้สร้างปุ่ม Desktop
  // และ Dropdown บน Mobile
  const categories = [
    { value: "highlight", label: "Highlight" },
    { value: "Cat", label: "Cat" },
    { value: "Inspiration", label: "Inspiration" },
    { value: "General", label: "General" },
  ];

  // -----------------------------
  // Filter local blog post data
  // -----------------------------
  const filteredPosts = useMemo(() => {
    let results = blogPosts;

    if (activeCategory !== "highlight") {
      results = results.filter((post) => post.category === activeCategory);
    }

    if (keyword) {
      const search = keyword.toLowerCase();
      results = results.filter(
        (post) =>
          post.title.toLowerCase().includes(search) ||
          post.description.toLowerCase().includes(search) ||
          post.content.toLowerCase().includes(search),
      );
    }

    return results;
  }, [activeCategory, keyword]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setKeyword(searchText.trim());
    }, 500);

    return () => window.clearTimeout(timer);
  }, [searchText]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <section className="mx-auto mb-10 max-w-7xl px-4 md:px-6 lg:px-8">
      {/* Title */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Latest articles
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Showing {filteredPosts.length} articles
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-slate-600">
          {activeCategory !== "highlight" && (
            <span className="rounded-full bg-slate-100 px-3 py-1">
              Category:{" "}
              {categories.find((item) => item.value === activeCategory)
                ?.label ?? activeCategory}
            </span>
          )}
          {keyword && (
            <span className="rounded-full bg-slate-100 px-3 py-1">
              Search: {keyword}
            </span>
          )}
        </div>
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
                disabled={isActive}
                onClick={() => handleCategoryChange(category.value)}
                className={`
                  rounded-full
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  transition
                  disabled:cursor-not-allowed
                  ${
                    isActive
                      ? "bg-slate-950 text-white"
                      : "bg-slate-100 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-200"
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
            onValueChange={(value) => handleCategoryChange(value)}
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
                <SelectItem key={category.value} value={category.value}>
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
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
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

      {!filteredPosts.length && (
        <p className="mt-8 text-center text-slate-600">
          No posts found for the selected filters.
        </p>
      )}

      {filteredPosts.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              image={post.image}
              category={post.category}
              title={post.title}
              description={post.description}
              author={post.author}
              date={post.date}
            />
          ))}
        </div>
      )}
    </section>
  );
}
