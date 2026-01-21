import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { createClient as createSupabaseClient } from "@/app/lib/supabase/client";
import GoogleSignInButton, { handleGoogleOAuth } from "../GoogleSignInButton";

const { mockCreateClient, mockSignInWithOAuth } = vi.hoisted(() => {
  const signInMock = vi.fn();
  const createMock = vi.fn(() => ({
    auth: { signInWithOAuth: signInMock },
  }));
  return { mockCreateClient: createMock, mockSignInWithOAuth: signInMock };
});

vi.mock("@/app/lib/supabase/client", () => ({
  createClient: mockCreateClient,
}));

describe("GoogleSignInButton", () => {
  beforeEach(() => {
    mockCreateClient.mockClear();
    mockSignInWithOAuth.mockClear();
  });

  it("returns early when already loading", async () => {
    const setIsLoading = vi.fn();

    await handleGoogleOAuth(
      true,
      setIsLoading,
      mockCreateClient as unknown as typeof createSupabaseClient,
      {
        location: { origin: "https://example.com" },
      } as Window & typeof globalThis,
    );

    expect(mockCreateClient).not.toHaveBeenCalled();
    expect(mockSignInWithOAuth).not.toHaveBeenCalled();
    expect(setIsLoading).not.toHaveBeenCalled();
  });

  it("starts Google OAuth with redirect and disables while loading", async () => {
    mockSignInWithOAuth.mockResolvedValue({ error: null });

    render(<GoogleSignInButton />);

    const button = screen.getByRole("button", {
      name: /continue with google/i,
    });
    fireEvent.click(button);

    await waitFor(() => expect(button).toBeDisabled());
    expect(mockCreateClient).toHaveBeenCalled();
    expect(mockSignInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  });

  it("prevents duplicate clicks once loading", async () => {
    mockSignInWithOAuth.mockResolvedValue({ error: null });

    render(<GoogleSignInButton />);
    const button = screen.getByRole("button", {
      name: /continue with google/i,
    });

    fireEvent.click(button);
    await waitFor(() => expect(button).toBeDisabled());
    fireEvent.click(button);

    expect(mockSignInWithOAuth).toHaveBeenCalledTimes(1);
  });

  it("logs error and re-enables on failure", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockSignInWithOAuth.mockResolvedValue({ error: new Error("oauth failed") });

    render(<GoogleSignInButton />);
    const button = screen.getByRole("button", {
      name: /continue with google/i,
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("OAuth error:", "oauth failed");
      expect(button).not.toBeDisabled();
    });

    consoleSpy.mockRestore();
  });
});
