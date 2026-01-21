import { render, screen } from "@testing-library/react";
import KnowledgeGraphBackground from "../KnowledgeGraphBackground";

describe("KnowledgeGraphBackground", () => {
  it("renders SVG pattern and gradient overlay", () => {
    render(<KnowledgeGraphBackground />);

    const svg = screen.getByRole("img", { hidden: true });
    expect(svg).toBeInTheDocument();
    expect(svg.querySelector("pattern#graph-pattern")).not.toBeNull();

    const gradientOverlay = screen.getByTestId("kg-gradient-overlay");
    expect(gradientOverlay).toBeInTheDocument();
  });
});
