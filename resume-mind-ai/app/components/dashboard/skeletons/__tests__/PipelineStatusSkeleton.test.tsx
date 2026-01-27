import { render } from "@testing-library/react";
import PipelineStatusSkeleton from "../PipelineStatusSkeleton";

describe("PipelineStatusSkeleton", () => {
  it("renders skeleton card with correct structure", () => {
    const { container } = render(<PipelineStatusSkeleton />);

    const card = container.querySelector(".glass-card");
    expect(card).toBeVisible();
    expect(card).toHaveClass(
      "rounded-2xl",
      "p-6",
      "flex",
      "flex-col",
      "justify-between",
      "md:col-span-2",
    );
  });

  it("renders header label skeleton", () => {
    const { container } = render(<PipelineStatusSkeleton />);

    const headerLabel = container.querySelector(
      ".h-3.w-24.bg-slate-700\\/50.rounded.animate-pulse.mb-4",
    );
    expect(headerLabel).toBeVisible();
  });

  it("renders status section skeleton", () => {
    const { container } = render(<PipelineStatusSkeleton />);

    const statusSection = container.querySelector(
      ".flex.items-center.justify-between.mb-2",
    );
    expect(statusSection).toBeVisible();
  });

  it("renders status text skeleton", () => {
    const { container } = render(<PipelineStatusSkeleton />);

    const statusText = container.querySelector(
      ".h-8.w-32.bg-slate-700\\/50.rounded.animate-pulse",
    );
    expect(statusText).toBeVisible();
  });

  it("renders status indicator skeleton", () => {
    const { container } = render(<PipelineStatusSkeleton />);

    const statusIndicator = container.querySelector(
      ".h-3.w-3.bg-slate-700\\/50.rounded-full.animate-pulse",
    );
    expect(statusIndicator).toBeVisible();
  });

  it("renders message box skeleton", () => {
    const { container } = render(<PipelineStatusSkeleton />);

    const messageBox = container.querySelector(
      ".bg-slate-800\\/30.border.border-slate-700\\/50.rounded-lg.p-4",
    );
    expect(messageBox).toBeVisible();
  });

  it("renders message box content skeleton", () => {
    const { container } = render(<PipelineStatusSkeleton />);

    const messageContent = container.querySelector(".flex.items-start.gap-3");
    expect(messageContent).toBeVisible();

    const messageIcon = container.querySelector(
      ".h-5.w-5.bg-slate-700\\/50.rounded.animate-pulse.mt-0\\.5",
    );
    expect(messageIcon).toBeVisible();

    const messageTextContainer = container.querySelector(".flex-1.space-y-2");
    expect(messageTextContainer).toBeVisible();

    const messageTextLines = container.querySelectorAll(
      ".flex-1.space-y-2 .animate-pulse",
    );
    expect(messageTextLines).toHaveLength(2);
  });

  it("renders message text skeletons with correct widths", () => {
    const { container } = render(<PipelineStatusSkeleton />);

    const firstLine = container.querySelector(
      ".h-4.w-32.bg-slate-700\\/50.rounded.animate-pulse",
    );
    const secondLine = container.querySelector(
      ".h-3.w-48.bg-slate-700\\/50.rounded.animate-pulse",
    );

    expect(firstLine).toBeVisible();
    expect(secondLine).toBeVisible();
  });

  it("renders button skeleton", () => {
    const { container } = render(<PipelineStatusSkeleton />);

    const buttonSkeleton = container.querySelector(
      ".h-10.w-full.bg-slate-700\\/50.rounded-lg.animate-pulse",
    );
    expect(buttonSkeleton).toBeVisible();
  });

  it("renders all skeleton elements with animate-pulse class", () => {
    const { container } = render(<PipelineStatusSkeleton />);

    const pulsingElements = container.querySelectorAll(".animate-pulse");
    expect(pulsingElements.length).toBeGreaterThan(0);
  });

  it("renders with correct flex layout structure", () => {
    const { container } = render(<PipelineStatusSkeleton />);

    const card = container.querySelector(".glass-card");
    expect(card).toHaveClass("flex", "flex-col", "justify-between");

    const topSection = container.querySelector("div > div");
    const bottomSection = container.querySelector(".mt-6.space-y-4");
    expect(topSection).toBeVisible();
    expect(bottomSection).toBeVisible();
  });

  it("renders message section with correct spacing", () => {
    const { container } = render(<PipelineStatusSkeleton />);

    const messageSection = container.querySelector(".mt-6.space-y-4");
    expect(messageSection).toBeVisible();

    const messageBox = container.querySelector(".bg-slate-800\\/30");
    const buttonSkeleton = container.querySelector(
      ".h-10.w-full.bg-slate-700\\/50",
    );
    expect(messageBox).toBeVisible();
    expect(buttonSkeleton).toBeVisible();
  });

  it("renders status indicator as round element", () => {
    const { container } = render(<PipelineStatusSkeleton />);

    const statusIndicator = container.querySelector(".h-3.w-3.rounded-full");
    expect(statusIndicator).toBeVisible();
  });

  it("renders responsive grid classes", () => {
    const { container } = render(<PipelineStatusSkeleton />);

    const card = container.querySelector(".glass-card");
    expect(card).toHaveClass("md:col-span-2");
  });
});
