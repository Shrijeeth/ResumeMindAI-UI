interface SettingsComingSoonProps {
  title: string;
  description: string;
  icon: string;
}

export default function SettingsComingSoon({
  title,
  description,
  icon,
}: SettingsComingSoonProps) {
  return (
    <div className="max-w-md mx-auto py-12">
      <div className="glass-card p-8 rounded-2xl text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-primary text-3xl">
            {icon}
          </span>
        </div>

        <h1 className="text-xl font-bold text-white mb-3">{title}</h1>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
          <span className="material-symbols-outlined text-orange-400 text-sm">
            construction
          </span>
          <span className="text-orange-400 text-xs font-medium">
            Coming Soon
          </span>
        </div>

        <p className="text-slate-400 text-sm">{description}</p>
      </div>
    </div>
  );
}
