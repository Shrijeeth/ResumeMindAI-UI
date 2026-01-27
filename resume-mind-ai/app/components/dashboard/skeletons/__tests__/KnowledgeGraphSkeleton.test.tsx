import { render } from "@testing-library/react";
import KnowledgeGraphSkeleton from "../KnowledgeGraphSkeleton";

describe("KnowledgeGraphSkeleton", () => {
  it("renders skeleton card with correct structure", () => {
    const { container } = render(<KnowledgeGraphSkeleton />);

    const card = container.querySelector(".glass-card");
    expect(card).toBeVisible();
    expect(card).toHaveClass("rounded-2xl", "p-6", "flex", "flex-col");
  });

  it("renders header skeleton", () => {
    const { container } = render(<KnowledgeGraphSkeleton />);

    const headerSection = container.querySelector(".mb-4");
    expect(headerSection).toBeVisible();

    const titleSkeleton = container.querySelector(
      ".h-6.w-40.bg-slate-700\\/50.rounded.animate-pulse",
    );
    const subtitleSkeleton = container.querySelector(
      ".h-4.w-56.bg-slate-700\\/50.rounded.animate-pulse",
    );

    expect(titleSkeleton).toBeVisible();
    expect(subtitleSkeleton).toBeVisible();
  });

  it("renders graph visualization area skeleton", () => {
    const { container } = render(<KnowledgeGraphSkeleton />);

    const graphArea = container.querySelector(
      ".flex-1.bg-slate-900\\/50.rounded-xl.border.border-slate-700\\/50.border-dashed.min-h-\\[200px\\].flex.flex-col.items-center.justify-center",
    );
    expect(graphArea).toBeVisible();
  });

  it("renders graph icon container skeleton", () => {
    const { container } = render(<KnowledgeGraphSkeleton />);

    const iconContainer = container.querySelector(
      ".w-14.h-14.bg-slate-800\\/50.rounded-xl.flex.items-center.justify-center.mb-4.animate-pulse",
    );
    expect(iconContainer).toBeVisible();
  });

  it("renders graph icon skeleton", () => {
    const { container } = render(<KnowledgeGraphSkeleton />);

    const iconSkeleton = container.querySelector(
      ".h-6.w-6.bg-slate-700\\/50.rounded.animate-pulse",
    );
    expect(iconSkeleton).toBeVisible();
  });

  it("renders graph text skeletons", () => {
    const { container } = render(<KnowledgeGraphSkeleton />);

    const textSkeleton1 = container.querySelector(
      ".h-4.w-24.bg-slate-700\\/50.rounded.animate-pulse.mb-2",
    );
    const textSkeleton2 = container.querySelector(
      ".h-3.w-40.bg-slate-700\\/50.rounded.animate-pulse",
    );

    expect(textSkeleton1).toBeVisible();
    expect(textSkeleton2).toBeVisible();
  });

  it("renders button skeleton", () => {
    const { container } = render(<KnowledgeGraphSkeleton />);

    const buttonSkeleton = container.querySelector(
      ".h-10.w-full.bg-slate-700\\/50.rounded-lg.animate-pulse.mt-4",
    );
    expect(buttonSkeleton).toBeVisible();
  });

  it("renders all skeleton elements with animate-pulse class", () => {
    const { container } = render(<KnowledgeGraphSkeleton />);

    const pulsingElements = container.querySelectorAll(".animate-pulse");
    expect(pulsingElements.length).toBeGreaterThan(0);
  });

  it("renders with correct flex layout", () => {
    const { container } = render(<KnowledgeGraphSkeleton />);

    const card = container.querySelector(".glass-card");
    expect(card).toHaveClass("flex", "flex-col");

    const graphArea = container.querySelector(".flex-1");
    expect(graphArea).toBeVisible();
  });

  it("renders graph area with correct styling", () => {
    const { container } = render(<KnowledgeGraphSkeleton />);

    const graphArea = container.querySelector(".bg-slate-900\\/50");
    expect(graphArea).toHaveClass(
      "rounded-xl",
      "border",
      "border-slate-700/50",
      "border-dashed",
      "min-h-[200px]",
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
    );
  });

  it("renders header with correct spacing", () => {
    const { container } = render(<KnowledgeGraphSkeleton />);

    const headerSection = container.querySelector(".mb-4");
    expect(headerSection).toBeVisible();

    const skeletons = headerSection?.querySelectorAll(".animate-pulse");
    expect(skeletons).toHaveLength(2);
  });

  it("renders graph content with centered layout", () => {
    const { container } = render(<KnowledgeGraphSkeleton />);

    const graphArea = container.querySelector(
      ".flex.items-center.justify-center",
    );
    expect(graphArea).toBeVisible();

    const iconContainer = container.querySelector(".w-14.h-14");
    const textSkeletons = container.querySelectorAll(".h-4, .h-3");
    expect(iconContainer).toBeVisible();
    expect(textSkeletons.length).toBeGreaterThan(0);
  });
});
