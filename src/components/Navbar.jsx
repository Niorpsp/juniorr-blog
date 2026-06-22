function NavBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-slate-50/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="/" className="text-2xl font-bold tracking-tight text-slate-950">
          hh.
        </a>

        <div className="flex items-center gap-3">
          <a
            href="#login"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Log in
          </a>
          <a
            href="#signup"
            className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-slate-900/10 transition hover:bg-slate-800"
          >
            Sign up
          </a>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
