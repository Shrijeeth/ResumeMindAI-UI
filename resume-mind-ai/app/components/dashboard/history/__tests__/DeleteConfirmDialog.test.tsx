import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteConfirmDialog from "../DeleteConfirmDialog";

describe("DeleteConfirmDialog", () => {
  const defaultProps = {
    isOpen: true,
    documentName: "test-document.pdf",
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
    isDeleting: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up body overflow style
    document.body.style.overflow = "";
  });

  it("renders when isOpen is true", () => {
    render(<DeleteConfirmDialog {...defaultProps} />);

    expect(screen.getByText("Delete Document")).toBeVisible();
    expect(screen.getByText(/test-document\.pdf/)).toBeVisible();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /delete/i })).toBeVisible();
  });

  it("does not render when isOpen is false", () => {
    render(<DeleteConfirmDialog {...defaultProps} isOpen={false} />);

    expect(screen.queryByText("Delete Document")).not.toBeInTheDocument();
  });

  it("displays the document name", () => {
    render(
      <DeleteConfirmDialog {...defaultProps} documentName="my-resume.pdf" />,
    );

    expect(screen.getByText("my-resume.pdf")).toBeVisible();
  });

  it("calls onConfirm when delete button is clicked", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<DeleteConfirmDialog {...defaultProps} onConfirm={onConfirm} />);

    await user.click(screen.getByRole("button", { name: /delete/i }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(<DeleteConfirmDialog {...defaultProps} onCancel={onCancel} />);

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when backdrop is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(<DeleteConfirmDialog {...defaultProps} onCancel={onCancel} />);

    // Find backdrop by its aria-hidden attribute
    const backdrop = document.querySelector('[aria-hidden="true"]');
    if (backdrop) {
      await user.click(backdrop);
    }

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("shows loading state when isDeleting is true", () => {
    render(<DeleteConfirmDialog {...defaultProps} isDeleting={true} />);

    expect(screen.getByText("Deleting...")).toBeVisible();
    expect(screen.getByRole("button", { name: /deleting/i })).toBeDisabled();
  });

  it("disables buttons when isDeleting is true", () => {
    render(<DeleteConfirmDialog {...defaultProps} isDeleting={true} />);

    expect(screen.getByRole("button", { name: /cancel/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /deleting/i })).toBeDisabled();
  });

  it("does not call onCancel on backdrop click when isDeleting", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(
      <DeleteConfirmDialog
        {...defaultProps}
        onCancel={onCancel}
        isDeleting={true}
      />,
    );

    const backdrop = document.querySelector('[aria-hidden="true"]');
    if (backdrop) {
      await user.click(backdrop);
    }

    expect(onCancel).not.toHaveBeenCalled();
  });

  it("calls onCancel when Escape is pressed", async () => {
    const onCancel = vi.fn();
    render(<DeleteConfirmDialog {...defaultProps} onCancel={onCancel} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("does not call onCancel on Escape when isDeleting", async () => {
    const onCancel = vi.fn();
    render(
      <DeleteConfirmDialog {...defaultProps} onCancel={onCancel} isDeleting />,
    );

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onCancel).not.toHaveBeenCalled();
  });

  it("locks and restores body scroll when opened and closed", () => {
    const { rerender } = render(<DeleteConfirmDialog {...defaultProps} />);

    expect(document.body.style.overflow).toBe("hidden");

    rerender(<DeleteConfirmDialog {...defaultProps} isOpen={false} />);

    expect(document.body.style.overflow).toBe("");
  });

  it("has proper accessibility attributes", () => {
    render(<DeleteConfirmDialog {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "delete-dialog-title");
  });
});
