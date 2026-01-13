export default function DashboardMockup() {
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
          <div className="col-span-3 border-r border-slate-800 bg-slate-900/80 p-6">
            <div className="space-y-6">
              <div className="h-8 w-3/4 bg-slate-800 rounded-md"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-slate-800/50 rounded-sm"></div>
                <div className="h-4 w-5/6 bg-slate-800/50 rounded-sm"></div>
                <div className="h-4 w-4/6 bg-slate-800/50 rounded-sm"></div>
              </div>
              <div className="pt-10">
                <div className="h-32 w-full border-2 border-dashed border-slate-800 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-700 text-3xl">upload_file</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9 p-8 bg-slate-950 relative overflow-hidden">
            {/* Graph Visualization Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40">
              <div className="relative w-full h-full">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-primary/20"></div>
                <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_var(--primary)]"></div>
                <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_15px_#3b82f6]"></div>
                <div className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-purple-400"></div>
                <svg className="absolute inset-0 w-full h-full" stroke="rgba(139, 92, 246, 0.1)">
                  <line strokeWidth="1" x1="25%" x2="50%" y1="25%" y2="50%"></line>
                  <line strokeWidth="1" x1="75%" x2="50%" y1="50%" y2="50%"></line>
                  <line strokeWidth="1" x1="33%" x2="50%" y1="66%" y2="50%"></line>
                </svg>
              </div>
            </div>

            {/* Info Cards */}
            <div className="relative grid grid-cols-2 gap-6">
              <div className="glass-card p-4 rounded-xl border-l-4 border-l-primary">
                <div className="text-[10px] uppercase font-bold text-primary mb-1">Entity Extraction</div>
                <div className="text-white text-sm font-semibold">Skill: Machine Learning</div>
                <div className="text-slate-400 text-[10px] mt-1 italic">Linked to 3 Professional Projects</div>
              </div>
              <div className="glass-card p-4 rounded-xl border-l-4 border-l-blue-400">
                <div className="text-[10px] uppercase font-bold text-blue-400 mb-1">Career Insight</div>
                <div className="text-white text-sm font-semibold">Leadership Readiness</div>
                <div className="text-slate-400 text-[10px] mt-1 italic">High impact score in management nodes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
