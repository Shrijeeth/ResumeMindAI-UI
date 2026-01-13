interface FeatureCardProps {
  icon: string;
  iconColor: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, iconColor, title, description }: FeatureCardProps) {
  return (
    <div className="glass-card p-8 rounded-3xl border border-slate-800 hover:border-primary/50 transition-all group">
      <div className={`w-14 h-14 ${iconColor} rounded-2xl flex items-center justify-center mb-6 group-hover:bg-opacity-30 transition-colors`}>
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
