import { GET } from "../callback/route";

const { mockCreateClient, mockExchangeCodeForSession } = vi.hoisted(() => {
  const exchangeMock = vi.fn();
  const createMock = vi.fn(() => ({
    auth: { exchangeCodeForSession: exchangeMock },
  }));

  return {
    mockExchangeCodeForSession: exchangeMock,
    mockCreateClient: createMock,
  };
});

vi.mock("@/app/lib/supabase/server", () => ({
  createClient: mockCreateClient,
}));

describe("auth callback route", () => {
  beforeEach(() => {
    mockCreateClient.mockClear();
    mockExchangeCodeForSession.mockClear();
  });

  it("redirects to forwarded host with next param when session exchange succeeds", async () => {
    mockExchangeCodeForSession.mockResolvedValue({ error: null });

    const request = new Request(
      "https://example.com/auth/callback?code=test-code&next=/profile",
      {
        headers: {
          "x-forwarded-host": "proxy.internal",
          "x-forwarded-proto": "http",
        },
      },
    );

    const response = await GET(request);

    expect(mockCreateClient).toHaveBeenCalled();
    expect(mockExchangeCodeForSession).toHaveBeenCalledWith("test-code");
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "http://proxy.internal/profile",
    );
  });

  it("redirects to origin with default next when no forwarded headers are present", async () => {
    mockExchangeCodeForSession.mockResolvedValue({ error: null });

    const response = await GET(
      new Request("https://example.com/auth/callback?code=test-code"),
    );

    expect(mockCreateClient).toHaveBeenCalled();
    expect(mockExchangeCodeForSession).toHaveBeenCalledWith("test-code");
    expect(response.headers.get("location")).toBe(
      "https://example.com/dashboard",
    );
  });

  it("falls back to login error when code is missing", async () => {
    const response = await GET(
      new Request("https://example.com/auth/callback"),
    );

    expect(mockCreateClient).not.toHaveBeenCalled();
    expect(response.headers.get("location")).toBe(
      "https://example.com/auth/login?error=auth_callback_error",
    );
  });

  it("falls back to login error when session exchange fails", async () => {
    mockExchangeCodeForSession.mockResolvedValue({
      error: new Error("exchange failed"),
    });

    const response = await GET(
      new Request("https://example.com/auth/callback?code=bad-code"),
    );

    expect(mockCreateClient).toHaveBeenCalled();
    expect(mockExchangeCodeForSession).toHaveBeenCalledWith("bad-code");
    expect(response.headers.get("location")).toBe(
      "https://example.com/auth/login?error=auth_callback_error",
    );
  });
});
