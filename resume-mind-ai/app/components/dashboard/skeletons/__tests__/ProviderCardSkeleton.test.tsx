import { render } from "@testing-library/react";
import ProviderCardSkeleton from "../ProviderCardSkeleton";

describe("ProviderCardSkeleton", () => {
  it("renders skeleton card with correct structure", () => {
    const { container } = render(<ProviderCardSkeleton />);

    const card = container.querySelector(".glass-card");
    expect(card).toBeVisible();
    expect(card).toHaveClass("rounded-xl", "p-5");
  });

  it("renders logo skeleton", () => {
    const { container } = render(<ProviderCardSkeleton />);

    const logoSkeleton = container.querySelector(
      ".w-10.h-10.rounded-lg.bg-slate-700\\/50.animate-pulse",
    );
    expect(logoSkeleton).toBeVisible();
  });

  it("renders name skeleton", () => {
    const { container } = render(<ProviderCardSkeleton />);

    const nameSkeleton = container.querySelector(
      ".h-4.w-20.bg-slate-700\\/50.rounded.animate-pulse",
    );
    expect(nameSkeleton).toBeVisible();
  });

  it("renders model skeleton", () => {
    const { container } = render(<ProviderCardSkeleton />);

    const modelSkeleton = container.querySelector(
      ".h-3.w-16.bg-slate-700\\/50.rounded.animate-pulse",
    );
    expect(modelSkeleton).toBeVisible();
  });

  it("renders badge skeleton", () => {
    const { container } = render(<ProviderCardSkeleton />);

    const badgeSkeleton = container.querySelector(
      ".h-5.w-16.bg-slate-700\\/50.rounded-md.animate-pulse",
    );
    expect(badgeSkeleton).toBeVisible();
  });

  it("renders latency section skeleton", () => {
    const { container } = render(<ProviderCardSkeleton />);

    const latencySection = container.querySelector(".space-y-2.mt-4");
    expect(latencySection).toBeVisible();

    const latencyLabelSkeleton = container.querySelector(
      ".h-3.w-12.bg-slate-700\\/50.rounded.animate-pulse",
    );
    const latencyValueSkeleton = container.querySelector(
      ".h-3.w-8.bg-slate-700\\/50.rounded.animate-pulse",
    );
    expect(latencyLabelSkeleton).toBeVisible();
    expect(latencyValueSkeleton).toBeVisible();
  });

  it("renders progress bar skeleton", () => {
    const { container } = render(<ProviderCardSkeleton />);

    const progressBar = container.querySelector(
      ".w-full.bg-slate-800.rounded-full.h-1",
    );
    expect(progressBar).toBeVisible();
  });

  it("renders actions skeleton", () => {
    const { container } = render(<ProviderCardSkeleton />);

    const actionsSection = container.querySelector(
      ".mt-4.pt-4.border-t.border-slate-800.flex.justify-end.gap-2",
    );
    expect(actionsSection).toBeVisible();

    const actionButtons = container.querySelectorAll(
      ".h-7.w-7.bg-slate-700\\/50.rounded.animate-pulse",
    );
    expect(actionButtons).toHaveLength(3);
  });

  it("renders all skeleton elements with animate-pulse class", () => {
    const { container } = render(<ProviderCardSkeleton />);

    const pulsingElements = container.querySelectorAll(".animate-pulse");
    expect(pulsingElements.length).toBeGreaterThan(0);
  });

  it("renders with correct layout structure", () => {
    const { container } = render(<ProviderCardSkeleton />);

    // Check header section
    const headerSection = container.querySelector(
      ".flex.justify-between.items-start.mb-4",
    );
    expect(headerSection).toBeVisible();

    // Check logo and name container
    const logoNameContainer = container.querySelector(
      ".flex.items-center.gap-3",
    );
    expect(logoNameContainer).toBeVisible();

    // Check name and model container
    const nameModelContainer = container.querySelector(".space-y-1\\.5");
    expect(nameModelContainer).toBeVisible();
  });
});
