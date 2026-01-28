import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FeaturesSection from "../FeaturesSection";

// Mock the FeatureCard component to isolate FeaturesSection testing
vi.mock("../FeatureCard", () => ({
  default: ({
    icon,
    iconColor,
    title,
    description,
  }: {
    icon: string;
    iconColor: string;
    title: string;
    description: string;
  }) => (
    <div data-testid="feature-card">
      <span data-testid="icon">{icon}</span>
      <span data-testid="icon-color">{iconColor}</span>
      <span data-testid="title">{title}</span>
      <span data-testid="description">{description}</span>
    </div>
  ),
}));

describe("FeaturesSection", () => {
  it("renders the section with correct structure", () => {
    const { container } = render(<FeaturesSection />);

    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("id", "features");
  });

  it("renders the main heading and subtitle", () => {
    render(<FeaturesSection />);

    expect(screen.getByText("Core Platform")).toBeInTheDocument();
    expect(
      screen.getByText("Enterprise-Grade Intelligence"),
    ).toBeInTheDocument();
  });

  it("renders the correct number of feature cards", () => {
    render(<FeaturesSection />);

    const featureCards = screen.getAllByTestId("feature-card");
    expect(featureCards).toHaveLength(4);
  });

  it("renders the first feature card with correct props", () => {
    render(<FeaturesSection />);

    const featureCards = screen.getAllByTestId("feature-card");
    const firstCard = featureCards[0];

    expect(firstCard).toBeInTheDocument();
    expect(firstCard.querySelector('[data-testid="icon"]')).toHaveTextContent(
      "auto_awesome",
    );
    expect(
      firstCard.querySelector('[data-testid="icon-color"]'),
    ).toHaveTextContent("bg-primary/10");
    expect(firstCard.querySelector('[data-testid="title"]')).toHaveTextContent(
      "Automated AI Extraction",
    );
    expect(
      firstCard.querySelector('[data-testid="description"]'),
    ).toHaveTextContent(
      "Proprietary RAG pipeline extracts entities and deep semantic relationships from any resume format with 99% accuracy.",
    );
  });

  it("renders the second feature card with correct props", () => {
    render(<FeaturesSection />);

    const featureCards = screen.getAllByTestId("feature-card");
    const secondCard = featureCards[1];

    expect(secondCard).toBeInTheDocument();
    expect(secondCard.querySelector('[data-testid="icon"]')).toHaveTextContent(
      "hub",
    );
    expect(
      secondCard.querySelector('[data-testid="icon-color"]'),
    ).toHaveTextContent("bg-blue-500/10");
    expect(secondCard.querySelector('[data-testid="title"]')).toHaveTextContent(
      "Interactive Graph Explorer",
    );
    expect(
      secondCard.querySelector('[data-testid="description"]'),
    ).toHaveTextContent(
      "Navigate your career through a dynamic 3D graph interface. Visualize how skills, roles, and achievements interconnect.",
    );
  });

  it("renders the third feature card with correct props", () => {
    render(<FeaturesSection />);

    const featureCards = screen.getAllByTestId("feature-card");
    const thirdCard = featureCards[2];

    expect(thirdCard).toBeInTheDocument();
    expect(thirdCard.querySelector('[data-testid="icon"]')).toHaveTextContent(
      "neurology",
    );
    expect(
      thirdCard.querySelector('[data-testid="icon-color"]'),
    ).toHaveTextContent("bg-emerald-500/10");
    expect(thirdCard.querySelector('[data-testid="title"]')).toHaveTextContent(
      "Multi-LLM Integration",
    );
    expect(
      thirdCard.querySelector('[data-testid="description"]'),
    ).toHaveTextContent(
      "Leverage the power of GPT-4, Claude 3, or Llama 3. Choose your preferred intelligence engine for every analysis.",
    );
  });

  it("renders the fourth feature card with correct props", () => {
    render(<FeaturesSection />);

    const featureCards = screen.getAllByTestId("feature-card");
    const fourthCard = featureCards[3];

    expect(fourthCard).toBeInTheDocument();
    expect(fourthCard.querySelector('[data-testid="icon"]')).toHaveTextContent(
      "insights",
    );
    expect(
      fourthCard.querySelector('[data-testid="icon-color"]'),
    ).toHaveTextContent("bg-orange-500/10");
    expect(fourthCard.querySelector('[data-testid="title"]')).toHaveTextContent(
      "Intelligent Career Insights",
    );
    expect(
      fourthCard.querySelector('[data-testid="description"]'),
    ).toHaveTextContent(
      "Get AI-driven recommendations on skill gaps, market value, and personalized career trajectories based on your graph.",
    );
  });

  it("applies correct CSS classes to the section", () => {
    const { container } = render(<FeaturesSection />);

    const section = container.querySelector("section");
    expect(section).toHaveClass("py-24");
  });

  it("applies correct CSS classes to the container div", () => {
    const { container } = render(<FeaturesSection />);

    const containerDiv = container.querySelector(".max-w-7xl");
    expect(containerDiv).toHaveClass(
      "max-w-7xl",
      "mx-auto",
      "px-4",
      "sm:px-6",
      "lg:px-8",
    );
  });

  it("applies correct CSS classes to the text center div", () => {
    const { container } = render(<FeaturesSection />);

    const textCenterDiv = container.querySelector(".text-center");
    expect(textCenterDiv).toHaveClass("text-center", "mb-16");
  });

  it("applies correct CSS classes to the subtitle", () => {
    render(<FeaturesSection />);

    const subtitle = screen.getByText("Core Platform");
    expect(subtitle.tagName).toBe("H2");
    expect(subtitle).toHaveClass(
      "text-primary",
      "font-bold",
      "tracking-widest",
      "uppercase",
      "text-sm",
      "mb-3",
    );
  });

  it("applies correct CSS classes to the main title", () => {
    render(<FeaturesSection />);

    const title = screen.getByText("Enterprise-Grade Intelligence");
    expect(title.tagName).toBe("P");
    expect(title).toHaveClass(
      "text-4xl",
      "font-extrabold",
      "text-white",
      "mb-4",
    );
  });

  it("applies correct CSS classes to the grid container", () => {
    const { container } = render(<FeaturesSection />);

    const gridDiv = container.querySelector(".grid");
    expect(gridDiv).toHaveClass(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-4",
      "gap-6",
    );
  });

  it("renders feature cards with unique keys", () => {
    render(<FeaturesSection />);

    const featureCards = screen.getAllByTestId("feature-card");
    expect(featureCards).toHaveLength(4);

    // Each card should have different content, indicating unique keys
    const titles = featureCards.map(
      (card) => card.querySelector('[data-testid="title"]')?.textContent,
    );
    const uniqueTitles = [...new Set(titles)];
    expect(uniqueTitles).toHaveLength(4);
  });

  it("maintains the correct order of features", () => {
    render(<FeaturesSection />);

    const featureCards = screen.getAllByTestId("feature-card");
    const titles = featureCards.map(
      (card) => card.querySelector('[data-testid="title"]')?.textContent,
    );

    expect(titles).toEqual([
      "Automated AI Extraction",
      "Interactive Graph Explorer",
      "Multi-LLM Integration",
      "Intelligent Career Insights",
    ]);
  });

  it("renders all feature descriptions with correct content", () => {
    render(<FeaturesSection />);

    const featureCards = screen.getAllByTestId("feature-card");
    const descriptions = featureCards.map(
      (card) => card.querySelector('[data-testid="description"]')?.textContent,
    );

    expect(descriptions[0]).toContain("Proprietary RAG pipeline");
    expect(descriptions[1]).toContain("dynamic 3D graph interface");
    expect(descriptions[2]).toContain("GPT-4, Claude 3, or Llama 3");
    expect(descriptions[3]).toContain("AI-driven recommendations");
  });

  it("renders all icons with correct content", () => {
    render(<FeaturesSection />);

    const featureCards = screen.getAllByTestId("feature-card");
    const icons = featureCards.map(
      (card) => card.querySelector('[data-testid="icon"]')?.textContent,
    );

    expect(icons).toEqual(["auto_awesome", "hub", "neurology", "insights"]);
  });

  it("renders all icon colors with correct content", () => {
    render(<FeaturesSection />);

    const featureCards = screen.getAllByTestId("feature-card");
    const iconColors = featureCards.map(
      (card) => card.querySelector('[data-testid="icon-color"]')?.textContent,
    );

    expect(iconColors).toEqual([
      "bg-primary/10",
      "bg-blue-500/10",
      "bg-emerald-500/10",
      "bg-orange-500/10",
    ]);
  });
});
