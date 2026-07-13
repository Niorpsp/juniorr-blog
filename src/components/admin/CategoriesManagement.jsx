import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Search, Plus, Edit3, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CategoriesManagement() {
  const { categories } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [categories, searchTerm]);

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-slate-500">Category management</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Manage categories
          </h2>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Plus size={16} /> Create category
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search categories"
            className="pl-11"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5"
          >
            <div>
              <h3 className="text-lg font-semibold text-slate-950">
                {category.name}
              </h3>
              <p className="mt-1 text-sm text-slate-600">ID: {category.id}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <Edit3 size={16} /> Edit
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
