import { describe, it, expect, vi, beforeEach } from "vitest";
import { getDocumentGraph } from "../graph";

// Mock the client module
vi.mock("../client", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("getDocumentGraph", () => {
  let mockGet: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.clearAllMocks();
    const client = await import("../client");
    mockGet = client.default.get as ReturnType<typeof vi.fn>;
    mockGet.mockResolvedValue({ data: null, error: null, status: 200 });
  });

  it("calls correct endpoint with document ID", async () => {
    await getDocumentGraph("doc-123");

    expect(mockGet).toHaveBeenCalledWith("/documents/doc-123/graph");
  });

  it("adds types query param as CSV", async () => {
    await getDocumentGraph("doc-123", { types: ["Skill", "Company"] });

    expect(mockGet).toHaveBeenCalledWith(
      "/documents/doc-123/graph?types=Skill%2CCompany",
    );
  });

  it("adds max_nodes query param", async () => {
    await getDocumentGraph("doc-123", { max_nodes: 50 });

    expect(mockGet).toHaveBeenCalledWith(
      "/documents/doc-123/graph?max_nodes=50",
    );
  });

  it("combines multiple query params", async () => {
    await getDocumentGraph("doc-123", {
      types: ["Skill"],
      max_nodes: 25,
    });

    const calledPath = mockGet.mock.calls[0][0] as string;
    expect(calledPath).toContain("/documents/doc-123/graph?");
    expect(calledPath).toContain("types=Skill");
    expect(calledPath).toContain("max_nodes=25");
  });

  it("omits query string when no params provided", async () => {
    await getDocumentGraph("doc-123", {});

    expect(mockGet).toHaveBeenCalledWith("/documents/doc-123/graph");
  });

  it("omits types param when empty array", async () => {
    await getDocumentGraph("doc-123", { types: [] });

    expect(mockGet).toHaveBeenCalledWith("/documents/doc-123/graph");
  });
});
