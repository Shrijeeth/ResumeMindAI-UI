import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DocumentDetailPanel from "../DocumentDetailPanel";
import type { DocumentDetail, DocumentType } from "@/app/lib/types/document";
import type { ApiResponse } from "@/app/lib/api/client";
import * as documentsApi from "@/app/lib/api/documents";

const mockDoc = {
  id: "1",
  original_filename: "resume.pdf",
  file_type: "pdf",
  document_type: "resume",
  status: "completed" as const,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-02T00:00:00Z",
  completed_at: "2024-01-03T00:00:00Z",
  classification_confidence: 0.87,
  progress_message: "Processing",
  error_message: "",
  markdown_content: "## Summary\nGreat candidate",
};

describe("DocumentDetailPanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("returns null when no documentId", () => {
    const { container } = render(
      <DocumentDetailPanel documentId={null} onClose={vi.fn()} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders loading state while fetching", async () => {
    vi.spyOn(documentsApi, "getDocument").mockReturnValue(
      new Promise(() => {}),
    );

    render(<DocumentDetailPanel documentId="1" onClose={vi.fn()} />);

    await waitFor(() => {
      expect(
        document.querySelectorAll(".animate-pulse").length,
      ).toBeGreaterThan(0);
    });
  });

  it("renders error state when request fails", async () => {
    vi.spyOn(documentsApi, "getDocument").mockResolvedValue({
      data: null,
      error: { message: "Failed" },
      status: 500,
    } as ApiResponse<DocumentDetail>);

    render(<DocumentDetailPanel documentId="1" onClose={vi.fn()} />);

    expect(await screen.findByText("Failed")).toBeVisible();
    expect(screen.getByLabelText("Close panel")).toBeVisible();
    expect(screen.getByRole("button", { name: "Close" })).toBeVisible();
  });

  it("renders document details on success", async () => {
    vi.spyOn(documentsApi, "getDocument").mockResolvedValue({
      data: mockDoc,
      error: null,
      status: 200,
    } as ApiResponse<DocumentDetail>);

    render(<DocumentDetailPanel documentId="1" onClose={vi.fn()} />);

    expect(await screen.findByText("resume.pdf")).toBeVisible();
    expect(screen.getByText("Resume")).toBeVisible();
    expect(screen.getByText(/confidence/i)).toBeVisible();
    expect(screen.getByText(/content preview/i)).toBeVisible();
  });

  it("renders fallback doc type and error message", async () => {
    vi.spyOn(documentsApi, "getDocument").mockResolvedValue({
      data: {
        ...mockDoc,
        document_type: null,
        error_message: "Something went wrong",
        markdown_content: undefined,
      },
      error: null,
      status: 200,
    } as ApiResponse<DocumentDetail>);

    render(<DocumentDetailPanel documentId="1" onClose={vi.fn()} />);

    expect(await screen.findByText("--")).toBeVisible();
    expect(screen.getByText("Something went wrong")).toBeVisible();
  });

  it("shows raw document type when not mapped", async () => {
    vi.spyOn(documentsApi, "getDocument").mockResolvedValue({
      data: {
        ...mockDoc,
        document_type: "custom_type" as DocumentType,
      },
      error: null,
      status: 200,
    } as ApiResponse<DocumentDetail>);

    render(<DocumentDetailPanel documentId="1" onClose={vi.fn()} />);

    expect(await screen.findByText("custom_type")).toBeVisible();
  });

  it("shows confidence fallback when undefined", async () => {
    vi.spyOn(documentsApi, "getDocument").mockResolvedValue({
      data: {
        ...mockDoc,
        classification_confidence: undefined,
      },
      error: null,
      status: 200,
    } as ApiResponse<DocumentDetail>);

    render(<DocumentDetailPanel documentId="1" onClose={vi.fn()} />);

    expect(await screen.findByText(/confidence/i)).toBeVisible();
    expect(screen.getByText(/confidence: --/i)).toBeVisible();
  });

  it("truncates long markdown content with ellipsis", async () => {
    const longContent = "A".repeat(2001);
    vi.spyOn(documentsApi, "getDocument").mockResolvedValue({
      data: {
        ...mockDoc,
        markdown_content: longContent,
      },
      error: null,
      status: 200,
    } as ApiResponse<DocumentDetail>);

    render(<DocumentDetailPanel documentId="1" onClose={vi.fn()} />);

    const pre = await screen.findByText(/\.\.\.$/);
    expect(pre.textContent?.endsWith("..."));
  });

  it("calls onClose when backdrop clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    vi.spyOn(documentsApi, "getDocument").mockResolvedValue({
      data: mockDoc,
      error: null,
      status: 200,
    } as ApiResponse<DocumentDetail>);

    render(<DocumentDetailPanel documentId="1" onClose={onClose} />);

    const backdrop = document.querySelector('[aria-hidden="true"]');
    await user.click(backdrop!);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape is pressed", async () => {
    const onClose = vi.fn();
    vi.spyOn(documentsApi, "getDocument").mockResolvedValue({
      data: mockDoc,
      error: null,
      status: 200,
    } as ApiResponse<DocumentDetail>);

    render(<DocumentDetailPanel documentId="1" onClose={onClose} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("locks and restores body scroll when opened and closed", () => {
    const onClose = vi.fn();
    const { rerender } = render(
      <DocumentDetailPanel documentId="1" onClose={onClose} />,
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender(<DocumentDetailPanel documentId={null} onClose={onClose} />);

    expect(document.body.style.overflow).toBe("");
  });
});
