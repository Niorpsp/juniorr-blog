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
import postsApi from "@/services/postsApi";

export default function ArticlesSection() {
  // -----------------------------
  // State
  // -----------------------------
  const [activeCategory, setActiveCategory] = useState("highlight");
  const [posts, setPosts] = useState(blogPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [keyword, setKeyword] = useState("");

  // -----------------------------
  // Category
  // -----------------------------

  // ใช้สร้างปุ่ม Desktop
  // และ Dropdown บน Mobile
  const categories = ["Highlight", "Cat", "Inspiration", "General"];

  // -----------------------------
  // ดึงข้อมูลบทความจาก API
  // -----------------------------
  const fetchPosts = async () => {
    setIsLoading(true);

    try {
      const params = {
        page: currentPage,
        limit,
        ...(activeCategory !== "highlight" && { category: activeCategory }),
        ...(keyword && { keyword }),
      };

      const response = await postsApi.get("/posts", { params });
      const data = response.data || {};

      setPosts(data.posts || []);
      setTotalPages(data.totalPages || 1);
      setTotalPosts(data.totalPosts || 0);
      setCurrentPage(data.currentPage || currentPage);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
      setTotalPages(1);
      setTotalPosts(0);
    } finally {
      setIsLoading(false);
    }
  };

  // -----------------------------
  // โหลดข้อมูลเมื่อเปิดเว็บไซต์ครั้งแรก และเมื่อ filter/search/page เปลี่ยน
  // -----------------------------
  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, currentPage, keyword]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCurrentPage(1);
      setKeyword(searchText.trim());
    }, 500);

    return () => window.clearTimeout(timer);
  }, [searchText]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    setCurrentPage(page);
  };

  const paginationRange = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const range = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    if (start > 1) {
      range.push(1);
      if (start > 2) range.push("start-ellipsis");
    }

    for (let page = start; page <= end; page += 1) {
      range.push(page);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) range.push("end-ellipsis");
      range.push(totalPages);
    }

    return range;
  }, [currentPage, totalPages]);

  return (
    <section className="mx-auto mb-10 max-w-7xl px-4 md:px-6 lg:px-8">
      {/* Title */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Latest articles
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Showing {posts.length} of {totalPosts} articles
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-slate-600">
          <span className="rounded-full bg-slate-100 px-3 py-1">
            Page {currentPage} / {totalPages}
          </span>
          {activeCategory !== "highlight" && (
            <span className="rounded-full bg-slate-100 px-3 py-1">
              Category: {activeCategory}
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
            const value = category.toLowerCase();
            const isActive = activeCategory === value;

            return (
              <button
                key={category}
                type="button"
                disabled={isActive}
                onClick={() => handleCategoryChange(value)}
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
                      : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                  }
                `}
              >
                {category}
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
              {categories.map((category) => {
                const value = category.toLowerCase();
                return (
                  <SelectItem key={category} value={value}>
                    {category}
                  </SelectItem>
                );
              })}
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

      {/* Loading */}
      {isLoading && <p className="mt-8 text-center">Loading...</p>}

      {!isLoading && posts.length === 0 && (
        <p className="mt-8 text-center text-slate-600">
          No posts found for the selected filters.
        </p>
      )}

      {!isLoading && posts.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {posts.map((post) => (
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

      {!isLoading && totalPages > 1 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          {paginationRange.map((page) => {
            if (page === "start-ellipsis" || page === "end-ellipsis") {
              return (
                <span key={page} className="px-3 text-sm text-slate-500">
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  page === currentPage
                    ? "bg-slate-950 text-white"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
