import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DashboardHeader from "../DashboardHeader";

describe("DashboardHeader", () => {
  it("renders title and search input", () => {
    render(<DashboardHeader title="Dashboard" />);

    expect(screen.getByText("Dashboard")).toBeVisible();
    expect(screen.getByPlaceholderText(/search entities/i)).toBeVisible();
  });

  it("calls mobile menu toggle when menu button is clicked", async () => {
    const user = userEvent.setup();
    const onMobileMenuToggle = vi.fn();

    render(
      <DashboardHeader title="Menu" onMobileMenuToggle={onMobileMenuToggle} />,
    );

    const menuButton = screen.getByRole("button", { name: /menu/i });
    await user.click(menuButton);

    expect(onMobileMenuToggle).toHaveBeenCalledTimes(1);
  });

  it("updates search query state on input change", async () => {
    const user = userEvent.setup();

    render(<DashboardHeader title="Search" />);

    const searchInput = screen.getByPlaceholderText(/search entities/i);
    await user.type(searchInput, "graph");

    expect(searchInput).toHaveValue("graph");
  });
});
