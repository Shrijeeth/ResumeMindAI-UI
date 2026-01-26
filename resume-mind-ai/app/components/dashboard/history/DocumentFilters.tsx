"use client";

import type { DocumentStatus } from "@/app/lib/types/document";

interface DocumentFiltersProps {
  currentStatus: DocumentStatus | undefined;
  onStatusChange: (status: DocumentStatus | undefined) => void;
}

interface FilterOption {
  value: DocumentStatus | undefined;
  label: string;
}

const filterOptions: FilterOption[] = [
  { value: undefined, label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "uploading", label: "Uploading" },
  { value: "validating", label: "Validating" },
  { value: "parsing", label: "Processing" },
  { value: "completed", label: "Completed" },
  { value: "invalid", label: "Invalid" },
  { value: "failed", label: "Failed" },
];

export default function DocumentFilters({
  currentStatus,
  onStatusChange,
}: DocumentFiltersProps) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="status-filter" className="sr-only">
        Filter by status
      </label>
      <select
        id="status-filter"
        value={currentStatus || ""}
        onChange={(e) =>
          onStatusChange(
            e.target.value ? (e.target.value as DocumentStatus) : undefined,
          )
        }
        className="bg-slate-800 border border-slate-700/50 text-sm rounded-lg text-slate-300 focus:ring-primary focus:border-primary px-4 py-2.5 min-w-[140px]"
      >
        {filterOptions.map((option) => (
          <option key={option.label} value={option.value || ""}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
