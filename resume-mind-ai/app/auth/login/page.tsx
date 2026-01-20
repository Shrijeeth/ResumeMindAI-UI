import type { Metadata } from "next";
import KnowledgeGraphBackground from "@/app/components/auth/KnowledgeGraphBackground";
import GoogleSignInButton from "@/app/components/auth/GoogleSignInButton";

export const metadata: Metadata = {
  title: "Login - ResumeMindAI",
  description:
    "Sign in to your ResumeMindAI account to access AI-powered career intelligence and profile mapping.",
};

export default function LoginPage() {
  return (
    <main className="text-slate-200 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Knowledge Graph Background */}
      <KnowledgeGraphBackground />

      {/* Login Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo and Branding */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 mb-6 border border-white/10">
            <span className="material-symbols-outlined text-4xl text-white">
              hub
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            ResumeMindAI
          </h1>
          <p className="text-sm text-slate-400 text-center max-w-xs">
            AI-powered career intelligence and profile mapping.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/50 backdrop-blur-2xl border border-slate-700/50 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-10">
          <div className="space-y-8">
            {/* Welcome Text */}
            <div className="text-center">
              <h2 className="text-xl font-medium text-white">Welcome Back</h2>
              <p className="text-sm text-slate-400 mt-2">
                Sign in to continue to your dashboard
              </p>
            </div>

            {/* Google Sign In Button */}
            <GoogleSignInButton />

            {/* Divider */}
            <div className="relative py-2">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-slate-700/50" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-slate-900/50 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                  Encrypted Gateway
                </span>
              </div>
            </div>

            {/* Legal Text */}
            <p className="text-[11px] text-slate-500 text-center leading-relaxed">
              By accessing the platform, you acknowledge and agree to our{" "}
              <a
                href="#"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-12 flex justify-center items-center gap-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
          <a
            href="#"
            className="hover:text-white transition-colors duration-200"
          >
            Legal
          </a>
          <div className="w-1 h-1 bg-slate-700 rounded-full" />
          <a
            href="#"
            className="hover:text-white transition-colors duration-200"
          >
            Status
          </a>
          <div className="w-1 h-1 bg-slate-700 rounded-full" />
          <a
            href="#"
            className="hover:text-white transition-colors duration-200"
          >
            Support
          </a>
        </div>
      </div>
    </main>
  );
}
