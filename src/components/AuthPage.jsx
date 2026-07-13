import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle2,
  Lock,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const USERS_STORAGE_KEY = "juniorr-blog-users";
const CURRENT_USER_STORAGE_KEY = "juniorr-blog-current-user";

function readUsers() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export default function AuthPage({ mode = "signup", onAuthSuccess }) {
  const isSignup = mode === "signup";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (isSignup) {
      if (!formData.name.trim()) {
        nextErrors.name = "Please enter your full name.";
      } else if (formData.name.trim().length < 2) {
        nextErrors.name = "Name must be at least 2 characters.";
      }
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      nextErrors.password = isSignup
        ? "Please enter a password."
        : "Please enter your password.";
    } else if (isSignup && formData.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (isSignup) {
      if (!formData.confirmPassword) {
        nextErrors.confirmPassword = "Please confirm your password.";
      } else if (formData.confirmPassword !== formData.password) {
        nextErrors.confirmPassword = "Passwords do not match.";
      }

      const existingUsers = readUsers();
      const isDuplicateEmail = existingUsers.some(
        (user) =>
          user.email.toLowerCase() === formData.email.trim().toLowerCase(),
      );

      if (isDuplicateEmail) {
        nextErrors.email = "This email is already registered.";
      }
    }

    setErrors(nextErrors);
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix the highlighted fields before continuing.");
      return;
    }

    if (isSignup) {
      const users = readUsers();
      const newUser = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      saveUsers([...users, newUser]);
      setIsSuccess(true);
      toast.success("Account created successfully.");
      return;
    }

    const users = readUsers();
    const matchedUser = users.find(
      (user) =>
        user.email.toLowerCase() === formData.email.trim().toLowerCase() &&
        user.password === formData.password,
    );

    if (!matchedUser) {
      setErrors({
        email: "We could not find an account with that email.",
        password: "The password you entered is incorrect.",
      });
      toast.error("We could not sign you in with those details.");
      return;
    }

    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(matchedUser));
    if (onAuthSuccess) {
      onAuthSuccess(matchedUser);
    }
    toast.success(`Welcome back, ${matchedUser.name.split(" ")[0]}!`);
    navigate("/account");
  };

  const handleContinue = () => {
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    navigate("/login");
  };

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_80px_-40px_rgba(15,23,42,0.45)]">
        <div className="hidden flex-1 flex-col justify-between bg-slate-950 p-10 text-white lg:flex">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">
              <Sparkles size={16} />
              JuniorR Blog
            </div>
            <h1 className="mt-8 text-4xl font-semibold leading-tight">
              {isSignup
                ? "Join the community of thoughtful readers."
                : "Pick up where you left off."}
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
              {isSignup
                ? "Create your account to save your favorite posts and join the conversation."
                : "Sign in to continue reading and managing your reading list."}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
            <p className="text-sm font-medium text-slate-200">Why join?</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>• Curated stories from the latest tech and design world</li>
              <li>• Personalized reading experience</li>
              <li>• Stay updated with new posts every week</li>
            </ul>
          </div>
        </div>

        <div className="flex-1 p-8 sm:p-10 lg:p-12">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              {isSignup ? "Sign up" : "Log in"}
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              {isSignup ? "Create your account" : "Welcome back"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {isSignup
                ? "Start your journey with a few quick details."
                : "Enter your details to continue to your account."}
            </p>
          </div>

          {isSuccess ? (
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-slate-950">
                Registration complete
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Your account has been created successfully. Continue to sign in
                and start exploring the blog.
              </p>
              <Button className="mt-6 w-full" onClick={handleContinue}>
                Continue
              </Button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {isSignup && (
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-slate-700"
                    htmlFor="name"
                  >
                    Full name
                  </label>
                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="h-11 pl-10"
                    />
                  </div>
                  {errors.name ? (
                    <p className="mt-2 flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle size={14} /> {errors.name}
                    </p>
                  ) : null}
                </div>
              )}

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-slate-700"
                  htmlFor="email"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="h-11 pl-10"
                  />
                </div>
                {errors.email ? (
                  <p className="mt-2 flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle size={14} /> {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-slate-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={
                      isSignup ? "Minimum 8 characters" : "Enter your password"
                    }
                    className="h-11 pl-10"
                  />
                </div>
                {errors.password ? (
                  <p className="mt-2 flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle size={14} /> {errors.password}
                  </p>
                ) : null}
              </div>

              {isSignup && (
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-slate-700"
                    htmlFor="confirmPassword"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter your password"
                      className="h-11 pl-10"
                    />
                  </div>
                  {errors.confirmPassword ? (
                    <p className="mt-2 flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle size={14} /> {errors.confirmPassword}
                    </p>
                  ) : null}
                </div>
              )}

              <Button type="submit" className="w-full py-5 text-base">
                {isSignup ? "Create account" : "Log in"}
              </Button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-slate-600">
            {isSignup ? "Already have an account?" : "Need an account?"}{" "}
            <Link
              to={isSignup ? "/login" : "/signup"}
              className="font-semibold text-slate-950 transition hover:text-slate-700"
            >
              {isSignup ? "Log in" : "Sign up"}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
