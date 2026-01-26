import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UploadButton from "../UploadButton";

describe("UploadButton", () => {
  const defaultProps = {
    onUpload: vi.fn(),
    isUploading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the upload button", () => {
    render(<UploadButton {...defaultProps} />);

    expect(screen.getByRole("button", { name: /new analysis/i })).toBeVisible();
  });

  it("calls onUpload when a valid file is selected", async () => {
    const user = userEvent.setup();
    const onUpload = vi.fn();
    render(<UploadButton {...defaultProps} onUpload={onUpload} />);

    const file = new File(["test content"], "test.pdf", {
      type: "application/pdf",
    });
    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    await user.upload(input, file);

    expect(onUpload).toHaveBeenCalledTimes(1);
    expect(onUpload).toHaveBeenCalledWith(file);
  });

  it("shows uploading state when isUploading is true", () => {
    render(<UploadButton {...defaultProps} isUploading={true} />);

    expect(screen.getByText("Uploading...")).toBeVisible();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("disables button when uploading", () => {
    render(<UploadButton {...defaultProps} isUploading={true} />);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("accepts correct file types", () => {
    render(<UploadButton {...defaultProps} />);

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(input.accept).toContain(".pdf");
    expect(input.accept).toContain(".docx");
    expect(input.accept).toContain(".txt");
    expect(input.accept).toContain(".md");
  });

  it("shows error for invalid file extension", async () => {
    const onUpload = vi.fn();
    render(<UploadButton {...defaultProps} onUpload={onUpload} />);

    const file = new File(["test content"], "test.exe", {
      type: "application/octet-stream",
    });
    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    // Use fireEvent to trigger change with invalid file (userEvent.upload may skip non-accepted files)
    Object.defineProperty(input, "files", {
      value: [file],
      writable: false,
    });
    fireEvent.change(input);

    await waitFor(() => {
      expect(screen.getByText(/invalid file type/i)).toBeVisible();
    });
    expect(onUpload).not.toHaveBeenCalled();
  });

  it("shows error for file that is too large", async () => {
    const user = userEvent.setup();
    const onUpload = vi.fn();
    render(<UploadButton {...defaultProps} onUpload={onUpload} />);

    // Create a mock file larger than 10MB
    const largeContent = new Array(11 * 1024 * 1024).fill("a").join("");
    const file = new File([largeContent], "test.pdf", {
      type: "application/pdf",
    });
    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    await user.upload(input, file);

    await waitFor(() => {
      expect(screen.getByText(/file too large/i)).toBeVisible();
    });
    expect(onUpload).not.toHaveBeenCalled();
  });

  it("clears error when clicking the button again", async () => {
    const user = userEvent.setup();
    render(<UploadButton {...defaultProps} />);

    // First, trigger an error using fireEvent
    const file = new File(["test content"], "test.exe", {
      type: "application/octet-stream",
    });
    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    Object.defineProperty(input, "files", {
      value: [file],
      writable: false,
    });
    fireEvent.change(input);

    await waitFor(() => {
      expect(screen.getByText(/invalid file type/i)).toBeVisible();
    });

    // Click button again
    await user.click(screen.getByRole("button"));

    // Error should be cleared (input clicked opens file picker, which we can't simulate, but error state should be reset)
    await waitFor(() => {
      expect(screen.queryByText(/invalid file type/i)).not.toBeInTheDocument();
    });
  });

  it("has accessible file input", () => {
    render(<UploadButton {...defaultProps} />);

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(input).toHaveAttribute("aria-label", "Upload document");
  });
});
