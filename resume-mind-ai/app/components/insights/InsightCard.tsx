interface InsightCardProps {
  icon: string;
  iconColor: string;
  iconTextColor: string;
  title: string;
  description: string;
}

export default function InsightCard({
  icon,
  iconColor,
  iconTextColor,
  title,
  description,
}: InsightCardProps) {
  return (
    <div className="glass-card p-10 rounded-[2.5rem] transition-all group flex flex-col items-center text-center">
      <div
        className={`w-20 h-20 ${iconColor} rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(139,92,246,0.2)] group-hover:bg-opacity-30 transition-all`}
      >
        <span className={`material-symbols-outlined text-4xl ${iconTextColor}`}>
          {icon}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
