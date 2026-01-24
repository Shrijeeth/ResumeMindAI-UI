import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UploadCard from "../UploadCard";

describe("UploadCard", () => {
  it("renders default upload prompt", () => {
    render(<UploadCard />);

    expect(screen.getByText(/analyze a new resume/i)).toBeVisible();
    expect(screen.getByText(/drop your pdf, docx or txt here/i)).toBeVisible();
    expect(screen.getByText(/or click to browse files/i)).toBeVisible();
  });

  it("triggers hidden input click when dropzone is clicked", async () => {
    const user = userEvent.setup();
    render(<UploadCard />);

    const fileInputClickSpy = vi.spyOn(HTMLInputElement.prototype, "click");
    const dropzone = screen.getByText(/drop your pdf, docx or txt here/i)
      .parentElement as HTMLElement;

    await user.click(dropzone);

    expect(fileInputClickSpy).toHaveBeenCalled();
  });

  it("calls onFileSelect when a file is chosen via input change", () => {
    const onFileSelect = vi.fn();
    render(<UploadCard onFileSelect={onFileSelect} />);

    const dropzone = screen.getByText(/drop your pdf, docx or txt here/i)
      .parentElement as HTMLElement;
    const input = dropzone.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = new File(["resume content"], "resume.pdf", {
      type: "application/pdf",
    });

    fireEvent.change(input, { target: { files: [file] } });

    expect(onFileSelect).toHaveBeenCalledTimes(1);
    expect(onFileSelect).toHaveBeenCalledWith(file);
  });

  it("calls onFileSelect when a file is dropped", () => {
    const onFileSelect = vi.fn();
    render(<UploadCard onFileSelect={onFileSelect} />);

    const dropzone = screen.getByText(/drop your pdf, docx or txt here/i)
      .parentElement as HTMLElement;
    const file = new File(["resume content"], "resume.pdf", {
      type: "application/pdf",
    });

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
        items: [],
        types: ["Files"],
      },
    });

    expect(onFileSelect).toHaveBeenCalledTimes(1);
    expect(onFileSelect).toHaveBeenCalledWith(file);
  });

  it("toggles drag-over styles on drag enter and leave", () => {
    render(<UploadCard />);

    const dropzone = screen.getByText(/drop your pdf, docx or txt here/i)
      .parentElement as HTMLElement;

    expect(dropzone.className).toContain("bg-white/5");

    fireEvent.dragOver(dropzone, { preventDefault: () => {} });
    expect(dropzone.className).toContain("bg-white/20");

    fireEvent.dragLeave(dropzone, { preventDefault: () => {} });
    expect(dropzone.className).toContain("bg-white/5");
  });

  it("shows uploading state and disables interactions when isUploading is true", () => {
    render(<UploadCard isUploading />);

    const dropzone = screen.getByText(/uploading.../i)
      .parentElement as HTMLElement;

    expect(screen.getByText(/uploading.../i)).toBeVisible();
    expect(dropzone.className).toContain("pointer-events-none");
  });
});
