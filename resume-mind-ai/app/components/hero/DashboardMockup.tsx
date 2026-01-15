export default function DashboardMockup() {
  const sidebarItems = [
    { icon: 'dashboard', label: 'Dashboard', active: true },
    { icon: 'description', label: 'My Resumes', active: false },
    { icon: 'hub', label: 'Knowledge Graph', active: false },
    { icon: 'insights', label: 'Career Insights', active: false },
  ];

  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-3xl blur opacity-30"></div>
      <div className="relative bg-slate-900 rounded-2xl border border-slate-700/50 overflow-hidden dashboard-mockup-shadow shadow-2xl">
        {/* Browser Chrome */}
        <div className="bg-slate-800/80 border-b border-slate-700/50 px-4 py-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          <div className="mx-auto bg-slate-900/50 rounded px-12 py-1 text-[10px] text-slate-500 font-mono">
            app.resumemind.ai/dashboard
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-12 h-[500px] text-left">
          {/* Sidebar */}
          <div className="col-span-3 border-r border-slate-800 bg-slate-900/80 p-4">
            {/* Logo Area */}
            <div className="flex items-center gap-2 mb-6 px-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-lg">hub</span>
              </div>
              <span className="font-semibold text-white text-sm">ResumeMindAI</span>
            </div>

            {/* Navigation Items */}
            <div className="space-y-1 mb-6">
              {sidebarItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors ${
                    item.active
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-400'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Upload Area */}
            <div className="px-2">
              <div className="text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-wide">
                Quick Upload
              </div>
              <div className="h-28 w-full border-2 border-dashed border-primary/30 rounded-xl flex flex-col items-center justify-center gap-2 bg-primary/5">
                <span className="material-symbols-outlined text-primary text-2xl">
                  cloud_upload
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Drop Resume Here</span>
                <span className="text-[8px] text-slate-500">PDF, DOCX supported</span>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9 p-8 bg-slate-950 relative overflow-hidden">
            {/* Graph Visualization Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-70">
              <div className="relative w-full h-full">
                {/* Orbit circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-primary/20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-blue-400/15"></div>

                {/* SVG Connections */}
                <svg className="absolute inset-0 w-full h-full" strokeWidth="1.5">
                  {/* Primary connections */}
                  <line className="stroke-primary/40" x1="50%" y1="50%" x2="25%" y2="30%"></line>
                  <line className="stroke-blue-400/40" x1="50%" y1="50%" x2="70%" y2="35%"></line>
                  <line className="stroke-emerald-400/40" x1="50%" y1="50%" x2="30%" y2="70%"></line>
                  <line className="stroke-orange-400/40" x1="50%" y1="50%" x2="75%" y2="65%"></line>
                  {/* Secondary connections */}
                  <line className="stroke-primary/25" strokeWidth="1" x1="25%" y1="30%" x2="55%" y2="25%"></line>
                  <line className="stroke-blue-400/25" strokeWidth="1" x1="70%" y1="35%" x2="55%" y2="25%"></line>
                  <line className="stroke-emerald-400/25" strokeWidth="1" x1="30%" y1="70%" x2="40%" y2="55%"></line>
                  <line className="stroke-blue-400/25" strokeWidth="1" x1="75%" y1="65%" x2="70%" y2="35%"></line>
                </svg>

                {/* Central Skills Node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary shadow-[0_0_20px_var(--primary)] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/80"></div>
                </div>

                {/* ML Node (Purple) */}
                <div className="absolute top-[30%] left-[25%]">
                  <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_var(--primary)]"></div>
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] text-primary font-medium whitespace-nowrap">ML</span>
                </div>

                {/* Experience Node (Blue) */}
                <div className="absolute top-[35%] left-[70%]">
                  <div className="w-5 h-5 rounded-full bg-blue-400 shadow-[0_0_18px_#60a5fa]"></div>
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] text-blue-400 font-medium whitespace-nowrap">Experience</span>
                </div>

                {/* Education Node (Emerald) */}
                <div className="absolute top-[70%] left-[30%]">
                  <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_15px_#34d399]"></div>
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] text-emerald-400 font-medium whitespace-nowrap">Education</span>
                </div>

                {/* Projects Node (Orange) */}
                <div className="absolute top-[65%] left-[75%]">
                  <div className="w-4 h-4 rounded-full bg-orange-400 shadow-[0_0_15px_#fb923c]"></div>
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] text-orange-400 font-medium whitespace-nowrap">Projects</span>
                </div>

                {/* Secondary nodes (smaller, no labels) */}
                <div className="absolute top-[25%] left-[55%] w-3 h-3 rounded-full bg-blue-400/80 shadow-[0_0_12px_#60a5fa]"></div>
                <div className="absolute top-[55%] left-[40%] w-3 h-3 rounded-full bg-emerald-400/80 shadow-[0_0_12px_#34d399]"></div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="relative z-10">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {/* Entity Extraction Card */}
                <div className="glass-card p-4 rounded-xl border-l-4 border-l-primary hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary text-lg">auto_awesome</span>
                    <span className="text-[10px] uppercase font-bold text-primary tracking-wide">Entity Extraction</span>
                  </div>
                  <div className="text-white text-sm font-semibold">Skill: Machine Learning</div>
                  <div className="text-slate-400 text-[10px] mt-1">Linked to 3 Professional Projects</div>
                </div>

                {/* Career Insight Card */}
                <div className="glass-card p-4 rounded-xl border-l-4 border-l-blue-400 hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-blue-400 text-lg">insights</span>
                    <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wide">Career Insight</span>
                  </div>
                  <div className="text-white text-sm font-semibold">Leadership Readiness: High</div>
                  <div className="text-slate-400 text-[10px] mt-1">Based on 5 management indicators</div>
                </div>

                {/* Growth Path Card */}
                <div className="glass-card p-4 rounded-xl border-l-4 border-l-emerald-400 hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-emerald-400 text-lg">trending_up</span>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wide">Growth Path</span>
                  </div>
                  <div className="text-white text-sm font-semibold">Recommended: Cloud Skills</div>
                  <div className="text-slate-400 text-[10px] mt-1">+40% market demand</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
