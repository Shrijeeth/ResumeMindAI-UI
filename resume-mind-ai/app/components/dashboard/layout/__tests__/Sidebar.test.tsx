import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { User } from "@supabase/supabase-js";
import type { ComponentProps, PropsWithChildren } from "react";
import Sidebar from "../Sidebar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt = "", ...props }: ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
  ),
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    className,
    onClick,
  }: PropsWithChildren<{
    href: string;
    className?: string;
    onClick?: () => void;
  }>) => (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
    >
      {children}
    </a>
  ),
}));

describe("Sidebar", () => {
  const user: User = {
    id: "user-1",
    email: "user@example.com",
    user_metadata: {
      full_name: "Test User",
      avatar_url: "https://example.com/avatar.png",
    },
    app_metadata: {},
    aud: "",
    created_at: "",
  };

  it("renders nav items and user info for desktop", () => {
    render(<Sidebar user={user} onSignOut={vi.fn()} />);

    expect(screen.getByText("Dashboard")).toBeVisible();
    const settingsLabel = screen
      .getAllByText("Settings")
      .find((el) => el.tagName === "A");
    expect(settingsLabel).toBeTruthy();
    expect(screen.getByText("Test User")).toBeVisible();
    expect(screen.getByText("user@example.com")).toBeVisible();
  });

  it("uses fallback avatar when no avatar_url", () => {
    const noAvatarUser: User = {
      ...user,
      user_metadata: { full_name: "NA" },
    };

    render(<Sidebar user={noAvatarUser} onSignOut={vi.fn()} />);

    expect(screen.getByText("person")).toBeVisible();
  });

  it("calls onNavigate before sign out when provided", async () => {
    const userEv = userEvent.setup();
    const onNavigate = vi.fn();
    const onSignOut = vi.fn();

    render(
      <Sidebar user={user} onSignOut={onSignOut} onNavigate={onNavigate} />,
    );

    const signOutButton = screen.getByRole("button", { name: /sign out/i });
    await userEv.click(signOutButton);

    expect(onNavigate).toHaveBeenCalledTimes(1);
    expect(onSignOut).toHaveBeenCalledTimes(1);
  });

  it("renders mobile variant layout", () => {
    render(<Sidebar user={user} onSignOut={vi.fn()} variant="mobile" />);

    expect(screen.getByText("Dashboard")).toBeVisible();
  });
});
