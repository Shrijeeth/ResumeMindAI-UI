import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AnalysisHistoryTable from "../AnalysisHistoryTable";
import type { DocumentListItem } from "@/app/lib/types/document";

const mockDocuments: DocumentListItem[] = [
  {
    id: "1",
    original_filename: "resume.pdf",
    file_type: "pdf",
    document_type: "resume",
    status: "completed",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    original_filename: "cover-letter.docx",
    file_type: "docx",
    document_type: "cover_letter",
    status: "parsing",
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "3",
    original_filename: "job-description.txt",
    file_type: "txt",
    document_type: "job_description",
    status: "failed",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

describe("AnalysisHistoryTable", () => {
  const defaultProps = {
    documents: mockDocuments,
    isLoading: false,
    onViewDetails: vi.fn(),
    onDelete: vi.fn(),
    onDownload: vi.fn(),
    onLoadMore: vi.fn(),
    hasMore: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders table with documents", () => {
    render(<AnalysisHistoryTable {...defaultProps} />);

    expect(screen.getByText("resume.pdf")).toBeVisible();
    expect(screen.getByText("cover-letter.docx")).toBeVisible();
    expect(screen.getByText("job-description.txt")).toBeVisible();
  });

  it("renders table headers", () => {
    render(<AnalysisHistoryTable {...defaultProps} />);

    expect(screen.getByText("File Name")).toBeVisible();
    expect(screen.getByText("Date")).toBeVisible();
    expect(screen.getByText("Status")).toBeVisible();
    expect(screen.getByText("Actions")).toBeVisible();
  });

  it("shows skeleton when loading with no documents", () => {
    render(
      <AnalysisHistoryTable
        {...defaultProps}
        documents={[]}
        isLoading={true}
      />,
    );

    // Skeleton should have animated elements
    const animatedElements = document.querySelectorAll(".animate-pulse");
    expect(animatedElements.length).toBeGreaterThan(0);
  });

  it("shows empty state when no documents", () => {
    render(
      <AnalysisHistoryTable
        {...defaultProps}
        documents={[]}
        isLoading={false}
      />,
    );

    expect(screen.getByText("No analyses yet")).toBeVisible();
    expect(screen.getByText(/upload a document to get started/i)).toBeVisible();
  });

  it("calls onViewDetails when view button is clicked", async () => {
    const user = userEvent.setup();
    const onViewDetails = vi.fn();
    render(
      <AnalysisHistoryTable {...defaultProps} onViewDetails={onViewDetails} />,
    );

    // Find all view buttons and click the first one (completed document)
    const viewButtons = screen.getAllByTitle("View Details");
    await user.click(viewButtons[0]);

    expect(onViewDetails).toHaveBeenCalledWith("1");
  });

  it("calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(<AnalysisHistoryTable {...defaultProps} onDelete={onDelete} />);

    // Delete buttons are hidden until hover, but they're still in the DOM
    const deleteButtons = screen.getAllByTitle("Delete");
    await user.click(deleteButtons[0]);

    expect(onDelete).toHaveBeenCalledWith(mockDocuments[0]);
  });

  it("shows correct status badges", () => {
    render(<AnalysisHistoryTable {...defaultProps} />);

    expect(screen.getByText("Completed")).toBeVisible();
    expect(screen.getByText("Processing")).toBeVisible();
    expect(screen.getByText("Failed")).toBeVisible();
  });

  it("disables view button for non-terminal documents", () => {
    render(<AnalysisHistoryTable {...defaultProps} />);

    // The parsing document should have a disabled view button
    const processingButton = screen.getAllByTitle("Processing...")[0];
    expect(processingButton).toBeDisabled();
  });

  it("shows load more button when hasMore is true", () => {
    render(<AnalysisHistoryTable {...defaultProps} />);

    expect(screen.getByRole("button", { name: /load more/i })).toBeVisible();
  });

  it("hides load more button when hasMore is false", () => {
    render(<AnalysisHistoryTable {...defaultProps} hasMore={false} />);

    expect(
      screen.queryByRole("button", { name: /load more/i }),
    ).not.toBeInTheDocument();
  });

  it("calls onLoadMore when load more is clicked", async () => {
    const user = userEvent.setup();
    const onLoadMore = vi.fn();
    render(<AnalysisHistoryTable {...defaultProps} onLoadMore={onLoadMore} />);

    await user.click(screen.getByRole("button", { name: /load more/i }));

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it("shows document count in footer", () => {
    render(<AnalysisHistoryTable {...defaultProps} />);

    expect(screen.getByText(/showing 3 documents/i)).toBeVisible();
  });

  it("shows singular when only one document", () => {
    render(
      <AnalysisHistoryTable {...defaultProps} documents={[mockDocuments[0]]} />,
    );

    expect(screen.getByText(/showing 1 document$/i)).toBeVisible();
  });
});
