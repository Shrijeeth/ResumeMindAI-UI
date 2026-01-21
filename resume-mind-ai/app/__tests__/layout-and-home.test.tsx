import { render, screen } from "@testing-library/react";
import RootLayout, { metadata } from "../layout";
import Home from "../page";

// Mock font loader to avoid executing Next font runtime
vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-geist-sans" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono" }),
  Inter: () => ({ variable: "--font-inter" }),
}));

vi.mock("../components/layout/Navbar", () => ({
  __esModule: true,
  default: () => <div data-testid="navbar" />,
}));

vi.mock("../components/hero/HeroSection", () => ({
  __esModule: true,
  default: () => <div data-testid="hero" />,
}));

vi.mock("../components/features/FeaturesSection", () => ({
  __esModule: true,
  default: () => <div data-testid="features" />,
}));

vi.mock("../components/process/HowItWorksSection", () => ({
  __esModule: true,
  default: () => <div data-testid="how-it-works" />,
}));

vi.mock("../components/insights/InsightsSection", () => ({
  __esModule: true,
  default: () => <div data-testid="insights" />,
}));

vi.mock("../components/trust/TechnologyBanner", () => ({
  __esModule: true,
  default: () => <div data-testid="tech-banner" />,
}));

vi.mock("../components/cta/GetStartedSection", () => ({
  __esModule: true,
  default: () => <div data-testid="cta" />,
}));

vi.mock("../components/layout/Footer", () => ({
  __esModule: true,
  default: () => <div data-testid="footer" />,
}));

describe("RootLayout", () => {
  it("exposes site metadata", () => {
    expect(metadata.title).toContain("ResumeMindAI");
    expect(metadata.description).toMatch(/AI-powered intelligence map/i);
  });

  it("renders html scaffold and children", () => {
    const { container } = render(
      <RootLayout>
        <div data-testid="child">content</div>
      </RootLayout>,
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(container.innerHTML).not.toBe("");
  });
});

describe("Home page", () => {
  it("composes all major sections", () => {
    render(<Home />);

    [
      "navbar",
      "hero",
      "features",
      "how-it-works",
      "insights",
      "tech-banner",
      "cta",
      "footer",
    ].forEach((testId) => {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
  });
});
