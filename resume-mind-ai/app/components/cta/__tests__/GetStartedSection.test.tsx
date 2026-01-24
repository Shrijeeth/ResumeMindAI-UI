import { render, screen } from "@testing-library/react";
import GetStartedSection from "../GetStartedSection";
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

describe("GetStartedSection", () => {
  it("renders headline, description, and CTA content", () => {
    render(<GetStartedSection />);

    expect(
      screen.getByRole("heading", {
        name: /ready to visualize your potential/i,
      }),
    ).toBeVisible();
    expect(
      screen.getByText(/join thousands of professionals using ai/i),
    ).toBeVisible();
    expect(screen.getByText(/create your free account/i)).toBeVisible();
    expect(screen.getByText(/no credit card required/i)).toBeVisible();
  });

  it("links to login with Google CTA", async () => {
    const user = userEvent.setup();
    render(<GetStartedSection />);

    const link = screen.getByRole("link", { name: /continue with google/i });
    expect(link).toHaveAttribute("href", "/auth/login");

    await user.click(link);
  });
});
