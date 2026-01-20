import Link from "next/link";

export default function GetStartedSection() {
  return (
    <section className="py-32 relative overflow-hidden" id="get-started">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">
          Ready to Visualize Your Potential?
        </h2>
        <p className="text-slate-400 text-lg mb-12">
          Join thousands of professionals using AI to navigate their career
          paths more intelligently.
        </p>
        <div className="glass-card p-10 rounded-3xl border border-slate-700/50 shadow-2xl inline-block w-full max-w-xl">
          <h3 className="text-white font-bold text-xl mb-6">
            Create Your Free Account
          </h3>
          <Link
            className="flex items-center justify-center gap-4 bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] shadow-xl"
            href="/auth/login"
          >
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] ring-1 ring-slate-200">
              <svg
                aria-hidden="true"
                className="h-4.5 w-4.5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21.35 12.22c0-.64-.06-1.25-.18-1.84H12v3.48h5.24a4.48 4.48 0 0 1-1.94 2.94v2.44h3.14c1.84-1.7 2.91-4.2 2.91-7.02Z"
                  fill="#4285F4"
                />
                <path
                  d="M12 22c2.7 0 4.96-.9 6.61-2.45l-3.14-2.44c-.87.58-1.99.93-3.47.93-2.66 0-4.92-1.8-5.72-4.22H3.06v2.55A9.99 9.99 0 0 0 12 22Z"
                  fill="#34A853"
                />
                <path
                  d="M6.28 13.82A5.99 5.99 0 0 1 6 12c0-.63.11-1.24.28-1.82V7.63H3.06A9.99 9.99 0 0 0 2 12c0 1.6.38 3.1 1.06 4.37l3.22-2.55Z"
                  fill="#FBBC04"
                />
                <path
                  d="M12 6.98c1.47 0 2.78.51 3.81 1.51l2.86-2.86C16.95 3.94 14.69 3 12 3 8.06 3 4.66 5.34 3.06 8.63l3.22 2.55c.8-2.42 3.06-4.2 5.72-4.2Z"
                  fill="#EA4335"
                />
              </svg>
            </span>
            Continue with Google
          </Link>
          <p className="mt-6 text-slate-500 text-sm">
            No credit card required. Get 5 free resume scans monthly.
          </p>
        </div>
      </div>
    </section>
  );
}
