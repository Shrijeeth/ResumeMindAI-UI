import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ComingSoonPage from "../ComingSoonPage";

const mockPush = vi.fn();
const mockRefresh = vi.fn();
const mockSignOut = vi.fn().mockResolvedValue({});
const mockGetUser = vi.fn().mockResolvedValue({
  data: { user: { id: "123", email: "test@test.com" } },
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
  usePathname: () => "/dashboard/test",
}));

vi.mock("@/app/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      getUser: mockGetUser,
      signOut: mockSignOut,
    },
  }),
}));

describe("ComingSoonPage", () => {
  const defaultProps: {
    title: string;
    description: string;
    icon: string;
    features?: string[];
  } = {
    title: "Analytics Page",
    description: "Advanced analytics features coming soon.",
    icon: "analytics",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state initially while fetching user", () => {
    render(<ComingSoonPage {...defaultProps} />);

    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toBeVisible();
  });

  it("shows title and description after user is loaded", async () => {
    render(<ComingSoonPage {...defaultProps} />);

    await waitFor(() => {
      const titles = screen.getAllByText("Analytics Page");
      expect(titles.length).toBeGreaterThan(0);
      expect(
        screen.getByText(/advanced analytics features coming soon/i),
      ).toBeVisible();
    });
  });

  it("displays the icon", async () => {
    render(<ComingSoonPage {...defaultProps} />);

    await waitFor(() => {
      const icons = screen.getAllByText("analytics");
      expect(icons.length).toBeGreaterThan(0);
      expect(icons[0]).toBeVisible();
    });
  });

  it("shows Coming Soon badge", async () => {
    render(<ComingSoonPage {...defaultProps} />);

    await waitFor(() => {
      const badges = screen.getAllByText(/coming soon/i);
      expect(badges.length).toBeGreaterThan(0);
      expect(screen.getByText("construction")).toBeVisible();
    });
  });

  it("displays features list when features prop is provided", async () => {
    const props = {
      ...defaultProps,
      features: ["Feature 1", "Feature 2", "Feature 3"],
    };

    render(<ComingSoonPage {...props} />);

    await waitFor(() => {
      expect(screen.getByText("Feature 1")).toBeVisible();
      expect(screen.getByText("Feature 2")).toBeVisible();
      expect(screen.getByText("Feature 3")).toBeVisible();
      expect(screen.getByText(/planned features/i)).toBeVisible();
    });
  });

  it("does not display features section when features prop is empty", async () => {
    render(<ComingSoonPage {...defaultProps} />);

    await waitFor(() => {
      expect(screen.queryByText(/planned features/i)).not.toBeInTheDocument();
    });
  });

  it("does not display features section when features prop is not provided (defaults to empty array)", async () => {
    const { ...propsWithoutFeatures } = defaultProps;

    render(<ComingSoonPage {...propsWithoutFeatures} />);

    await waitFor(() => {
      expect(screen.queryByText(/planned features/i)).not.toBeInTheDocument();
    });
  });

  it("renders and handles Back to Dashboard button click", async () => {
    render(<ComingSoonPage {...defaultProps} />);

    await waitFor(() => {
      const backButton = screen.getByRole("button", {
        name: /back to dashboard/i,
      });
      expect(backButton).toBeVisible();
      expect(screen.getByText("arrow_back")).toBeVisible();

      fireEvent.click(backButton);
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("show check_circle icons for each feature", async () => {
    const props = {
      ...defaultProps,
      features: ["Feature A", "Feature B"],
    };

    render(<ComingSoonPage {...props} />);

    await waitFor(() => {
      const checkIcons = screen.getAllByText("check_circle");
      expect(checkIcons.length).toBe(2);
    });
  });

  it("styles title with text-white class", async () => {
    render(<ComingSoonPage {...defaultProps} />);

    await waitFor(() => {
      const titles = screen.getAllByText("Analytics Page");
      const mainTitle = titles.find((t) => t.classList.contains("text-2xl"));
      expect(mainTitle).toHaveClass("text-white");
    });
  });

  it("styles Coming Soon badge with orange colors", async () => {
    const { container } = render(<ComingSoonPage {...defaultProps} />);

    await waitFor(() => {
      const badgeContainer = container.querySelector(
        ".inline-flex.bg-orange-500\\/10",
      );
      expect(badgeContainer).toBeVisible();
      expect(
        badgeContainer?.querySelector(
          ".material-symbols-outlined.text-orange-400",
        ),
      ).toBeVisible();
    });
  });

  describe("Layout and Styling", () => {
    it("uses glass-card styling for main content", async () => {
      const { container } = render(<ComingSoonPage {...defaultProps} />);

      await waitFor(() => {
        const glassCard = container.querySelector(".glass-card");
        expect(glassCard).toBeVisible();
      });
    });

    it("centers icon container", async () => {
      const { container } = render(<ComingSoonPage {...defaultProps} />);

      await waitFor(() => {
        const iconContainer = container.querySelector(".w-20.h-20");
        expect(iconContainer).toBeInTheDocument();
      });
    });

    it("displays badge with proper styling classes", async () => {
      const { container } = render(<ComingSoonPage {...defaultProps} />);

      await waitFor(() => {
        const badge = container.querySelector(".inline-flex");
        expect(badge).toHaveClass(
          "bg-orange-500/10",
          "border",
          "border-orange-500/20",
        );
      });
    });
  });

  describe("Default Props", () => {
    it("features defaults to empty array when not provided", async () => {
      const propsWithoutFeatures = {
        title: "Test",
        description: "Test description",
        icon: "test",
      };

      render(<ComingSoonPage {...propsWithoutFeatures} />);

      await waitFor(() => {
        expect(screen.queryByText(/planned features/i)).not.toBeInTheDocument();
      });
    });
  });

  describe("User Authentication States", () => {
    it("displays content when user is authenticated", async () => {
      render(<ComingSoonPage {...defaultProps} />);

      await waitFor(() => {
        const titles = screen.getAllByText("Analytics Page");
        expect(titles.length).toBeGreaterThan(0);
      });

      const spinner = document.querySelector(".animate-spin");
      expect(spinner).not.toBeInTheDocument();
    });

    it("handles sign out correctly", async () => {
      render(<ComingSoonPage {...defaultProps} />);

      const signOutButtons = await screen.findAllByRole("button", {
        name: /sign out/i,
      });
      expect(signOutButtons.length).toBeGreaterThan(0);

      fireEvent.click(signOutButtons[0]);

      await waitFor(() => {
        expect(mockSignOut).toHaveBeenCalled();
        expect(mockPush).toHaveBeenCalledWith("/auth/login");
        expect(mockRefresh).toHaveBeenCalled();
      });
    });
  });

  describe("Content Display", () => {
    it("handles long feature descriptions", async () => {
      const longFeature =
        "This is a very long feature description that should wrap properly in the UI without breaking layout";

      render(<ComingSoonPage {...defaultProps} features={[longFeature]} />);

      await waitFor(() => {
        expect(screen.getByText(longFeature)).toBeVisible();
      });
    });

    it("handles empty description", async () => {
      render(<ComingSoonPage {...defaultProps} description="" />);

      await waitFor(() => {
        const titles = screen.getAllByText("Analytics Page");
        expect(titles.length).toBeGreaterThan(0);
      });
    });
  });
});
