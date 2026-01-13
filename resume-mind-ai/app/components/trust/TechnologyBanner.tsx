export default function TechnologyBanner() {
  const technologies = [
    { icon: 'database', name: 'FalkorDB' },
    { icon: 'terminal', name: 'LiteLLM' },
    { icon: 'memory', name: 'OpenAI' },
    { icon: 'token', name: 'Anthropic' }
  ];

  return (
    <section className="py-20 border-y border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-slate-500 font-semibold uppercase tracking-widest text-xs mb-10">
          Powered by cutting-edge AI technology
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 hover:opacity-100 transition-opacity">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 grayscale hover:grayscale-0 transition-all cursor-default"
            >
              <span className="material-symbols-outlined text-3xl">{tech.icon}</span>
              <span className="text-xl font-bold font-mono">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
