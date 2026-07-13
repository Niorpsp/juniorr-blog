import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import BlogCard from "@/components/BlogCard";

export default function ArticlesManagement() {
  const { articles, categories } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || article.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" || article.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [articles, searchTerm, statusFilter, categoryFilter]);

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-slate-500">Article management</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Manage all articles
          </h2>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Plus size={16} /> Create article
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search articles"
                className="pl-11"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
              >
                <option value="all">All statuses</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="rounded-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
              >
                <option value="all">All categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start gap-4">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-24 w-24 rounded-3xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                      <span className="rounded-full bg-slate-100 px-3 py-1">
                        {article.category}
                      </span>
                      <span>{article.status}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-950">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                      {article.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
                  <span>{article.author}</span>
                  <span>{article.updatedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-900">Summary</p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>Total articles: {articles.length}</p>
            <p>
              Drafts:{" "}
              {articles.filter((item) => item.status === "draft").length}
            </p>
            <p>
              Published:{" "}
              {articles.filter((item) => item.status === "published").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
