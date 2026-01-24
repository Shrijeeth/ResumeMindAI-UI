import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { User } from "@supabase/supabase-js";
import DashboardLayout from "../DashboardLayout";

const mockUser: User = {
  id: "user-1",
  email: "test@example.com",
  app_metadata: {},
  user_metadata: {},
  aud: "",
  created_at: "",
};

describe("DashboardLayout", () => {
  it("renders header, sidebar, and children", () => {
    render(
      <DashboardLayout user={mockUser} pageTitle="Title" onSignOut={vi.fn()}>
        <div data-testid="child">Child content</div>
      </DashboardLayout>,
    );

    expect(screen.getByText("Title")).toBeVisible();
    expect(screen.getByTestId("child")).toBeVisible();
  });

  it("opens and closes mobile menu overlay", async () => {
    const user = userEvent.setup();

    render(
      <DashboardLayout user={mockUser} pageTitle="Menu" onSignOut={vi.fn()}>
        <div>content</div>
      </DashboardLayout>,
    );

    const menuButton = screen.getByRole("button", { name: /menu/i });
    await user.click(menuButton);

    const overlay = document.querySelector(
      ".fixed.inset-0.z-40.bg-black\\/50.lg\\:hidden",
    ) as HTMLElement;
    expect(overlay).toBeInTheDocument();

    await user.click(overlay);

    expect(
      document.querySelector(".fixed.inset-0.z-40.bg-black\\/50.lg\\:hidden"),
    ).not.toBeInTheDocument();
  });

  it("locks and restores body scroll when mobile menu toggles", async () => {
    const user = userEvent.setup();

    render(
      <DashboardLayout user={mockUser} pageTitle="Scroll" onSignOut={vi.fn()}>
        <div>content</div>
      </DashboardLayout>,
    );

    const menuButton = screen.getByRole("button", { name: /menu/i });
    await user.click(menuButton);

    expect(document.body.style.overflow).toBe("hidden");

    const closeButtons = screen.getAllByRole("button", { name: /close/i });
    await user.click(closeButtons[0]);

    expect(document.body.style.overflow).toBe("");
  });

  it("cleans up body overflow when unmounted after being open", async () => {
    const user = userEvent.setup();

    const { unmount } = render(
      <DashboardLayout user={mockUser} pageTitle="Unmount" onSignOut={vi.fn()}>
        <div>content</div>
      </DashboardLayout>,
    );

    const menuButton = screen.getByRole("button", { name: /menu/i });
    await user.click(menuButton);
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes the mobile drawer when a nav item is clicked", async () => {
    const user = userEvent.setup();

    render(
      <DashboardLayout user={mockUser} pageTitle="Nav" onSignOut={vi.fn()}>
        <div>content</div>
      </DashboardLayout>,
    );

    const menuButton = screen.getByRole("button", { name: /menu/i });
    await user.click(menuButton);

    const drawer = document.querySelector(
      ".fixed.inset-y-0.left-0.z-50.w-64.transform",
    ) as HTMLElement;
    expect(drawer.className).toContain("translate-x-0");

    const jobLink = within(drawer).getByRole("link", { name: /job matches/i });
    await user.click(jobLink);

    expect(drawer.className).toContain("-translate-x-full");
  });
});
