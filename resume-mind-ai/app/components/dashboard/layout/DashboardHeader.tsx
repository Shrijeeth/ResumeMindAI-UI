"use client";

import { useState } from "react";

interface DashboardHeaderProps {
  title: string;
  onMobileMenuToggle?: () => void;
}

export default function DashboardHeader({
  title,
  onMobileMenuToggle,
}: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-sm">
              hub
            </span>
          </div>
        </div>

        {/* Page Title */}
        <h1 className="text-lg sm:text-xl font-semibold text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="hidden sm:block relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            search
          </span>
          <input
            type="text"
            placeholder="Search entities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 pl-10 pr-4 py-2 text-sm bg-slate-800/50 border border-slate-700/50 rounded-full text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Mobile Search Button */}
        <button className="sm:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <span className="material-symbols-outlined">search</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
      </div>
    </header>
  );
}
