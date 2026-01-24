import { render, screen } from "@testing-library/react";
import InsightCard from "../InsightCard";
import userEvent from "@testing-library/user-event";

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

describe("InsightCard", () => {
  describe("Empty State", () => {
    it("shows empty state with default message when isEmpty is true", () => {
      render(
        <InsightCard
          icon="analytics"
          iconColor="bg-primary/10"
          iconTextColor="text-primary"
          title="Analytics"
          description="View your analytics"
          isEmpty={true}
        />,
      );

      expect(screen.getByText(/no data available yet/i)).toBeVisible();
      expect(screen.getByText("Analytics")).toBeVisible();
    });

    it("shows custom empty message when provided", () => {
      render(
        <InsightCard
          icon="analytics"
          iconColor="bg-primary/10"
          iconTextColor="text-primary"
          title="Analytics"
          description="View your analytics"
          isEmpty={true}
          emptyMessage="Custom empty message"
        />,
      );

      expect(screen.getByText("Custom empty message")).toBeVisible();
    });

    it("shows empty action link when emptyActionLabel and emptyActionHref are provided", () => {
      render(
        <InsightCard
          icon="analytics"
          iconColor="bg-primary/10"
          iconTextColor="text-primary"
          title="Analytics"
          description="View your analytics"
          isEmpty={true}
          emptyActionLabel="Add Data"
          emptyActionHref="/add-data"
        />,
      );

      const actionLink = screen.getByRole("link", { name: /add data/i });
      expect(actionLink).toBeVisible();
      expect(actionLink).toHaveAttribute("href", "/add-data");
    });

    it("renders empty state without action link when only emptyActionLabel is provided", () => {
      render(
        <InsightCard
          icon="analytics"
          iconColor="bg-primary/10"
          iconTextColor="text-primary"
          title="Analytics"
          description="View your analytics"
          isEmpty={true}
          emptyActionLabel="Add Data"
        />,
      );

      expect(
        screen.queryByRole("link", { name: /add data/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe("Active State with Data", () => {
    it("shows title and description in active state", () => {
      render(
        <InsightCard
          icon="analytics"
          iconColor="bg-primary/10"
          iconTextColor="text-primary"
          title="Analytics"
          description="View your analytics"
        />,
      );

      expect(screen.getByText("Analytics")).toBeVisible();
      expect(screen.getByText("View your analytics")).toBeVisible();
    });

    it("shows progress bar when progressValue is provided", () => {
      render(
        <InsightCard
          icon="analytics"
          iconColor="bg-primary/10"
          iconTextColor="text-primary"
          title="Analytics"
          description="View your analytics"
          progressValue={75}
        />,
      );

      const progressBar = document.querySelector('[style*="width: 75%"]');
      expect(progressBar).toBeVisible();
    });

    it("shows highlight value when provided", () => {
      render(
        <InsightCard
          icon="analytics"
          iconColor="bg-primary/10"
          iconTextColor="text-primary"
          title="Analytics"
          description="View your analytics"
          highlightValue="1,234"
        />,
      );

      expect(screen.getByText("1,234")).toBeVisible();
    });

    it("shows link action when actionLabel and actionHref are provided", () => {
      render(
        <InsightCard
          icon="analytics"
          iconColor="bg-primary/10"
          iconTextColor="text-primary"
          title="Analytics"
          description="View your analytics"
          actionLabel="View Details"
          actionHref="/details"
        />,
      );

      const actionLink = screen.getByRole("link", { name: /view details/i });
      expect(actionLink).toBeVisible();
      expect(actionLink).toHaveAttribute("href", "/details");
    });

    it("shows button action when actionLabel and onAction are provided", async () => {
      const user = userEvent.setup();
      const onAction = vi.fn();

      render(
        <InsightCard
          icon="analytics"
          iconColor="bg-primary/10"
          iconTextColor="text-primary"
          title="Analytics"
          description="View your analytics"
          actionLabel="Refresh"
          onAction={onAction}
        />,
      );

      const actionButton = screen.getByRole("button", { name: /refresh/i });
      await user.click(actionButton);

      expect(onAction).toHaveBeenCalledTimes(1);
    });

    it("prefers actionHref over onAction when both are provided", () => {
      render(
        <InsightCard
          icon="analytics"
          iconColor="bg-primary/10"
          iconTextColor="text-primary"
          title="Analytics"
          description="View your analytics"
          actionLabel="Refresh"
          actionHref="/refresh"
          onAction={vi.fn()}
        />,
      );

      expect(screen.getByRole("link", { name: /refresh/i })).toBeVisible();
      expect(
        screen.queryByRole("button", { name: /refresh/i }),
      ).not.toBeInTheDocument();
    });

    it("renders without action when actionLabel is not provided", () => {
      render(
        <InsightCard
          icon="analytics"
          iconColor="bg-primary/10"
          iconTextColor="text-primary"
          title="Analytics"
          description="View your analytics"
        />,
      );

      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("Combinations", () => {
    it("shows both progress bar and highlight value", () => {
      render(
        <InsightCard
          icon="analytics"
          iconColor="bg-primary/10"
          iconTextColor="text-primary"
          title="Analytics"
          description="View your analytics"
          progressValue={50}
          highlightValue="500"
        />,
      );

      expect(document.querySelector('[style*="width: 50%"]')).toBeVisible();
      expect(screen.getByText("500")).toBeVisible();
    });

    it("shows all elements in populated card", () => {
      render(
        <InsightCard
          icon="analytics"
          iconColor="bg-primary/10"
          iconTextColor="text-primary"
          title="Analytics"
          description="View your analytics"
          actionLabel="View"
          actionHref="/view"
          progressValue={80}
          highlightValue="800"
        />,
      );

      expect(screen.getByText("Analytics")).toBeVisible();
      expect(screen.getByText("View your analytics")).toBeVisible();
      expect(screen.getByText("800")).toBeVisible();
      expect(screen.getByRole("link", { name: /view/i })).toBeVisible();
      expect(document.querySelector('[style*="width: 80%"]')).toBeVisible();
    });
  });

  describe("Edge Cases", () => {
    it("handles zero progress value", () => {
      render(
        <InsightCard
          icon="analytics"
          iconColor="bg-primary/10"
          iconTextColor="text-primary"
          title="Analytics"
          description="View your analytics"
          progressValue={0}
        />,
      );

      expect(document.querySelector('[style*="width: 0%"]')).toBeVisible();
    });

    it("handles 100% progress value", () => {
      render(
        <InsightCard
          icon="analytics"
          iconColor="bg-primary/10"
          iconTextColor="text-primary"
          title="Analytics"
          description="View your analytics"
          progressValue={100}
        />,
      );

      expect(document.querySelector('[style*="width: 100%"]')).toBeVisible();
    });

    it("handles empty highlight value string", () => {
      render(
        <InsightCard
          icon="analytics"
          iconColor="bg-primary/10"
          iconTextColor="text-primary"
          title="Analytics"
          description="View your analytics"
          highlightValue=""
        />,
      );

      const highlightDiv = document.querySelector(".text-2xl");
      expect(highlightDiv).not.toBeInTheDocument();
    });
  });
});
