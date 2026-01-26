import { render, screen } from "@testing-library/react";
import SettingsComingSoon from "../SettingsComingSoon";

describe("SettingsComingSoon", () => {
  const baseProps = {
    title: "Advanced Settings",
    description:
      "Configure advanced provider settings, custom endpoints, and performance optimizations.",
    icon: "settings",
  };

  it("renders with provided title, description, and icon", () => {
    render(<SettingsComingSoon {...baseProps} />);

    expect(screen.getByText("Advanced Settings")).toBeVisible();
    expect(
      screen.getByText(/configure advanced provider settings/i),
    ).toBeVisible();
    expect(screen.getByText("settings")).toBeVisible();
  });

  it("shows coming soon badge with correct styling", () => {
    render(<SettingsComingSoon {...baseProps} />);

    const badge = screen.getByText("Coming Soon");
    expect(badge).toBeVisible();
    expect(badge.className).toContain("text-orange-400");

    const badgeContainer = badge.closest("div");
    expect(badgeContainer?.className).toContain("bg-orange-500/10");
    expect(badgeContainer?.className).toContain("border-orange-500/20");
  });

  it("displays construction icon in coming soon badge", () => {
    render(<SettingsComingSoon {...baseProps} />);

    const constructionIcon = screen.getByText("construction");
    expect(constructionIcon).toBeVisible();
    expect(constructionIcon.className).toContain("text-orange-400");
  });

  it("shows main icon with correct styling", () => {
    render(<SettingsComingSoon {...baseProps} />);

    const mainIcon = screen.getByText("settings");
    expect(mainIcon).toBeVisible();
    expect(mainIcon.className).toContain("text-primary");
    expect(mainIcon.className).toContain("text-3xl");
  });

  it("renders within glass card container", () => {
    const { container } = render(<SettingsComingSoon {...baseProps} />);

    const glassCard = container.querySelector(".glass-card");
    expect(glassCard).toBeVisible();
    expect(glassCard).toHaveClass("p-8", "rounded-2xl", "text-center");
  });

  it("displays icon container with correct styling", () => {
    const { container } = render(<SettingsComingSoon {...baseProps} />);

    const iconContainer = container.querySelector(".w-16.h-16");
    expect(iconContainer).toBeVisible();
    expect(iconContainer).toHaveClass("bg-primary/10", "rounded-2xl");
  });

  it("centers content properly", () => {
    const { container } = render(<SettingsComingSoon {...baseProps} />);

    const wrapper = container.querySelector(".max-w-md.mx-auto");
    expect(wrapper).toBeVisible();
    expect(wrapper).toHaveClass("py-12");

    const iconContainer = container.querySelector(".mx-auto");
    expect(iconContainer).toBeVisible();
  });

  it("renders with different props", () => {
    const differentProps = {
      title: "Security Settings",
      description:
        "Manage authentication, encryption, and access control for your providers.",
      icon: "security",
    };

    render(<SettingsComingSoon {...differentProps} />);

    expect(screen.getByText("Security Settings")).toBeVisible();
    expect(screen.getByText(/manage authentication/i)).toBeVisible();
    expect(screen.getByText("security")).toBeVisible();
  });

  it("maintains consistent text styling", () => {
    render(<SettingsComingSoon {...baseProps} />);

    const title = screen.getByText("Advanced Settings");
    expect(title.className).toContain("text-xl", "font-bold", "text-white");

    const description = screen.getByText(
      /configure advanced provider settings/i,
    );
    expect(description.className).toContain("text-slate-400", "text-sm");
  });

  it("shows proper spacing between elements", () => {
    const { container } = render(<SettingsComingSoon {...baseProps} />);

    const iconContainer = container.querySelector(".mb-6");
    expect(iconContainer).toBeVisible();

    const badge = screen.getByText("Coming Soon").closest(".mb-4");
    expect(badge).toBeVisible();

    const title = screen.getByText("Advanced Settings").closest(".mb-3");
    expect(title).toBeVisible();
  });
});
