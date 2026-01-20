import { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - ResumeMindAI",
  description:
    "Get in touch with ResumeMindAI. Have questions about our graph-based career intelligence? We are here to help you map your future.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="80" cy="20" r="1" fill="#8B5CF6" />
          <circle cx="90" cy="40" r="0.5" fill="#8B5CF6" />
          <circle cx="70" cy="50" r="0.7" fill="#8B5CF6" />
          <line
            x1="80"
            y1="20"
            x2="90"
            y2="40"
            stroke="#8B5CF6"
            strokeWidth="0.1"
          />
          <line
            x1="80"
            y1="20"
            x2="70"
            y2="50"
            stroke="#8B5CF6"
            strokeWidth="0.1"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="20" cy="80" r="1" fill="#3B82F6" />
          <circle cx="10" cy="60" r="0.5" fill="#3B82F6" />
          <circle cx="30" cy="50" r="0.7" fill="#3B82F6" />
          <line
            x1="20"
            y1="80"
            x2="10"
            y2="60"
            stroke="#3B82F6"
            strokeWidth="0.1"
          />
          <line
            x1="20"
            y1="80"
            x2="30"
            y2="50"
            stroke="#3B82F6"
            strokeWidth="0.1"
          />
        </svg>
      </div>

      <Navbar />

      <main className="flex-grow flex items-center py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
