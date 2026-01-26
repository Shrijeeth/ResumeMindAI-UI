import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DocumentFilters from "../DocumentFilters";

describe("DocumentFilters", () => {
  it("renders all filter options", () => {
    const onStatusChange = vi.fn();
    render(
      <DocumentFilters
        currentStatus={undefined}
        onStatusChange={onStatusChange}
      />,
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeVisible();

    // Check all options are present
    expect(
      screen.getByRole("option", { name: "All Status" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Pending" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Uploading" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Validating" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Processing" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Completed" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Invalid" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Failed" })).toBeInTheDocument();
  });

  it("shows correct selected value", () => {
    const onStatusChange = vi.fn();
    render(
      <DocumentFilters
        currentStatus="completed"
        onStatusChange={onStatusChange}
      />,
    );

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("completed");
  });

  it("calls onStatusChange with status when selecting a filter", async () => {
    const user = userEvent.setup();
    const onStatusChange = vi.fn();
    render(
      <DocumentFilters
        currentStatus={undefined}
        onStatusChange={onStatusChange}
      />,
    );

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "completed");

    expect(onStatusChange).toHaveBeenCalledTimes(1);
    expect(onStatusChange).toHaveBeenCalledWith("completed");
  });

  it("calls onStatusChange with undefined when selecting All Status", async () => {
    const user = userEvent.setup();
    const onStatusChange = vi.fn();
    render(
      <DocumentFilters
        currentStatus="completed"
        onStatusChange={onStatusChange}
      />,
    );

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "");

    expect(onStatusChange).toHaveBeenCalledTimes(1);
    expect(onStatusChange).toHaveBeenCalledWith(undefined);
  });

  it("has accessible label", () => {
    const onStatusChange = vi.fn();
    render(
      <DocumentFilters
        currentStatus={undefined}
        onStatusChange={onStatusChange}
      />,
    );

    expect(screen.getByLabelText("Filter by status")).toBeInTheDocument();
  });
});
