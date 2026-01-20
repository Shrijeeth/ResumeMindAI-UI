import InsightCard from "./InsightCard";

export default function InsightsSection() {
  const insights = [
    {
      icon: "bubble_chart",
      iconColor: "bg-primary/10",
      iconTextColor: "text-primary",
      title: "Graph-Based Skill Gap Analysis",
      description:
        "Visualizes your skill clusters using graph theory to identify missing nodes critical for your target trajectory.",
    },
    {
      icon: "show_chart",
      iconColor: "bg-blue-500/10",
      iconTextColor: "text-blue-400",
      title: "Career Trajectory Prediction",
      description:
        "Uses neural trend lines to forecast high-probability career paths based on historical node evolution and market data.",
    },
    {
      icon: "speed",
      iconColor: "bg-purple-500/10",
      iconTextColor: "text-purple-400",
      title: "Market Readiness Benchmarking",
      description:
        "Quantifies your professional 'impact score' against real-time industry benchmarks through multi-dimensional gauge analysis.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="insights">
      {/* Background Glow Effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">
            Analytical Power
          </h2>
          <p className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Advanced Career Insights
          </p>
          <p className="max-w-3xl mx-auto text-slate-400 text-lg leading-relaxed">
            Our AI goes beyond keyword matching to identify deep semantic
            relationships and professional potential that traditional resumes
            miss. Discover the underlying architecture of your career.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <InsightCard
              key={index}
              icon={insight.icon}
              iconColor={insight.iconColor}
              iconTextColor={insight.iconTextColor}
              title={insight.title}
              description={insight.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
