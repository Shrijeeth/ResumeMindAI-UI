import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <span
                className="material-symbols-outlined text-white text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                hub
              </span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              ResumeMindAI
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              href="/#features"
            >
              Features
            </Link>
            <Link
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              href="/#how-it-works"
            >
              How it Works
            </Link>
            <Link
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              href="/#insights"
            >
              Insights
            </Link>
            <Link
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              href="/contact"
            >
              Contact
            </Link>
            <Link
              className="bg-primary hover:bg-violet-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary/25"
              href="/auth/login"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
