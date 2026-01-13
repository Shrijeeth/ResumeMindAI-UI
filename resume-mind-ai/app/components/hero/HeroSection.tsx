import DashboardMockup from './DashboardMockup';

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
          Build Your Professional<br />
          <span className="text-gradient">Knowledge Graph</span>
        </h1>

        {/* Description */}
        <p className="max-w-3xl mx-auto text-xl text-slate-400 mb-12 leading-relaxed">
          Stop looking at flat documents. Transform your career history into an interactive, AI-powered intelligence map that reveals hidden strengths and opportunities.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-20">
          <a
            className="w-full sm:w-auto px-10 py-4 bg-primary hover:bg-violet-600 text-white font-bold rounded-2xl shadow-xl shadow-primary/30 transition-all flex items-center justify-center gap-3 border-2 border-emerald-300/70 hover:border-emerald-200"
            href="#google-login"
          >
            <img
              alt="Google"
              className="w-5 h-5 bg-white rounded-full p-0.5"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuHcfGVdHqQACSrj3Kns-trJ5kFKFNhkeNEJaem6hO_x2kdvVvlXYPC2cdktL21ryFoXqC5DK7kUnX1CeRIEOQ3vKjNkFlBH9oh--iU9LoftZUt-eOM7fGj9pw5eABimgtwp2ueCb14gia3_9dNRP1JAmjO7F8V5DN_m60sOGkxtrAW6PFjlx9COT8c6Ek37JQFn8kT2B5bKdid4A781ZgRO0Hs5_wRtZrtIhC60C09Zn93br7Qwu1SvMJORsRQgj0aivElq2paxjG"
            />
            Get Started for Free
          </a>
          <a
            className="w-full sm:w-auto px-10 py-4 glass-card text-white font-semibold rounded-2xl hover:bg-slate-800 transition-all border border-slate-700/50 flex items-center justify-center gap-2"
            href="#demo"
          >
            <span className="material-symbols-outlined">play_circle</span> Watch Platform Tour
          </a>
        </div>

        {/* Dashboard Mockup */}
        <DashboardMockup />
      </div>
    </header>
  );
}
