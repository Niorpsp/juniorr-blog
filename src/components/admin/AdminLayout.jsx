import { useMemo, useState } from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Tag,
  User,
  Bell,
  Lock,
  LogOut,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import blogPosts from "@/data/blogPosts";

const initialArticles = blogPosts.map((post, index) => ({
  ...post,
  id: String(post.id),
  status: index % 2 === 0 ? "draft" : "published",
  updatedAt: post.date,
}));

const initialCategories = [
  { id: "highlight", name: "Highlight" },
  { id: "cat", name: "Cat" },
  { id: "inspiration", name: "Inspiration" },
  { id: "general", name: "General" },
];

const initialNotifications = [
  {
    id: "1",
    title: "New article draft created",
    message: "A draft article was saved successfully.",
    date: "2024-09-10",
    target: "/admin/articles",
    type: "article",
  },
  {
    id: "2",
    title: "Category updated",
    message: "The category list has been changed.",
    date: "2024-09-09",
    target: "/admin/categories",
    type: "category",
  },
  {
    id: "3",
    title: "Password reset pending",
    message: "A password reset request is waiting for confirmation.",
    date: "2024-09-08",
    target: "/admin/reset-password",
    type: "password",
  },
];

export default function AdminLayout() {
  const [articles, setArticles] = useState(initialArticles);
  const [categories, setCategories] = useState(initialCategories);
  const [profile, setProfile] = useState({
    name: "Niorr Blog Admin",
    email: "admin@niorrblog.com",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
  });
  const [notifications, setNotifications] = useState(initialNotifications);
  const navigate = useNavigate();

  const onSaveArticle = (article) => {
    setArticles((current) => {
      const existingIndex = current.findIndex((item) => item.id === article.id);
      if (existingIndex >= 0) {
        const next = [...current];
        next[existingIndex] = {
          ...article,
          updatedAt: new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        };
        return next;
      }
      return [
        {
          ...article,
          id: String(Date.now()),
          updatedAt: new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        },
        ...current,
      ];
    });

    toast.success(
      article.status === "published"
        ? "Article published successfully."
        : "Draft saved successfully.",
    );
    navigate("/admin/articles");
  };

  const onDeleteArticle = (articleId) => {
    setArticles((current) =>
      current.filter((article) => article.id !== articleId),
    );
    toast.success("Article deleted successfully.");
  };

  const onSaveCategory = (category) => {
    setCategories((current) => {
      const existingIndex = current.findIndex(
        (item) => item.id === category.id,
      );
      if (existingIndex >= 0) {
        const next = [...current];
        next[existingIndex] = category;
        return next;
      }
      return [{ ...category, id: String(Date.now()) }, ...current];
    });

    toast.success(
      category.id
        ? "Category updated successfully."
        : "Category created successfully.",
    );
  };

  const onDeleteCategory = (categoryId) => {
    setCategories((current) =>
      current.filter((category) => category.id !== categoryId),
    );
    toast.success("Category deleted successfully.");
  };

  const onUpdateProfile = (nextProfile) => {
    setProfile(nextProfile);
    toast.success("Profile saved successfully.");
  };

  const onResetPassword = () => {
    toast.success("Password reset successfully.");
  };

  const navItems = [
    { to: "/admin/articles", label: "Article management", icon: FileText },
    { to: "/admin/categories", label: "Category management", icon: Tag },
    { to: "/admin/profile", label: "Profile", icon: User },
    { to: "/admin/notifications", label: "Notification", icon: Bell },
    { to: "/admin/reset-password", label: "Reset password", icon: Lock },
  ];

  const contextValue = useMemo(
    () => ({
      articles,
      categories,
      profile,
      notifications,
      onSaveArticle,
      onDeleteArticle,
      onSaveCategory,
      onDeleteCategory,
      onUpdateProfile,
      onResetPassword,
    }),
    [articles, categories, profile, notifications],
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 lg:px-8">
        <aside className="hidden w-80 shrink-0 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:block">
          <div className="mb-8">
            <div className="text-sm uppercase tracking-[0.3em] text-slate-500">
              Admin Panel
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950">
              Niorr Blog
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Manage articles, categories, profile and notifications.
            </p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-slate-950 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-10 rounded-3xl bg-slate-100 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Quick summary</p>
            <p className="mt-3">Articles: {articles.length}</p>
            <p className="mt-2">Categories: {categories.length}</p>
            <p className="mt-2">Notifications: {notifications.length}</p>
          </div>
        </aside>

        <section className="flex-1">
          <div className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-500">Admin Workspace</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-950">
                Content management
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
                {profile.name}
              </div>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                <LogOut size={16} />
                Exit admin
              </button>
            </div>
          </div>

          <Outlet context={contextValue} />
        </section>
      </div>
    </div>
  );
}
