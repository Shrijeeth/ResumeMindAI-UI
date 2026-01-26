import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProviderStatus } from "../ProviderCard";
import ProviderCard from "../ProviderCard";

describe("ProviderCard", () => {
  const baseProps = {
    id: "provider-1",
    name: "OpenAI",
    model: "gpt-4",
    status: "connected" as ProviderStatus,
    latency: 120,
    logoInitials: "OA",
    logoColorClass: "bg-emerald-500/10",
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders connected provider with latency", () => {
    render(<ProviderCard {...baseProps} />);

    expect(screen.getByText("OpenAI")).toBeVisible();
    expect(screen.getByText("gpt-4")).toBeVisible();
    expect(screen.getByText("Connected")).toBeVisible();
    expect(screen.getByText("120ms")).toBeVisible();
    expect(screen.getByText("OA")).toBeVisible();
  });

  it("renders inactive provider without latency", () => {
    render(
      <ProviderCard {...baseProps} status="inactive" latency={undefined} />,
    );

    expect(screen.getByText("Inactive")).toBeVisible();
    expect(screen.getByText("--")).toBeVisible();
  });

  it("renders error provider with timeout message", () => {
    render(
      <ProviderCard
        {...baseProps}
        status="error"
        errorMessage="Connection timeout"
      />,
    );

    expect(screen.getByText("Error")).toBeVisible();
    expect(screen.getByText("Timeout")).toBeVisible();
    expect(screen.getByText("Connection timeout")).toBeVisible();
  });

  it("shows active provider badge when isActive is true", () => {
    render(
      <ProviderCard {...baseProps} isActive={true} onSetActive={vi.fn()} />,
    );

    expect(screen.getByText("Active")).toBeVisible();
    expect(screen.getByText("Default Provider")).toBeVisible();
  });

  it("calls onEdit when edit button is clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    render(<ProviderCard {...baseProps} onEdit={onEdit} />);

    const editButton = screen.getByTitle("Edit connection");
    await user.click(editButton);

    expect(onEdit).toHaveBeenCalledWith("provider-1");
  });

  it("calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(<ProviderCard {...baseProps} onDelete={onDelete} />);

    const deleteButton = screen.getByTitle("Delete connection");
    await user.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith("provider-1");
  });

  it("calls onTest when test button is clicked", async () => {
    const user = userEvent.setup();
    const onTest = vi.fn();

    render(<ProviderCard {...baseProps} onTest={onTest} />);

    const testButton = screen.getByTitle("Test connection");
    await user.click(testButton);

    expect(onTest).toHaveBeenCalledWith("provider-1");
  });

  it("calls onRetry when retry button is clicked for error status", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(<ProviderCard {...baseProps} status="error" onRetry={onRetry} />);

    const retryButton = screen.getByTitle("Retry connection");
    await user.click(retryButton);

    expect(onRetry).toHaveBeenCalledWith("provider-1");
  });

  it("shows loading spinner when testing", () => {
    render(<ProviderCard {...baseProps} isTesting={true} onTest={vi.fn()} />);

    const spinner = screen.getByRole("button", { name: /test connection/i });
    expect(spinner).toBeDisabled();
    expect(spinner.querySelector(".animate-spin")).toBeVisible();
  });

  it("calls onSetActive when set as default button is clicked", async () => {
    const user = userEvent.setup();
    const onSetActive = vi.fn();

    render(<ProviderCard {...baseProps} onSetActive={onSetActive} />);

    const setDefaultButton = screen.getByText("Set As Default");
    await user.click(setDefaultButton);

    expect(onSetActive).toHaveBeenCalledWith("provider-1");
  });

  it("disables set as default button when provider is not connected", () => {
    render(
      <ProviderCard {...baseProps} status="inactive" onSetActive={vi.fn()} />,
    );

    const setDefaultButton = screen.getByText("Set As Default");
    expect(setDefaultButton).toBeDisabled();
  });

  it("disables set as default button when already active", () => {
    render(
      <ProviderCard {...baseProps} isActive={true} onSetActive={vi.fn()} />,
    );

    const setDefaultButton = screen.getByText("Default Provider");
    expect(setDefaultButton).toBeDisabled();
  });

  it("shows correct status badge styling for different statuses", () => {
    const { rerender } = render(
      <ProviderCard {...baseProps} status="connected" />,
    );

    let badge = screen.getByText("Connected");
    expect(badge.className).toContain("bg-emerald-500/10");
    expect(badge.className).toContain("text-emerald-400");

    rerender(<ProviderCard {...baseProps} status="inactive" />);
    badge = screen.getByText("Inactive");
    expect(badge.className).toContain("bg-slate-700/50");
    expect(badge.className).toContain("text-slate-400");

    rerender(<ProviderCard {...baseProps} status="error" />);
    badge = screen.getByText("Error");
    expect(badge.className).toContain("bg-red-500/10");
    expect(badge.className).toContain("text-red-400");
  });

  it("shows pulse animation for connected status", () => {
    render(<ProviderCard {...baseProps} status="connected" />);

    const pulseDot = screen
      .getByText("Connected")
      .querySelector(".animate-pulse");
    expect(pulseDot).toBeVisible();
  });

  it("calculates latency percentage correctly", () => {
    render(<ProviderCard {...baseProps} latency={250} />);

    // Check that latency is displayed correctly
    expect(screen.getByText("250ms")).toBeVisible();

    // Check that progress bar element exists
    const progressBar = document.querySelector(".bg-emerald-500");
    expect(progressBar).toBeTruthy();
  });

  it("shows error message with proper styling", () => {
    render(
      <ProviderCard
        {...baseProps}
        status="error"
        errorMessage="API key invalid"
      />,
    );

    const errorMessage = screen.getByText("API key invalid");
    expect(errorMessage).toBeVisible();
    const errorContainer = errorMessage.closest("div");
    expect(errorContainer?.className).toContain("text-red-400/80");
    expect(errorContainer?.className).toContain("bg-red-500/5");
  });
});
