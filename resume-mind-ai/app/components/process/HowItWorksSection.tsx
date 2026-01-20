import ProcessStep from "./ProcessStep";

export default function HowItWorksSection() {
  const steps = [
    {
      stepNumber: 1,
      icon: "cloud_upload",
      title: "Upload Resume",
      description:
        "Simply drop your PDF or Word document into our secure web interface. We handle the rest.",
    },
    {
      stepNumber: 2,
      icon: "processing_cluster",
      title: "AI Processing",
      description:
        "Our GraphRAG engine cleanses data and identifies deep semantic nodes and professional relationships.",
    },
    {
      stepNumber: 3,
      icon: "travel_explore",
      title: "Explore Insights",
      description:
        "Interact with your graph, ask our AI assistant career questions, and discover high-value opportunities.",
    },
  ];

  return (
    <section className="py-24 bg-slate-900/50" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            From PDF to Intelligence
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Three simple steps to unlock your professional potential.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>
          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              stepNumber={step.stepNumber}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
