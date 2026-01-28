import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useUserGraphData } from "../useUserGraphData";
import type { ApiGraphResponse } from "../../types/graph";

// Mock the graph API module
vi.mock("../../api/graph", () => ({
  getUserGraph: vi.fn(),
}));

// Mock the transformer to pass through data
vi.mock("../../transformers/graphTransformer", () => ({
  transformGraphResponse: vi.fn((data: ApiGraphResponse) => ({
    nodes: data.nodes.map((n) => ({
      ...n,
      data: { ...n.data, type: n.data.type.toLowerCase() },
    })),
    links: data.links,
  })),
}));

describe("useUserGraphData", () => {
  let mockGetUserGraph: ReturnType<typeof vi.fn>;

  const mockApiResponse: ApiGraphResponse = {
    nodes: [
      {
        id: 1,
        labels: ["Skill"],
        color: "#000",
        visible: true,
        data: { name: "Python", type: "Skill" },
      },
    ],
    links: [],
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    const graphApi = await import("../../api/graph");
    mockGetUserGraph = graphApi.getUserGraph as ReturnType<typeof vi.fn>;
  });

  it("fetches and transforms data on mount", async () => {
    mockGetUserGraph.mockResolvedValue({
      data: mockApiResponse,
      error: null,
      status: 200,
    });

    const { result } = renderHook(() => useUserGraphData());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).not.toBeNull();
    expect(result.current.data?.nodes).toHaveLength(1);
    expect(result.current.error).toBeNull();
    expect(mockGetUserGraph).toHaveBeenCalledWith(undefined);
  });

  it("classifies 401 as unauthorized error", async () => {
    mockGetUserGraph.mockResolvedValue({
      data: null,
      error: { message: "Authentication required" },
      status: 401,
    });

    const { result } = renderHook(() => useUserGraphData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error?.type).toBe("unauthorized");
    expect(result.current.data).toBeNull();
  });

  it("classifies 403 as forbidden error", async () => {
    mockGetUserGraph.mockResolvedValue({
      data: null,
      error: { message: "Access denied" },
      status: 403,
    });

    const { result } = renderHook(() => useUserGraphData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error?.type).toBe("forbidden");
    expect(result.current.data).toBeNull();
  });

  it("classifies 404 as not_found error", async () => {
    mockGetUserGraph.mockResolvedValue({
      data: null,
      error: { message: "Graph not found" },
      status: 404,
    });

    const { result } = renderHook(() => useUserGraphData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error?.type).toBe("not_found");
    expect(result.current.data).toBeNull();
  });

  it("classifies 400 as validation error", async () => {
    mockGetUserGraph.mockResolvedValue({
      data: null,
      error: { message: "Invalid node type" },
      status: 400,
    });

    const { result } = renderHook(() => useUserGraphData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error?.type).toBe("validation");
    expect(result.current.data).toBeNull();
  });

  it("classifies 500 as unknown error", async () => {
    mockGetUserGraph.mockResolvedValue({
      data: null,
      error: { message: "Internal server error" },
      status: 500,
    });

    const { result } = renderHook(() => useUserGraphData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error?.type).toBe("unknown");
    expect(result.current.data).toBeNull();
  });

  it("handles network errors (status 0)", async () => {
    mockGetUserGraph.mockResolvedValue({
      data: null,
      error: { message: "Network error" },
      status: 0,
    });

    const { result } = renderHook(() => useUserGraphData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error?.type).toBe("network");
    expect(result.current.data).toBeNull();
  });

  it("passes query params to API", async () => {
    mockGetUserGraph.mockResolvedValue({
      data: mockApiResponse,
      error: null,
      status: 200,
    });

    const { result } = renderHook(() =>
      useUserGraphData({
        queryParams: {
          types: ["Skill", "Company"],
          max_nodes: 50,
          max_depth: 3,
        },
      }),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data?.nodes).toHaveLength(1);
    expect(mockGetUserGraph).toHaveBeenCalledWith({
      types: ["Skill", "Company"],
      max_nodes: 50,
      max_depth: 3,
    });
  });

  it("handles empty response", async () => {
    mockGetUserGraph.mockResolvedValue({
      data: null,
      error: null,
      status: 200,
    });

    const { result } = renderHook(() => useUserGraphData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual({ nodes: [], links: [] });
    expect(result.current.error).toBeNull();
  });

  it("refresh function refetches data", async () => {
    mockGetUserGraph
      .mockResolvedValueOnce({
        data: mockApiResponse,
        error: null,
        status: 200,
      })
      .mockResolvedValueOnce({
        data: {
          nodes: [
            {
              id: 2,
              labels: ["Company"],
              color: "#000",
              visible: true,
              data: { name: "Google", type: "Company" },
            },
          ],
          links: [],
        },
        error: null,
        status: 200,
      });

    const { result } = renderHook(() => useUserGraphData());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data?.nodes).toHaveLength(1);
    expect(result.current.data?.nodes[0].data.name).toBe("Python");

    // Refresh
    await result.current.refresh();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await waitFor(() => {
      expect(result.current.data?.nodes[0].data.name).toBe("Google");
    });

    expect(mockGetUserGraph).toHaveBeenCalledTimes(2);
  });

  it("does not fetch when disabled", async () => {
    mockGetUserGraph.mockResolvedValue({
      data: mockApiResponse,
      error: null,
      status: 200,
    });

    const { result } = renderHook(() => useUserGraphData({ enabled: false }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(mockGetUserGraph).not.toHaveBeenCalled();
  });

  it("handles unmounted component", async () => {
    mockGetUserGraph.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: mockApiResponse,
              error: null,
              status: 200,
            });
          }, 100);
        }),
    );

    const { result, unmount } = renderHook(() => useUserGraphData());

    // Unmount before data loads
    unmount();

    await new Promise((resolve) => setTimeout(resolve, 150));

    // Should not throw error
    expect(result.current.isLoading).toBe(true);
  });
});
