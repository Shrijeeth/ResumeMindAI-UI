import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoadMoreButton from "../LoadMoreButton";

describe("LoadMoreButton", () => {
  const defaultProps = {
    onClick: vi.fn(),
    isLoading: false,
    hasMore: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders when hasMore is true", () => {
    render(<LoadMoreButton {...defaultProps} />);

    expect(screen.getByRole("button", { name: /load more/i })).toBeVisible();
  });

  it("does not render when hasMore is false", () => {
    render(<LoadMoreButton {...defaultProps} hasMore={false} />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<LoadMoreButton {...defaultProps} onClick={onClick} />);

    await user.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading state when isLoading is true", () => {
    render(<LoadMoreButton {...defaultProps} isLoading={true} />);

    expect(screen.getByText("Loading...")).toBeVisible();
  });

  it("disables button when loading", () => {
    render(<LoadMoreButton {...defaultProps} isLoading={true} />);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <LoadMoreButton {...defaultProps} onClick={onClick} isLoading={true} />,
    );

    await user.click(screen.getByRole("button"));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("shows expand icon when not loading", () => {
    render(<LoadMoreButton {...defaultProps} />);

    expect(screen.getByText("expand_more")).toBeVisible();
  });
});
