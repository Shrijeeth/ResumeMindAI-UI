import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useGraphData } from "../useGraphData";
import type { ApiGraphResponse } from "../../types/graph";

// Mock the graph API module
vi.mock("../../api/graph", () => ({
  getDocumentGraph: vi.fn(),
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

describe("useGraphData", () => {
  let mockGetDocumentGraph: ReturnType<typeof vi.fn>;

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
    mockGetDocumentGraph = graphApi.getDocumentGraph as ReturnType<
      typeof vi.fn
    >;
  });

  it("fetches and transforms data on mount", async () => {
    mockGetDocumentGraph.mockResolvedValue({
      data: mockApiResponse,
      error: null,
      status: 200,
    });

    const { result } = renderHook(() =>
      useGraphData({ documentId: "doc-123" }),
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).not.toBeNull();
    expect(result.current.data?.nodes).toHaveLength(1);
    expect(result.current.error).toBeNull();
    expect(mockGetDocumentGraph).toHaveBeenCalledWith("doc-123", undefined);
  });

  it("classifies 401 as unauthorized error", async () => {
    mockGetDocumentGraph.mockResolvedValue({
      data: null,
      error: { message: "Authentication required" },
      status: 401,
    });

    const { result } = renderHook(() =>
      useGraphData({ documentId: "doc-123" }),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error?.type).toBe("unauthorized");
    expect(result.current.data).toBeNull();
  });

  it("classifies 403 as forbidden error", async () => {
    mockGetDocumentGraph.mockResolvedValue({
      data: null,
      error: { message: "Access denied" },
      status: 403,
    });

    const { result } = renderHook(() =>
      useGraphData({ documentId: "doc-123" }),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error?.type).toBe("forbidden");
  });

  it("classifies 404 as not_found error", async () => {
    mockGetDocumentGraph.mockResolvedValue({
      data: null,
      error: { message: "Document not found" },
      status: 404,
    });

    const { result } = renderHook(() =>
      useGraphData({ documentId: "doc-123" }),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error?.type).toBe("not_found");
  });

  it("classifies 400 as validation error", async () => {
    mockGetDocumentGraph.mockResolvedValue({
      data: null,
      error: { message: "Invalid type" },
      status: 400,
    });

    const { result } = renderHook(() =>
      useGraphData({ documentId: "doc-123" }),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error?.type).toBe("validation");
  });

  it("classifies status 0 as network error", async () => {
    mockGetDocumentGraph.mockResolvedValue({
      data: null,
      error: { message: "Network error" },
      status: 0,
    });

    const { result } = renderHook(() =>
      useGraphData({ documentId: "doc-123" }),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error?.type).toBe("network");
  });

  it("does not fetch when enabled is false", async () => {
    const { result } = renderHook(() =>
      useGraphData({ documentId: "doc-123", enabled: false }),
    );

    // Should stay in initial loading state but not call API
    expect(mockGetDocumentGraph).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(true);
  });

  it("provides a refresh function that refetches data", async () => {
    mockGetDocumentGraph.mockResolvedValue({
      data: mockApiResponse,
      error: null,
      status: 200,
    });

    const { result } = renderHook(() =>
      useGraphData({ documentId: "doc-123" }),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockGetDocumentGraph).toHaveBeenCalledTimes(1);

    await result.current.refresh();

    expect(mockGetDocumentGraph).toHaveBeenCalledTimes(2);
  });

  it("returns empty graph data when response has no data and no error", async () => {
    mockGetDocumentGraph.mockResolvedValue({
      data: null,
      error: null,
      status: 200,
    });

    const { result } = renderHook(() =>
      useGraphData({ documentId: "doc-123" }),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual({ nodes: [], links: [] });
    expect(result.current.error).toBeNull();
  });
});
