import { Menu } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="border-b border-slate-200 bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-8">
        <a href="/" className="text-2xl font-extrabold tracking-tight text-slate-950">
          hh.
        </a>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="rounded-full border border-slate-300 px-6 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="rounded-full bg-slate-950 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Sign up
          </a>
        </div>

        <button className="md:hidden rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm">
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
}
