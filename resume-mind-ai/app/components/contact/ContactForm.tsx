"use client";

import { FormEvent, useState } from "react";

const WEB3FORMS_URL =
  process.env.NEXT_PUBLIC_WEB3FORMS_URL ?? "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    if (!WEB3FORMS_KEY) {
      setResult("Missing form configuration. Please try again later.");
      setIsSubmitting(false);
      return;
    }

    setResult("Sending...");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_KEY);

    try {
      const response = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await response.json().catch(() => null);

      const wasSuccess = data?.success ?? response.ok;

      if (!response.ok) {
        setResult(
          data?.message ?? `Error sending message (status ${response.status})`,
        );
        return;
      }

      if (wasSuccess) {
        setResult(data?.message ?? "Form submitted successfully");
        e.currentTarget.reset();
      } else {
        setResult(data?.message ?? "Error sending message");
      }
    } catch (error) {
      console.error("Web3Forms submission error", error);
      setResult("Network error, please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border-slate-700/50 shadow-2xl w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-slate-300 ml-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-white placeholder:text-slate-600 outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-slate-300 ml-1"
            >
              Work Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@company.com"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-white placeholder:text-slate-600 outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="text-sm font-semibold text-slate-300 ml-1"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="How can we help?"
            className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-white placeholder:text-slate-600 outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-semibold text-slate-300 ml-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us more about your inquiry..."
            rows={5}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-white placeholder:text-slate-600 outline-none resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="group relative w-full overflow-hidden rounded-2xl bg-slate-900/60 text-white font-semibold py-5 shadow-lg shadow-primary/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 hover:bg-slate-900 hover:shadow-xl hover:shadow-primary/30 active:translate-y-px border border-slate-600/80"
        >
          <span
            className="absolute inset-0 rounded-2xl border border-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            aria-hidden
          />
          <span className="relative flex items-center justify-center gap-2 text-lg">
            <span className="material-symbols-outlined text-xl transition-transform duration-200 group-hover:translate-x-1">
              send
            </span>
            Send Message
          </span>
        </button>

        {result && (
          <p
            className="text-center text-sm text-slate-300"
            role="status"
            aria-live="polite"
          >
            {result}
          </p>
        )}
      </form>
    </div>
  );
}
