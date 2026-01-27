import { render, screen } from "@testing-library/react";
import SettingsNavItem from "../SettingsNavItem";

describe("SettingsNavItem", () => {
  const baseProps = {
    icon: "smart_toy",
    label: "LLM Providers",
    href: "/dashboard/settings/llm-providers",
  };

  it("renders navigation item with basic props", () => {
    render(<SettingsNavItem {...baseProps} />);

    expect(screen.getByText("LLM Providers")).toBeVisible();
    expect(screen.getByText("smart_toy")).toBeVisible();
  });

  it("renders as active when active prop is true", () => {
    render(<SettingsNavItem {...baseProps} active={true} />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass(
      "bg-primary/10",
      "text-primary",
      "border-l-2",
      "border-primary",
      "rounded-l-none",
    );
  });

  it("renders as inactive when active prop is false", () => {
    render(<SettingsNavItem {...baseProps} active={false} />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass(
      "text-slate-400",
      "hover:text-slate-200",
      "hover:bg-slate-800/50",
    );
  });

  it("renders as inactive by default", () => {
    render(<SettingsNavItem {...baseProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass(
      "text-slate-400",
      "hover:text-slate-200",
      "hover:bg-slate-800/50",
    );
  });

  it("renders badge when provided", () => {
    render(<SettingsNavItem {...baseProps} badge="Soon" />);

    expect(screen.getByText("Soon")).toBeVisible();
    const badge = screen.getByText("Soon");
    expect(badge).toHaveClass(
      "text-[9px]",
      "px-1.5",
      "py-0.5",
      "rounded",
      "bg-slate-800",
      "text-slate-500",
      "border",
      "border-slate-700/50",
      "uppercase",
      "font-bold",
      "tracking-wider",
      "shrink-0",
    );
  });

  it("does not render badge when not provided", () => {
    render(<SettingsNavItem {...baseProps} />);

    expect(screen.queryByText("Soon")).not.toBeInTheDocument();
  });

  it("renders with correct href", () => {
    render(<SettingsNavItem {...baseProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/dashboard/settings/llm-providers");
  });

  it("renders icon with correct styling", () => {
    render(<SettingsNavItem {...baseProps} />);

    const icon = screen.getByText("smart_toy");
    expect(icon).toHaveClass(
      "material-symbols-outlined",
      "text-[20px]",
      "shrink-0",
    );
  });

  it("renders label with truncate styling and title", () => {
    render(<SettingsNavItem {...baseProps} />);

    const label = screen.getByText("LLM Providers");
    expect(label).toHaveClass("truncate");
    expect(label).toHaveAttribute("title", "LLM Providers");
  });

  it("renders correct link styling classes", () => {
    render(<SettingsNavItem {...baseProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass(
      "flex",
      "items-center",
      "justify-between",
      "px-3",
      "py-2.5",
      "text-sm",
      "font-medium",
      "rounded-lg",
      "transition-all",
      "duration-200",
    );
  });

  it("renders content container with correct styling", () => {
    render(<SettingsNavItem {...baseProps} />);

    const container = screen.getByText("LLM Providers").closest("div");
    expect(container).toHaveClass(
      "flex",
      "items-center",
      "gap-3",
      "min-w-0",
      "flex-1",
    );
  });

  it("renders with different icon", () => {
    render(<SettingsNavItem {...baseProps} icon="key" />);

    expect(screen.getByText("key")).toBeVisible();
  });

  it("renders with different label and href", () => {
    render(
      <SettingsNavItem
        icon="notifications"
        label="Notifications"
        href="/dashboard/settings/notifications"
        badge="Soon"
      />,
    );

    expect(screen.getByText("Notifications")).toBeVisible();
    expect(screen.getByText("notifications")).toBeVisible();
    expect(screen.getByText("Soon")).toBeVisible();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/dashboard/settings/notifications");
  });

  it("renders long label with truncation", () => {
    const longLabel = "Very Long Settings Item Name That Should Be Truncated";
    render(<SettingsNavItem {...baseProps} label={longLabel} />);

    const label = screen.getByText(longLabel);
    expect(label).toHaveClass("truncate");
    expect(label).toHaveAttribute("title", longLabel);
  });

  it("renders badge with different text", () => {
    render(<SettingsNavItem {...baseProps} badge="New" />);

    expect(screen.getByText("New")).toBeVisible();
    const badge = screen.getByText("New");
    expect(badge).toHaveClass("uppercase", "font-bold", "tracking-wider");
  });
});
