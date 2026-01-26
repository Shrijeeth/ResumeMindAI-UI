import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatusBadge from "../StatusBadge";
import type { DocumentStatus } from "@/app/lib/types/document";

describe("StatusBadge", () => {
  const statuses: {
    status: DocumentStatus;
    label: string;
    hasAnimation: boolean;
  }[] = [
    { status: "pending", label: "Pending", hasAnimation: false },
    { status: "uploading", label: "Uploading", hasAnimation: true },
    { status: "validating", label: "Validating", hasAnimation: true },
    { status: "parsing", label: "Processing", hasAnimation: true },
    { status: "completed", label: "Completed", hasAnimation: false },
    { status: "invalid", label: "Invalid", hasAnimation: false },
    { status: "failed", label: "Failed", hasAnimation: false },
  ];

  it.each(statuses)(
    "renders correct label for $status status",
    ({ status, label }) => {
      render(<StatusBadge status={status} />);
      expect(screen.getByText(label)).toBeVisible();
    },
  );

  it("renders with status dot by default", () => {
    render(<StatusBadge status="completed" />);
    const badge = screen.getByText("Completed").closest("span");
    expect(badge?.querySelector("span")).toBeInTheDocument();
  });

  it("hides status dot when showDot is false", () => {
    render(<StatusBadge status="completed" showDot={false} />);
    const badge = screen.getByText("Completed");
    // Should only have the text, no child span for dot
    expect(badge.children.length).toBe(0);
  });

  it.each(statuses.filter((s) => s.hasAnimation))(
    "shows animation for $status status",
    ({ status }) => {
      render(<StatusBadge status={status} />);
      const badge = screen
        .getByText(/uploading|validating|processing/i)
        .closest("span");
      const dot = badge?.querySelector("span");
      expect(dot?.className).toContain("animate-pulse");
    },
  );

  it.each(statuses.filter((s) => !s.hasAnimation))(
    "does not animate for $status status",
    ({ status, label }) => {
      render(<StatusBadge status={status} />);
      const badge = screen.getByText(label).closest("span");
      const dot = badge?.querySelector("span");
      if (dot) {
        expect(dot.className).not.toContain("animate-pulse");
      }
    },
  );

  it("applies correct color classes for completed status", () => {
    render(<StatusBadge status="completed" />);
    const badge = screen.getByText("Completed").closest("span");
    expect(badge?.className).toContain("text-emerald-400");
    expect(badge?.className).toContain("bg-emerald-500/10");
  });

  it("applies correct color classes for failed status", () => {
    render(<StatusBadge status="failed" />);
    const badge = screen.getByText("Failed").closest("span");
    expect(badge?.className).toContain("text-red-400");
    expect(badge?.className).toContain("bg-red-500/10");
  });
});
