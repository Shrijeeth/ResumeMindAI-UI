import { render, screen } from "@testing-library/react";
import PipelineStatusCard from "../PipelineStatusCard";

// Mock next/link to behave like a plain anchor in tests
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

describe("PipelineStatusCard", () => {
  it("shows not-configured state with action link", () => {
    render(
      <PipelineStatusCard
        status="not_configured"
        llmProvider={null}
        stats={null}
      />,
    );

    expect(screen.getByText(/pipeline status/i)).toBeVisible();
    expect(screen.getByText(/not configured/i)).toBeVisible();
    expect(screen.getByText(/llm provider required/i)).toBeVisible();
    expect(
      screen.getByRole("link", { name: /configure llm provider/i }),
    ).toHaveAttribute("href", "/dashboard/settings");
  });

  it("shows active state with stats and provider", () => {
    render(
      <PipelineStatusCard
        status="active"
        llmProvider="openai"
        stats={{
          tokensUsed: 50,
          tokensLimit: 100,
          resumesProcessed: 12,
          graphNodes: 1234,
        }}
      />,
    );

    expect(screen.getByText(/pipeline status/i)).toBeVisible();
    expect(screen.getByText(/active/i)).toBeVisible();
    expect(screen.getByText(/openai/i)).toBeVisible();
    expect(screen.getByText(/50%/i)).toBeVisible();
    expect(screen.getByText("12")).toBeVisible();
    expect(screen.getByText(/1.2k/i)).toBeVisible();
  });

  it("shows idle state with provider but no stats", () => {
    render(
      <PipelineStatusCard status="idle" llmProvider="anthropic" stats={undefined} />,
    );

    expect(screen.getByText(/pipeline status/i)).toBeVisible();
    expect(screen.getByText(/idle/i)).toBeVisible();
    expect(screen.getByText(/anthropic/i)).toBeVisible();
    expect(screen.getByText(/0%/i)).toBeVisible();
    const zeroCounts = screen.getAllByText("0");
    expect(zeroCounts).toHaveLength(2);
    zeroCounts.forEach((node) => expect(node).toBeVisible());
  });

  it("shows raw entity count when under 1k", () => {
    render(
      <PipelineStatusCard
        status="processing"
        llmProvider="groq"
        stats={{ tokensUsed: 5, tokensLimit: 20, resumesProcessed: 3, graphNodes: 999 }}
      />,
    );

    expect(screen.getByText(/processing/i)).toBeVisible();
    expect(screen.getByText(/25%/i)).toBeVisible();
    expect(screen.getByText("999")).toBeVisible();
  });
});
