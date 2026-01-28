import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FeatureCard from "../FeatureCard";

describe("FeatureCard", () => {
  const mockProps = {
    icon: "auto_awesome",
    iconColor: "bg-primary/10",
    title: "Test Feature",
    description: "This is a test description for the feature card.",
  };

  it("renders with all required props", () => {
    render(<FeatureCard {...mockProps} />);

    expect(screen.getByText("Test Feature")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test description for the feature card."),
    ).toBeInTheDocument();
    expect(screen.getByText("auto_awesome")).toBeInTheDocument();
  });

  it("applies correct CSS classes to the container", () => {
    const { container } = render(<FeatureCard {...mockProps} />);

    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass(
      "glass-card",
      "p-8",
      "rounded-3xl",
      "border",
      "border-slate-800",
      "hover:border-primary/50",
      "transition-all",
      "group",
    );
  });

  it("applies correct icon container styling", () => {
    const { container } = render(<FeatureCard {...mockProps} />);

    const iconContainer = container.querySelector(".w-14.h-14");
    expect(iconContainer).toHaveClass(
      "w-14",
      "h-14",
      "bg-primary/10",
      "rounded-2xl",
      "flex",
      "items-center",
      "justify-center",
      "mb-6",
      "group-hover:bg-opacity-30",
      "transition-colors",
    );
  });

  it("renders icon with correct styling", () => {
    const { container } = render(<FeatureCard {...mockProps} />);

    const iconElement = container.querySelector(".material-symbols-outlined");
    expect(iconElement).toHaveClass("material-symbols-outlined", "text-3xl");
    expect(iconElement).toHaveTextContent("auto_awesome");
  });

  it("applies correct title styling", () => {
    render(<FeatureCard {...mockProps} />);

    const titleElement = screen.getByText("Test Feature");
    expect(titleElement.tagName).toBe("H3");
    expect(titleElement).toHaveClass(
      "text-xl",
      "font-bold",
      "text-white",
      "mb-3",
    );
  });

  it("applies correct description styling", () => {
    render(<FeatureCard {...mockProps} />);

    const descriptionElement = screen.getByText(
      "This is a test description for the feature card.",
    );
    expect(descriptionElement.tagName).toBe("P");
    expect(descriptionElement).toHaveClass(
      "text-slate-400",
      "text-sm",
      "leading-relaxed",
    );
  });

  it("renders with different icon values", () => {
    const propsWithDifferentIcon = {
      ...mockProps,
      icon: "hub",
    };

    render(<FeatureCard {...propsWithDifferentIcon} />);
    expect(screen.getByText("hub")).toBeInTheDocument();
  });

  it("renders with different icon colors", () => {
    const propsWithDifferentColor = {
      ...mockProps,
      iconColor: "bg-blue-500/10",
    };

    const { container } = render(<FeatureCard {...propsWithDifferentColor} />);

    const iconContainer = container.querySelector(".w-14.h-14");
    expect(iconContainer).toHaveClass("bg-blue-500/10");
  });

  it("renders with different titles", () => {
    const propsWithDifferentTitle = {
      ...mockProps,
      title: "Another Feature Title",
    };

    render(<FeatureCard {...propsWithDifferentTitle} />);
    expect(screen.getByText("Another Feature Title")).toBeInTheDocument();
  });

  it("renders with different descriptions", () => {
    const propsWithDifferentDescription = {
      ...mockProps,
      description: "A different description for testing purposes.",
    };

    render(<FeatureCard {...propsWithDifferentDescription} />);
    expect(
      screen.getByText("A different description for testing purposes."),
    ).toBeInTheDocument();
  });

  it("handles empty description gracefully", () => {
    const propsWithEmptyDescription = {
      ...mockProps,
      description: "",
    };

    const { container } = render(
      <FeatureCard {...propsWithEmptyDescription} />,
    );
    const descriptionElement = container.querySelector("p.text-slate-400");
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveTextContent("");
  });

  it("handles long titles gracefully", () => {
    const longTitle =
      "This is a very long feature title that should still render properly without breaking the layout";
    const propsWithLongTitle = {
      ...mockProps,
      title: longTitle,
    };

    render(<FeatureCard {...propsWithLongTitle} />);
    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it("handles long descriptions gracefully", () => {
    const longDescription =
      "This is a very long description that contains multiple words and should still render properly within the feature card component without causing any layout issues or overflow problems.";
    const propsWithLongDescription = {
      ...mockProps,
      description: longDescription,
    };

    render(<FeatureCard {...propsWithLongDescription} />);
    expect(screen.getByText(longDescription)).toBeInTheDocument();
  });

  it("renders with special characters in title and description", () => {
    const propsWithSpecialChars = {
      ...mockProps,
      title: "Feature & Special Characters!",
      description: "Description with @, #, $, %, and other special chars.",
    };

    render(<FeatureCard {...propsWithSpecialChars} />);
    expect(
      screen.getByText("Feature & Special Characters!"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Description with @, #, $, %, and other special chars."),
    ).toBeInTheDocument();
  });
});
