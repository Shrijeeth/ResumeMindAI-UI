import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { PropsWithChildren } from "react";
import SidebarNavItem from "../SidebarNavItem";

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    onClick,
    className,
  }: PropsWithChildren<{
    href: string;
    onClick?: () => void;
    className?: string;
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

describe("SidebarNavItem", () => {
  it("applies active styles when active", () => {
    render(<SidebarNavItem icon="home" label="Home" href="/home" active />);

    const link = screen.getByRole("link", { name: /home/i });
    expect(link).toHaveClass("bg-primary/10");
    expect(link).toHaveClass("text-primary");
  });

  it("applies default styles when inactive", () => {
    render(<SidebarNavItem icon="home" label="Home" href="/home" />);

    const link = screen.getByRole("link", { name: /home/i });
    expect(link).toHaveClass("text-slate-400");
  });

  it("calls onClick when provided", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <SidebarNavItem
        icon="home"
        label="Home"
        href="/home"
        onClick={onClick}
      />,
    );

    const link = screen.getByRole("link", { name: /home/i });
    await user.click(link);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
