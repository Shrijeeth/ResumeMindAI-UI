import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import SettingsNav from "../SettingsNav";

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

// Mock SettingsNavItem component
vi.mock("../SettingsNavItem", () => ({
  default: ({
    icon,
    label,
    href,
    active,
    badge,
  }: {
    icon: string;
    label: string;
    href: string;
    active?: boolean;
    badge?: string;
  }) => (
    <div data-testid="settings-nav-item">
      <span data-testid="nav-icon">{icon}</span>
      <span data-testid="nav-label">{label}</span>
      <span data-testid="nav-href">{href}</span>
      <span data-testid="nav-active">{active ? "active" : "inactive"}</span>
      {badge && <span data-testid="nav-badge">{badge}</span>}
    </div>
  ),
}));

describe("SettingsNav", () => {
  const mockUsePathname = vi.mocked(usePathname);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all navigation sections", () => {
    mockUsePathname.mockReturnValue("/dashboard/settings/llm-providers");

    render(<SettingsNav />);

    expect(screen.getByText("AI Configuration")).toBeVisible();
    expect(screen.getByText("Developer")).toBeVisible();
    expect(screen.getByText("App")).toBeVisible();
  });

  it("renders LLM Providers item", () => {
    mockUsePathname.mockReturnValue("/dashboard/settings/llm-providers");

    render(<SettingsNav />);

    const llmProviderItem = screen.getByText("LLM Providers");
    expect(llmProviderItem).toBeVisible();

    const navItems = screen.getAllByTestId("settings-nav-item");
    const llmProviderNav = navItems.find(
      (item) =>
        item.querySelector('[data-testid="nav-label"]')?.textContent ===
        "LLM Providers",
    );
    expect(llmProviderNav).toBeTruthy();
    expect(
      llmProviderNav?.querySelector('[data-testid="nav-icon"]'),
    ).toHaveTextContent("smart_toy");
    expect(
      llmProviderNav?.querySelector('[data-testid="nav-href"]'),
    ).toHaveTextContent("/dashboard/settings/llm-providers");
  });

  it("renders API Keys item with Soon badge", () => {
    mockUsePathname.mockReturnValue("/dashboard/settings/api-keys");

    render(<SettingsNav />);

    const apiKeyItem = screen.getByText("API Keys");
    expect(apiKeyItem).toBeVisible();

    const navItems = screen.getAllByTestId("settings-nav-item");
    const apiKeyNav = navItems.find(
      (item) =>
        item.querySelector('[data-testid="nav-label"]')?.textContent ===
        "API Keys",
    );
    expect(apiKeyNav).toBeTruthy();
    expect(
      apiKeyNav?.querySelector('[data-testid="nav-icon"]'),
    ).toHaveTextContent("key");
    expect(
      apiKeyNav?.querySelector('[data-testid="nav-href"]'),
    ).toHaveTextContent("/dashboard/settings/api-keys");
    expect(
      apiKeyNav?.querySelector('[data-testid="nav-badge"]'),
    ).toHaveTextContent("Soon");
  });

  it("renders Webhooks item with Soon badge", () => {
    mockUsePathname.mockReturnValue("/dashboard/settings/webhooks");

    render(<SettingsNav />);

    const webhookItem = screen.getByText("Webhooks");
    expect(webhookItem).toBeVisible();

    const navItems = screen.getAllByTestId("settings-nav-item");
    const webhookNav = navItems.find(
      (item) =>
        item.querySelector('[data-testid="nav-label"]')?.textContent ===
        "Webhooks",
    );
    expect(webhookNav).toBeTruthy();
    expect(
      webhookNav?.querySelector('[data-testid="nav-icon"]'),
    ).toHaveTextContent("webhook");
    expect(
      webhookNav?.querySelector('[data-testid="nav-href"]'),
    ).toHaveTextContent("/dashboard/settings/webhooks");
    expect(
      webhookNav?.querySelector('[data-testid="nav-badge"]'),
    ).toHaveTextContent("Soon");
  });

  it("renders Notifications item with Soon badge", () => {
    mockUsePathname.mockReturnValue("/dashboard/settings/notifications");

    render(<SettingsNav />);

    const notificationsItem = screen.getByText("Notifications");
    expect(notificationsItem).toBeVisible();

    const navItems = screen.getAllByTestId("settings-nav-item");
    const notificationsNav = navItems.find(
      (item) =>
        item.querySelector('[data-testid="nav-label"]')?.textContent ===
        "Notifications",
    );
    expect(notificationsNav).toBeTruthy();
    expect(
      notificationsNav?.querySelector('[data-testid="nav-icon"]'),
    ).toHaveTextContent("notifications");
    expect(
      notificationsNav?.querySelector('[data-testid="nav-href"]'),
    ).toHaveTextContent("/dashboard/settings/notifications");
    expect(
      notificationsNav?.querySelector('[data-testid="nav-badge"]'),
    ).toHaveTextContent("Soon");
  });

  it("sets active state correctly based on pathname", () => {
    mockUsePathname.mockReturnValue("/dashboard/settings/llm-providers");

    render(<SettingsNav />);

    const navItems = screen.getAllByTestId("settings-nav-item");
    const activeItem = navItems.find(
      (item) =>
        item.querySelector('[data-testid="nav-active"]')?.textContent ===
        "active",
    );
    expect(activeItem).toBeTruthy();
    expect(
      activeItem?.querySelector('[data-testid="nav-href"]'),
    ).toHaveTextContent("/dashboard/settings/llm-providers");
  });

  it("sets inactive state for non-current pathname", () => {
    mockUsePathname.mockReturnValue("/dashboard/settings/llm-providers");

    render(<SettingsNav />);

    const navItems = screen.getAllByTestId("settings-nav-item");
    const inactiveItems = navItems.filter(
      (item) =>
        item.querySelector('[data-testid="nav-active"]')?.textContent ===
        "inactive",
    );
    expect(inactiveItems.length).toBeGreaterThan(0);
  });

  it("renders navigation with correct structure", () => {
    mockUsePathname.mockReturnValue("/dashboard/settings/llm-providers");

    render(<SettingsNav />);

    const nav = screen.getByRole("navigation");
    expect(nav).toBeVisible();
    expect(nav).toHaveClass("w-64", "flex-shrink-0", "space-y-6");
  });

  it("renders section titles with correct styling", () => {
    mockUsePathname.mockReturnValue("/dashboard/settings/llm-providers");

    render(<SettingsNav />);

    const sectionTitles = screen.getAllByRole("heading", { level: 3 });
    expect(sectionTitles).toHaveLength(3);

    sectionTitles.forEach((title) => {
      expect(title).toHaveClass(
        "px-3",
        "text-[10px]",
        "font-bold",
        "text-slate-500",
        "uppercase",
        "tracking-wider",
        "mb-2",
      );
    });
  });

  it("renders all expected navigation items", () => {
    mockUsePathname.mockReturnValue("/dashboard/settings/llm-providers");

    render(<SettingsNav />);

    const navItems = screen.getAllByTestId("settings-nav-item");
    expect(navItems).toHaveLength(4); // LLM Providers, API Keys, Webhooks, Notifications

    const labels = navItems.map(
      (item) => item.querySelector('[data-testid="nav-label"]')?.textContent,
    );
    expect(labels).toContain("LLM Providers");
    expect(labels).toContain("API Keys");
    expect(labels).toContain("Webhooks");
    expect(labels).toContain("Notifications");
  });
});
