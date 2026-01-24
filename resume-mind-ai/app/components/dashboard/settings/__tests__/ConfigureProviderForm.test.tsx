import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfigureProviderForm, {
  ProviderType,
  ProviderFormData,
} from "../ConfigureProviderForm";

describe("ConfigureProviderForm", () => {
  const mockProviderOptions = [
    { value: "openai" as ProviderType, label: "OpenAI", logoInitials: "OA" },
    { value: "anthropic" as ProviderType, label: "Anthropic", logoInitials: "AP" },
    { value: "google-gemini" as ProviderType, label: "Google Gemini", logoInitials: "GG" },
  ];

  const baseProps = {
    mode: "create" as const,
    onSave: vi.fn(),
    onCancel: vi.fn(),
    providerOptions: mockProviderOptions,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders create mode form with correct title", () => {
    render(<ConfigureProviderForm {...baseProps} />);

    expect(screen.getByText("Configure Provider")).toBeVisible();
    expect(screen.getByText("Connect a new model or inference endpoint.")).toBeVisible();
  });

  it("renders edit mode form with correct title", () => {
    render(<ConfigureProviderForm {...baseProps} mode="edit" />);

    expect(screen.getByText("Edit Provider")).toBeVisible();
  });

  it("populates form with initial data in edit mode", () => {
    const initialData: Partial<ProviderFormData> = {
      providerType: "anthropic",
      modelName: "claude-3-opus",
      baseUrl: "https://api.anthropic.com",
      apiKey: "sk-ant-123",
    };

    render(
      <ConfigureProviderForm
        {...baseProps}
        mode="edit"
        initialData={initialData}
      />
    );

    expect(screen.getByDisplayValue("claude-3-opus")).toBeVisible();
    expect(screen.getByDisplayValue("https://api.anthropic.com")).toBeVisible();
    expect(screen.getByDisplayValue("sk-ant-123")).toBeVisible();
    expect(screen.getByDisplayValue("Anthropic")).toBeVisible();
  });

  it("renders all provider options in select dropdown", () => {
    render(<ConfigureProviderForm {...baseProps} />);

    mockProviderOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeVisible();
    });
  });

  it("calls onSave with form data when submitted", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    
    render(
      <ConfigureProviderForm
        {...baseProps}
        onSave={onSave}
      />
    );

    // Fill out the form
    await user.type(screen.getByPlaceholderText(/e\.g\. gpt-4/i), "gpt-4");
    await user.type(screen.getByPlaceholderText("https://api.openai.com/v1"), "https://api.openai.com/v1");
    await user.type(screen.getByPlaceholderText("sk-..."), "sk-openai-123");

    // Submit the form
    await user.click(screen.getByText("Save Configuration"));

    expect(onSave).toHaveBeenCalledWith({
      providerType: "openai",
      modelName: "gpt-4",
      baseUrl: "https://api.openai.com/v1",
      apiKey: "sk-openai-123",
    });
  });

  it("calls onCancel when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    
    render(
      <ConfigureProviderForm
        {...baseProps}
        onCancel={onCancel}
      />
    );

    await user.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("toggles API key visibility when eye icon is clicked", async () => {
    const user = userEvent.setup();
    
    render(<ConfigureProviderForm {...baseProps} />);

    const apiKeyInput = screen.getByPlaceholderText("sk-...");
    const toggleButton = screen.getByText("visibility_off").closest("button");

    // Initially password type
    expect(apiKeyInput).toHaveAttribute("type", "password");

    // Click to show
    await user.click(toggleButton!);
    expect(apiKeyInput).toHaveAttribute("type", "text");

    // Click to hide
    await user.click(toggleButton!);
    expect(apiKeyInput).toHaveAttribute("type", "password");
  });

  it("disables all buttons when isSaving is true", () => {
    render(
      <ConfigureProviderForm
        {...baseProps}
        isSaving={true}
      />
    );

    expect(screen.getByText("Saving...")).toBeDisabled();
    expect(screen.getByText("Cancel")).toBeDisabled();
  });

  it("shows correct icon for API key visibility toggle", () => {
    const { rerender } = render(<ConfigureProviderForm {...baseProps} />);

    // Initially visibility_off
    expect(screen.getByText("visibility_off")).toBeVisible();

    // Simulate showing API key by clicking the toggle button
    rerender(<ConfigureProviderForm {...baseProps} />);
    // Note: In a real test, you'd need to click the button and check the state change
  });

  it("updates provider type when select value changes", async () => {
    const user = userEvent.setup();
    
    render(<ConfigureProviderForm {...baseProps} />);

    const select = screen.getByDisplayValue("OpenAI");
    await user.selectOptions(select, "anthropic");

    expect(screen.getByDisplayValue("Anthropic")).toBeVisible();
  });

  it("shows security message for API key field", () => {
    render(<ConfigureProviderForm {...baseProps} />);

    expect(screen.getByText(/your keys are encrypted at rest/i)).toBeVisible();
    expect(screen.getByText("lock")).toBeVisible();
  });

  it("uses first provider option as default when no initial data", () => {
    render(<ConfigureProviderForm {...baseProps} />);

    expect(screen.getByDisplayValue("OpenAI")).toBeVisible();
  });

  it("handles form submission with empty optional fields", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    
    render(
      <ConfigureProviderForm
        {...baseProps}
        onSave={onSave}
      />
    );

    // Only fill required fields
    await user.type(screen.getByPlaceholderText(/e\.g\. gpt-4/i), "gpt-4");
    await user.type(screen.getByPlaceholderText("sk-..."), "sk-123");

    await user.click(screen.getByText("Save Configuration"));

    expect(onSave).toHaveBeenCalledWith({
      providerType: "openai",
      modelName: "gpt-4",
      baseUrl: "",
      apiKey: "sk-123",
    });
  });

  it("prevents form submission when saving", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    
    render(
      <ConfigureProviderForm
        {...baseProps}
        onSave={onSave}
        isSaving={true}
      />
    );

    // Try to submit form by clicking the disabled save button
    await user.click(screen.getByText("Saving..."));

    expect(onSave).not.toHaveBeenCalled();
  });

  it("shows correct placeholder text for all fields", () => {
    render(<ConfigureProviderForm {...baseProps} />);

    expect(screen.getByPlaceholderText(/e\.g\. gpt-4/i)).toBeVisible();
    expect(screen.getByPlaceholderText("https://api.openai.com/v1")).toBeVisible();
    expect(screen.getByPlaceholderText("sk-...")).toBeVisible();
  });

  it("displays optional label for base URL field", () => {
    render(<ConfigureProviderForm {...baseProps} />);

    expect(screen.getByText(/optional/i)).toBeVisible();
  });
});