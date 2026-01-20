import Link from "next/link";
import DashboardMockup from "./DashboardMockup";

export default function HeroSection() {
  return (
    <header className="relative pt-16 pb-32 overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold mb-8 tracking-wide uppercase">
          <span className="relative flex h-2 w-2 mr-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          Web Application Now Live
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-white">
          Build Your Professional
          <br />
          <span className="text-gradient">Knowledge Graph</span>
        </h1>

        {/* Description */}
        <p className="max-w-3xl mx-auto text-xl text-slate-400 mb-12 leading-relaxed">
          Stop looking at flat documents. Transform your career history into an
          interactive, AI-powered intelligence map that reveals hidden strengths
          and opportunities.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-20">
          <Link
            className="w-full sm:w-auto px-10 py-4 bg-primary hover:bg-violet-600 text-white font-bold rounded-2xl shadow-xl shadow-primary/30 transition-all flex items-center justify-center gap-3 border-2 border-emerald-300/70 hover:border-emerald-200"
            href="/auth/login"
          >
            <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-linear-to-br from-emerald-300 to-teal-500 shadow-[0_0_0_4px_rgba(16,185,129,0.18)]">
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5 text-slate-900 drop-shadow-sm"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </span>
            Get Started for Free
          </Link>
          <a
            className="w-full sm:w-auto px-10 py-4 glass-card text-white font-semibold rounded-2xl hover:bg-slate-800 transition-all border border-slate-700/50 flex items-center justify-center gap-2"
            href="#demo"
          >
            <span className="material-symbols-outlined">play_circle</span> Watch
            Platform Tour
          </a>
        </div>

        {/* Dashboard Mockup */}
        <DashboardMockup />
      </div>
    </header>
  );
}
