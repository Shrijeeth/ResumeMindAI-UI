import { render, screen } from "@testing-library/react";
import KnowledgeGraphCard from "../KnowledgeGraphCard";
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

describe("KnowledgeGraphCard", () => {
  describe("Empty State", () => {
    it("shows empty state when hasData is false", () => {
      render(<KnowledgeGraphCard hasData={false} />);

      expect(screen.getByText(/career knowledge graph/i)).toBeVisible();
      expect(screen.getByText(/no graph data/i)).toBeVisible();
    });

    it("shows empty state when nodeCount is 0", () => {
      render(<KnowledgeGraphCard hasData={true} nodeCount={0} />);

      expect(screen.getByText(/no graph data/i)).toBeVisible();
    });

    it("shows empty state with default message", () => {
      render(<KnowledgeGraphCard hasData={false} />);

      expect(
        screen.getByText(
          /upload and analyze a resume to generate your knowledge graph/i,
        ),
      ).toBeVisible();
    });

    it("shows link to upload resume in empty state", () => {
      render(<KnowledgeGraphCard hasData={false} />);

      const uploadLinks = screen.getAllByRole("link");
      const uploadLink = uploadLinks.find((link) =>
        link.textContent?.includes("Upload Resume First"),
      );
      expect(uploadLink).toHaveAttribute("href", "/dashboard/resumes");
      expect(uploadLink).toBeVisible();
    });

    it("shows hub icon in empty state", () => {
      render(<KnowledgeGraphCard hasData={false} />);

      const icon = screen.getByText("hub");
      expect(icon).toBeVisible();
    });
  });

  describe("Active State with Data", () => {
    it("shows graph visualization when hasData is true and nodeCount > 0", () => {
      render(<KnowledgeGraphCard hasData={true} nodeCount={5} />);

      expect(screen.queryByText(/no graph data/i)).not.toBeInTheDocument();
    });

    it("displays top node when provided", () => {
      render(
        <KnowledgeGraphCard
          hasData={true}
          nodeCount={5}
          topNode="JavaScript"
        />,
      );

      expect(screen.getByText(/Top Node: JavaScript/i)).toBeVisible();
    });

    it("displays match score when provided", () => {
      render(
        <KnowledgeGraphCard
          hasData={true}
          nodeCount={5}
          topNode="JavaScript"
          matchScore={85}
        />,
      );

      expect(screen.getByText(/85% Match/i)).toBeVisible();
    });

    it("renders SVG graph visualization", () => {
      render(<KnowledgeGraphCard hasData={true} nodeCount={5} />);

      const svg = document.querySelector("svg");
      expect(svg).toBeVisible();
    });

    it("shows explore button when hasData is true", () => {
      render(<KnowledgeGraphCard hasData={true} nodeCount={5} />);

      const exploreButton = screen.getByRole("button", {
        name: /open falkordb explorer/i,
      });
      expect(exploreButton).toBeVisible();
    });

    it("calls onExplore when explore button is clicked", async () => {
      const user = userEvent.setup();
      const onExplore = vi.fn();

      render(
        <KnowledgeGraphCard
          hasData={true}
          nodeCount={5}
          onExplore={onExplore}
        />,
      );

      const exploreButton = screen.getByRole("button", {
        name: /open falkordb explorer/i,
      });
      await user.click(exploreButton);

      expect(onExplore).toHaveBeenCalledTimes(1);
    });

    it("shows explore button even when onExplore is not provided", () => {
      render(<KnowledgeGraphCard hasData={true} nodeCount={5} />);

      const exploreButton = screen.getByRole("button", {
        name: /open falkordb explorer/i,
      });
      expect(exploreButton).toBeVisible();
    });
  });

  describe("Default Values", () => {
    it("uses default nodeCount of 0 when not provided", () => {
      render(<KnowledgeGraphCard hasData={false} />);

      expect(screen.getByText(/no graph data/i)).toBeVisible();
    });

    it("uses default hasData of false when not provided", () => {
      render(<KnowledgeGraphCard />);

      expect(screen.getByText(/no graph data/i)).toBeVisible();
    });

    it("handles null topNode gracefully", () => {
      render(
        <KnowledgeGraphCard hasData={true} nodeCount={5} topNode={null} />,
      );

      expect(screen.getByText(/Top Node:/i)).toBeVisible();
    });

    it("handles null matchScore gracefully", () => {
      render(
        <KnowledgeGraphCard hasData={true} nodeCount={5} matchScore={null} />,
      );

      expect(screen.getByText(/Career Knowledge Graph/i)).toBeVisible();
    });
  });

  describe("Graph Structure", () => {
    it("renders SVG with correct viewBox", () => {
      render(<KnowledgeGraphCard hasData={true} nodeCount={5} />);

      const svg = document.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 200 200");
    });

    it("renders connection lines in SVG", () => {
      render(<KnowledgeGraphCard hasData={true} nodeCount={5} />);

      const lines = document.querySelectorAll("svg line");
      expect(lines.length).toBeGreaterThan(0);
    });

    it("renders circles for nodes in SVG", () => {
      render(<KnowledgeGraphCard hasData={true} nodeCount={5} />);

      const circles = document.querySelectorAll("svg circle");
      expect(circles.length).toBeGreaterThan(0);
    });
  });

  describe("Combinations", () => {
    it("shows both top node and match score together", () => {
      render(
        <KnowledgeGraphCard
          hasData={true}
          nodeCount={10}
          topNode="Python"
          matchScore={92}
        />,
      );

      expect(screen.getByText(/Top Node: Python/i)).toBeVisible();
      expect(screen.getByText(/92% Match/i)).toBeVisible();
    });

    it("shows empty state even when topNode and matchScore are provided but hasData is false", () => {
      render(
        <KnowledgeGraphCard
          hasData={false}
          topNode="TypeScript"
          matchScore={88}
        />,
      );

      expect(screen.getByText(/no graph data/i)).toBeVisible();
      expect(screen.queryByText(/top node:/i)).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper labels for empty state link", () => {
      render(<KnowledgeGraphCard hasData={false} />);

      const link = screen.getByRole("link", { name: /upload resume first/i });
      expect(link).toBeVisible();
    });

    it("has proper labels for explore button", () => {
      render(
        <KnowledgeGraphCard hasData={true} nodeCount={5} onExplore={vi.fn()} />,
      );

      const button = screen.getByRole("button", {
        name: /open falkordb explorer/i,
      });
      expect(button).toBeVisible();
    });
  });
});
