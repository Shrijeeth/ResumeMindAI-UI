import { render } from "@testing-library/react";
import InsightCardSkeleton from "../InsightCardSkeleton";

describe("InsightCardSkeleton", () => {
  it("renders skeleton card with correct structure", () => {
    const { container } = render(<InsightCardSkeleton />);

    const card = container.querySelector(".glass-card");
    expect(card).toBeVisible();
    expect(card).toHaveClass("p-5", "rounded-xl");
  });

  it("renders icon container skeleton", () => {
    const { container } = render(<InsightCardSkeleton />);

    const iconContainer = container.querySelector(
      ".p-2.bg-slate-700\\/50.rounded-lg",
    );
    expect(iconContainer).toBeVisible();
  });

  it("renders icon skeleton", () => {
    const { container } = render(<InsightCardSkeleton />);

    const iconSkeleton = container.querySelector(
      ".h-5.w-5.bg-slate-600\\/50.rounded.animate-pulse",
    );
    expect(iconSkeleton).toBeVisible();
  });

  it("renders title skeleton", () => {
    const { container } = render(<InsightCardSkeleton />);

    const titleSkeleton = container.querySelector(
      ".h-5.w-24.bg-slate-700\\/50.rounded.animate-pulse",
    );
    expect(titleSkeleton).toBeVisible();
  });

  it("renders description skeleton lines", () => {
    const { container } = render(<InsightCardSkeleton />);

    const descriptionContainer = container.querySelector(".space-y-2.mb-3");
    expect(descriptionContainer).toBeVisible();

    const descriptionLines = container.querySelectorAll(
      ".space-y-2.mb-3 .h-3.bg-slate-700\\/50.rounded.animate-pulse",
    );
    expect(descriptionLines).toHaveLength(2);

    const firstLine = container.querySelector(
      ".h-3.w-full.bg-slate-700\\/50.rounded.animate-pulse",
    );
    const secondLine = container.querySelector(
      ".h-3.w-3\\/4.bg-slate-700\\/50.rounded.animate-pulse",
    );
    expect(firstLine).toBeVisible();
    expect(secondLine).toBeVisible();
  });

  it("renders action link skeleton", () => {
    const { container } = render(<InsightCardSkeleton />);

    const actionSkeleton = container.querySelector(
      ".h-4.w-20.bg-slate-700\\/50.rounded.animate-pulse",
    );
    expect(actionSkeleton).toBeVisible();
  });

  it("renders all skeleton elements with animate-pulse class", () => {
    const { container } = render(<InsightCardSkeleton />);

    const pulsingElements = container.querySelectorAll(".animate-pulse");
    expect(pulsingElements.length).toBeGreaterThan(0);
  });

  it("renders with correct layout structure", () => {
    const { container } = render(<InsightCardSkeleton />);

    // Check header section
    const headerSection = container.querySelector(
      ".flex.items-center.gap-3.mb-3",
    );
    expect(headerSection).toBeVisible();

    // Check icon container and title are in the same row
    const iconContainer = container.querySelector(
      ".p-2.bg-slate-700\\/50.rounded-lg",
    );
    const titleSkeleton = container.querySelector(
      ".h-5.w-24.bg-slate-700\\/50.rounded.animate-pulse",
    );
    expect(iconContainer?.parentElement).toBe(headerSection);
    expect(titleSkeleton?.parentElement).toBe(headerSection);
  });

  it("renders description section with correct spacing", () => {
    const { container } = render(<InsightCardSkeleton />);

    const descriptionSection = container.querySelector(".space-y-2.mb-3");
    expect(descriptionSection).toBeVisible();

    const lines = descriptionSection?.querySelectorAll(".animate-pulse");
    expect(lines).toHaveLength(2);
  });

  it("renders skeleton elements with correct background colors", () => {
    const { container } = render(<InsightCardSkeleton />);

    const iconSkeleton = container.querySelector(".h-5.w-5.bg-slate-600\\/50");
    const otherSkeletons = container.querySelectorAll(".bg-slate-700\\/50");

    expect(iconSkeleton).toBeVisible();
    expect(otherSkeletons.length).toBeGreaterThan(0);
  });
});
