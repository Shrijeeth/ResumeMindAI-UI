interface ProcessStepProps {
  stepNumber: number;
  icon: string;
  title: string;
  description: string;
}

export default function ProcessStep({
  stepNumber,
  icon,
  title,
  description,
}: ProcessStepProps) {
  return (
    <div className="relative text-center">
      <div className="w-20 h-20 bg-background-dark border-4 border-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10 shadow-xl shadow-primary/10">
        <span className="material-symbols-outlined text-primary text-4xl">
          {icon}
        </span>
      </div>
      <h4 className="text-2xl font-bold text-white mb-4">
        {stepNumber}. {title}
      </h4>
      <p className="text-slate-400 px-6">{description}</p>
    </div>
  );
}
