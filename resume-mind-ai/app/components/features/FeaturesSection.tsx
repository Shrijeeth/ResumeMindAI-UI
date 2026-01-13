import FeatureCard from './FeatureCard';

export default function FeaturesSection() {
  const features = [
    {
      icon: 'auto_awesome',
      iconColor: 'bg-primary/10',
      iconTextColor: 'text-primary',
      title: 'Automated AI Extraction',
      description: 'Proprietary RAG pipeline extracts entities and deep semantic relationships from any resume format with 99% accuracy.'
    },
    {
      icon: 'hub',
      iconColor: 'bg-blue-500/10',
      iconTextColor: 'text-blue-400',
      title: 'Interactive Graph Explorer',
      description: 'Navigate your career through a dynamic 3D graph interface. Visualize how skills, roles, and achievements interconnect.'
    },
    {
      icon: 'neurology',
      iconColor: 'bg-emerald-500/10',
      iconTextColor: 'text-emerald-400',
      title: 'Multi-LLM Integration',
      description: 'Leverage the power of GPT-4, Claude 3, or Llama 3. Choose your preferred intelligence engine for every analysis.'
    },
    {
      icon: 'insights',
      iconColor: 'bg-orange-500/10',
      iconTextColor: 'text-orange-400',
      title: 'Intelligent Career Insights',
      description: 'Get AI-driven recommendations on skill gaps, market value, and personalized career trajectories based on your graph.'
    }
  ];

  return (
    <section className="py-24" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">Core Platform</h2>
          <p className="text-4xl font-extrabold text-white mb-4">Enterprise-Grade Intelligence</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              iconColor={feature.iconColor}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
