import Navbar from './components/layout/Navbar';
import HeroSection from './components/hero/HeroSection';
import FeaturesSection from './components/features/FeaturesSection';
import HowItWorksSection from './components/process/HowItWorksSection';
import TechnologyBanner from './components/trust/TechnologyBanner';
import GetStartedSection from './components/cta/GetStartedSection';
import Footer from './components/layout/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TechnologyBanner />
        <GetStartedSection />
      </main>
      <Footer />
    </>
  );
}
