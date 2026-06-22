import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#EFEEEB] px-4 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <span className="font-semibold text-slate-950">Get in touch</span>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.06h4.56V24H.22V8.06zm7.11 0h4.37v2.17h.06c.61-1.16 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 6.98V24h-4.57v-8.41c0-2.01-.04-4.6-2.8-4.6-2.8 0-3.23 2.18-3.23 4.43V24H7.33V8.06z" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .5C5.73.5.75 5.48.75 11.77c0 4.93 3.19 9.11 7.61 10.59.56.1.77-.24.77-.54 0-.27-.01-1.16-.02-2.11-3.09.67-3.75-1.37-3.75-1.37-.5-1.28-1.22-1.62-1.22-1.62-.99-.67.07-.66.07-.66 1.09.08 1.66 1.12 1.66 1.12.98 1.68 2.57 1.19 3.2.91.1-.71.38-1.19.69-1.46-2.47-.28-5.06-1.24-5.06-5.5 0-1.21.43-2.2 1.13-2.98-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.12.88-.25 1.82-.38 2.76-.38.94 0 1.88.13 2.76.38 2.1-1.42 3.02-1.12 3.02-1.12.6 1.52.22 2.64.11 2.92.7.78 1.13 1.77 1.13 2.98 0 4.27-2.59 5.22-5.06 5.5.39.34.74 1.01.74 2.05 0 1.48-.01 2.67-.01 3.03 0 .3.2.65.78.54C19.06 20.88 22.25 16.7 22.25 11.77 22.25 5.48 17.27.5 12 .5z" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>

        <a href="/" className="font-medium text-slate-900 underline decoration-slate-400 decoration-2 underline-offset-4 hover:text-slate-700">
          Home page
        </a>
      </div>
    </footer>
  );
}
