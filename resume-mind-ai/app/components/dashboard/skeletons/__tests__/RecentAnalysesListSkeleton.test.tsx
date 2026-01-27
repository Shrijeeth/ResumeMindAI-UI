import { render } from "@testing-library/react";
import RecentAnalysesListSkeleton from "../RecentAnalysesListSkeleton";

describe("RecentAnalysesListSkeleton", () => {
  it("renders skeleton card with correct structure", () => {
    const { container } = render(<RecentAnalysesListSkeleton />);

    const card = container.querySelector(".glass-card");
    expect(card).toBeVisible();
    expect(card).toHaveClass("rounded-2xl", "overflow-hidden");
  });

  it("renders header skeleton", () => {
    const { container } = render(<RecentAnalysesListSkeleton />);

    const headerSection = container.querySelector(
      ".p-6.border-b.border-slate-700\\/50.flex.justify-between.items-center",
    );
    expect(headerSection).toBeVisible();

    const titleSkeleton = container.querySelector(
      ".h-6.w-32.bg-slate-700\\/50.rounded.animate-pulse",
    );
    const actionSkeleton = container.querySelector(
      ".h-4.w-16.bg-slate-700\\/50.rounded.animate-pulse",
    );

    expect(titleSkeleton).toBeVisible();
    expect(actionSkeleton).toBeVisible();
  });

  it("renders list items container", () => {
    const { container } = render(<RecentAnalysesListSkeleton />);

    const listContainer = container.querySelector(
      ".divide-y.divide-slate-700\\/50",
    );
    expect(listContainer).toBeVisible();
  });

  it("renders exactly 3 list items", () => {
    const { container } = render(<RecentAnalysesListSkeleton />);

    const listItems = container.querySelectorAll(
      ".p-4.flex.items-center.gap-4",
    );
    expect(listItems).toHaveLength(3);
  });

  it("renders file icon skeleton for each item", () => {
    const { container } = render(<RecentAnalysesListSkeleton />);

    const fileIcons = container.querySelectorAll(
      ".h-10.w-10.bg-slate-700\\/50.rounded-lg.animate-pulse",
    );
    expect(fileIcons).toHaveLength(3);
  });

  it("renders file name skeleton for each item", () => {
    const { container } = render(<RecentAnalysesListSkeleton />);

    const fileNameSkeletons = container.querySelectorAll(
      ".h-4.w-32.bg-slate-700\\/50.rounded.animate-pulse",
    );
    expect(fileNameSkeletons).toHaveLength(3);
  });

  it("renders timestamp skeleton for each item", () => {
    const { container } = render(<RecentAnalysesListSkeleton />);

    const timestampSkeletons = container.querySelectorAll(
      ".h-3.w-24.bg-slate-700\\/50.rounded.animate-pulse",
    );
    expect(timestampSkeletons).toHaveLength(3);
  });

  it("renders action button skeleton for each item", () => {
    const { container } = render(<RecentAnalysesListSkeleton />);

    const actionSkeletons = container.querySelectorAll(
      ".h-8.w-16.bg-slate-700\\/50.rounded.animate-pulse",
    );
    expect(actionSkeletons).toHaveLength(3);
  });

  it("renders all skeleton elements with animate-pulse class", () => {
    const { container } = render(<RecentAnalysesListSkeleton />);

    const pulsingElements = container.querySelectorAll(".animate-pulse");
    expect(pulsingElements.length).toBeGreaterThan(0);
  });

  it("renders list items with correct structure", () => {
    const { container } = render(<RecentAnalysesListSkeleton />);

    const listItems = container.querySelectorAll(
      ".p-4.flex.items-center.gap-4",
    );
    expect(listItems).toHaveLength(3);

    listItems.forEach((item) => {
      expect(item).toHaveClass("p-4", "flex", "items-center", "gap-4");

      const fileIcon = item.querySelector(".h-10.w-10");
      const contentArea = item.querySelector(".flex-1.space-y-2");
      const actionButton = item.querySelector(".h-8.w-16");

      expect(fileIcon).toBeVisible();
      expect(contentArea).toBeVisible();
      expect(actionButton).toBeVisible();
    });
  });

  it("renders content area with correct spacing", () => {
    const { container } = render(<RecentAnalysesListSkeleton />);

    const contentAreas = container.querySelectorAll(".flex-1.space-y-2");
    expect(contentAreas).toHaveLength(3);

    contentAreas.forEach((area) => {
      const fileName = area.querySelector(".h-4");
      const timestamp = area.querySelector(".h-3");
      expect(fileName).toBeVisible();
      expect(timestamp).toBeVisible();
    });
  });

  it("renders header with correct layout", () => {
    const { container } = render(<RecentAnalysesListSkeleton />);

    const headerSection = container.querySelector(
      ".flex.justify-between.items-center",
    );
    expect(headerSection).toBeVisible();

    const titleSkeleton = container.querySelector(".h-6.w-32");
    const actionSkeleton = container.querySelector(".h-4.w-16");
    expect(titleSkeleton).toBeVisible();
    expect(actionSkeleton).toBeVisible();
  });

  it("renders list with divider styling", () => {
    const { container } = render(<RecentAnalysesListSkeleton />);

    const listContainer = container.querySelector(
      ".divide-y.divide-slate-700\\/50",
    );
    expect(listContainer).toBeVisible();
    expect(listContainer?.children.length).toBe(3);
  });

  it("renders skeleton elements with consistent background colors", () => {
    const { container } = render(<RecentAnalysesListSkeleton />);

    const skeletonElements = container.querySelectorAll(".bg-slate-700\\/50");
    expect(skeletonElements.length).toBeGreaterThan(0);
  });
});
