import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DocumentRow from "../DocumentRow";
import type {
  DocumentListItem,
  FileType,
  DocumentType,
} from "@/app/lib/types/document";

type Props = Parameters<typeof DocumentRow>[0];

const baseDoc: DocumentListItem = {
  id: "1",
  original_filename: "resume.pdf",
  file_type: "pdf",
  document_type: "resume",
  status: "completed",
  created_at: new Date("2023-01-01T00:00:00Z").toISOString(),
};

function setup(overrides: Partial<Props> = {}) {
  const onViewDetails = vi.fn();
  const onDelete = vi.fn();
  const onDownload = vi.fn();
  const props: Props = {
    document: baseDoc,
    onViewDetails,
    onDelete,
    onDownload,
    ...overrides,
  } as Props;

  const utils = render(
    <table>
      <tbody>
        <DocumentRow {...props} />
      </tbody>
    </table>,
  );

  return { ...utils, onViewDetails, onDelete, onDownload };
}

describe("DocumentRow", () => {
  it("formats old dates with year", () => {
    setup();

    // Older than a week and different year should include the year in text
    expect(screen.getByText(/Jan/i).textContent).toMatch(/2023/);
  });

  it("formats same-year older than a week without year", () => {
    const earlierThisYear = new Date();
    earlierThisYear.setMonth(0, 5); // Jan 5 this year
    const doc: DocumentListItem = {
      ...baseDoc,
      created_at: earlierThisYear.toISOString(),
    };

    setup({ document: doc });

    const dateText = screen.getByText(/Jan/i).textContent;
    expect(dateText).not.toMatch(/\d{4}/);
  });

  it("shows minutes ago when within the hour", () => {
    const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    const doc: DocumentListItem = {
      ...baseDoc,
      created_at: thirtyMinsAgo,
    };

    setup({ document: doc });

    expect(screen.getByText(/30m ago/)).toBeVisible();
  });

  it("shows just now for recent uploads", () => {
    const justNow = new Date().toISOString();
    const doc: DocumentListItem = {
      ...baseDoc,
      created_at: justNow,
    };

    setup({ document: doc });

    expect(screen.getByText("Just now")).toBeVisible();
  });

  it("falls back to -- when document type is missing", () => {
    const doc: DocumentListItem = {
      ...baseDoc,
      document_type: null,
    };

    setup({ document: doc });

    expect(screen.getByText("--")).toBeVisible();
  });

  it("shows unmapped document type label and enables view for terminal", () => {
    const doc: DocumentListItem = {
      ...baseDoc,
      document_type: "unknown",
      status: "failed",
    };

    setup({ document: doc });

    expect(screen.getByText("Unknown")).toBeVisible();
    expect(screen.getByTitle("View Details")).not.toBeDisabled();
  });

  it("shows raw document type when not mapped", () => {
    const doc: DocumentListItem = {
      ...baseDoc,
      document_type: "custom_type" as DocumentType,
    };

    setup({ document: doc });

    expect(screen.getByText("custom_type")).toBeVisible();
  });

  it("falls back to default file type styling when unknown", () => {
    const doc: DocumentListItem = {
      ...baseDoc,
      file_type: "pptx" as FileType,
    };

    setup({ document: doc });

    const icon = screen.getByText("insert_drive_file");
    expect(icon).toBeVisible();
  });

  it("disables view button when status is not terminal", async () => {
    const user = userEvent.setup();
    const doc: DocumentListItem = {
      ...baseDoc,
      status: "parsing",
    };

    const { onViewDetails } = setup({ document: doc });

    const viewBtn = screen.getByTitle("Processing...");
    expect(viewBtn).toBeDisabled();

    await user.click(viewBtn);
    expect(onViewDetails).not.toHaveBeenCalled();
  });

  it("disables download button when not completed", async () => {
    const user = userEvent.setup();
    const doc: DocumentListItem = {
      ...baseDoc,
      status: "pending",
    };

    const { onDownload } = setup({ document: doc });

    const downloadBtn = screen.getByTitle("Not available");
    expect(downloadBtn).toBeDisabled();

    await user.click(downloadBtn);
    expect(onDownload).not.toHaveBeenCalled();
  });

  it("calls handlers when actions enabled", async () => {
    const user = userEvent.setup();
    const { onViewDetails, onDelete, onDownload } = setup();

    await user.click(screen.getByTitle("View Details"));
    await user.click(screen.getByTitle("Download"));
    await user.click(screen.getByTitle("Delete"));

    expect(onViewDetails).toHaveBeenCalledWith(baseDoc.id);
    expect(onDownload).toHaveBeenCalledWith(baseDoc);
    expect(onDelete).toHaveBeenCalledWith(baseDoc);
  });

  it("hides download button when handler not provided", () => {
    setup({ onDownload: undefined });

    expect(screen.queryByTitle("Download")).not.toBeInTheDocument();
  });
});
