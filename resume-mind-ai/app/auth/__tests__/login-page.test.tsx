import { render, screen } from "@testing-library/react";
import LoginPage, { metadata } from "../login/page";

vi.mock("@/app/components/auth/KnowledgeGraphBackground", () => ({
  __esModule: true,
  default: () => <div data-testid="kg-bg" />,
}));

vi.mock("@/app/components/auth/GoogleSignInButton", () => ({
  __esModule: true,
  default: () => <button data-testid="google-btn">Sign in</button>,
}));

describe("Login page", () => {
  it("exposes page metadata", () => {
    expect(metadata.title).toContain("Login");
    expect(metadata.description).toMatch(/ResumeMindAI/i);
  });

  it("renders hero content and sign-in button", () => {
    render(<LoginPage />);

    expect(screen.getByText("ResumeMindAI")).toBeInTheDocument();
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByTestId("google-btn")).toBeInTheDocument();
    expect(screen.getByTestId("kg-bg")).toBeInTheDocument();
  });
});
