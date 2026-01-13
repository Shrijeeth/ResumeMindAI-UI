export default function GetStartedSection() {
  return (
    <section className="py-32 relative overflow-hidden" id="get-started">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">
          Ready to Visualize Your Potential?
        </h2>
        <p className="text-slate-400 text-lg mb-12">
          Join thousands of professionals using AI to navigate their career paths more intelligently.
        </p>
        <div className="glass-card p-10 rounded-3xl border border-slate-700/50 shadow-2xl inline-block w-full max-w-xl">
          <h3 className="text-white font-bold text-xl mb-6">Create Your Free Account</h3>
          <a
            className="flex items-center justify-center gap-4 bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] shadow-xl"
            href="#google-login"
          >
            <img
              alt="Google"
              className="w-6 h-6"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVmYJqhC04XtW8NbN65Sg6uaHAQUtptJoqImICjr2c3IzhyGWHvkUHHHHHXWcZvyjVfqKUHmnDqtzkD-_Lw9jmQpX-9V9TXllla0aXXFH9TENKHQH6QipDDl1foxureCcU3Fx_T3SG8I4J8HIjXABfKAxv-4BsQCpjAQ4j4Htkl1ZbQJ8RpMUsfoaB3X6LOYFeDGsquaIAyT5igrE1S751_oRvfI2K_z5e9HVE2s75PXyV0TyhKQ8FRfy7xnF71L9NWHucW2ONQCjT"
            />
            Continue with Google
          </a>
          <p className="mt-6 text-slate-500 text-sm">No credit card required. Get 5 free resume scans monthly.</p>
        </div>
      </div>
    </section>
  );
}
