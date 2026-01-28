import { describe, it, expect } from "vitest";
import { transformGraphResponse } from "../graphTransformer";
import type { ApiGraphResponse } from "../../types/graph";
import { NODE_COLORS, LINK_COLOR } from "../../types/graph";

describe("transformGraphResponse", () => {
  describe("node type mapping", () => {
    const nodeTypes: Array<{ apiType: string; expectedType: string }> = [
      { apiType: "Document", expectedType: "person" },
      { apiType: "Skill", expectedType: "skill" },
      { apiType: "Company", expectedType: "company" },
      { apiType: "Position", expectedType: "experience" },
      { apiType: "Education", expectedType: "education" },
      { apiType: "Project", expectedType: "project" },
      { apiType: "Certification", expectedType: "certification" },
      { apiType: "Language", expectedType: "language" },
      { apiType: "Interest", expectedType: "interest" },
    ];

    it.each(nodeTypes)(
      "maps API type $apiType to frontend type $expectedType",
      ({ apiType, expectedType }) => {
        const apiResponse: ApiGraphResponse = {
          nodes: [
            {
              id: 1,
              labels: [apiType],
              color: "#000000",
              visible: true,
              data: { name: "Test", type: apiType },
            },
          ],
          links: [],
        };

        const result = transformGraphResponse(apiResponse);
        expect(result.nodes[0].data.type).toBe(expectedType);
      },
    );

    it("falls back to technology for unknown node types", () => {
      const apiResponse: ApiGraphResponse = {
        nodes: [
          {
            id: 1,
            labels: ["Unknown"],
            color: "#000000",
            visible: true,
            data: { name: "Test", type: "UnknownType" },
          },
        ],
        links: [],
      };

      const result = transformGraphResponse(apiResponse);
      expect(result.nodes[0].data.type).toBe("technology");
    });
  });

  describe("node color override", () => {
    it("uses NODE_COLORS instead of API colors", () => {
      const apiResponse: ApiGraphResponse = {
        nodes: [
          {
            id: 1,
            labels: ["Skill"],
            color: "#ff0000",
            visible: true,
            data: { name: "Python", type: "Skill" },
          },
        ],
        links: [],
      };

      const result = transformGraphResponse(apiResponse);
      expect(result.nodes[0].color).toBe(NODE_COLORS.skill);
      expect(result.nodes[0].color).not.toBe("#ff0000");
    });

    it("falls back to API color for unmapped node types", () => {
      const apiResponse: ApiGraphResponse = {
        nodes: [
          {
            id: 1,
            labels: ["Exotic"],
            color: "#abcdef",
            visible: true,
            data: { name: "Test", type: "ExoticType" },
          },
        ],
        links: [],
      };

      const result = transformGraphResponse(apiResponse);
      // Falls back to technology color since "ExoticType" maps to "technology"
      expect(result.nodes[0].color).toBe(NODE_COLORS.technology);
    });
  });

  describe("skill level mapping", () => {
    const levels = [
      { apiLevel: "Beginner", expected: "beginner" },
      { apiLevel: "Intermediate", expected: "intermediate" },
      { apiLevel: "Advanced", expected: "advanced" },
      { apiLevel: "Expert", expected: "expert" },
      { apiLevel: "beginner", expected: "beginner" },
      { apiLevel: "advanced", expected: "advanced" },
    ];

    it.each(levels)("maps $apiLevel to $expected", ({ apiLevel, expected }) => {
      const apiResponse: ApiGraphResponse = {
        nodes: [
          {
            id: 1,
            labels: ["Skill"],
            color: "#000",
            visible: true,
            data: { name: "Test", type: "Skill", level: apiLevel },
          },
        ],
        links: [],
      };

      const result = transformGraphResponse(apiResponse);
      expect(result.nodes[0].data.level).toBe(expected);
    });

    it("returns undefined for unknown skill levels", () => {
      const apiResponse: ApiGraphResponse = {
        nodes: [
          {
            id: 1,
            labels: ["Skill"],
            color: "#000",
            visible: true,
            data: { name: "Test", type: "Skill", level: "SuperPro" },
          },
        ],
        links: [],
      };

      const result = transformGraphResponse(apiResponse);
      expect(result.nodes[0].data.level).toBeUndefined();
    });
  });

  describe("relevance_score conversion", () => {
    it("converts 0-1 float to 0-100 integer", () => {
      const apiResponse: ApiGraphResponse = {
        nodes: [
          {
            id: 1,
            labels: ["Skill"],
            color: "#000",
            visible: true,
            data: {
              name: "Test",
              type: "Skill",
              relevance_score: 0.9,
            },
          },
        ],
        links: [],
      };

      const result = transformGraphResponse(apiResponse);
      expect(result.nodes[0].data.relevanceScore).toBe(90);
    });

    it("handles values already as percentage (> 1)", () => {
      const apiResponse: ApiGraphResponse = {
        nodes: [
          {
            id: 1,
            labels: ["Skill"],
            color: "#000",
            visible: true,
            data: {
              name: "Test",
              type: "Skill",
              relevance_score: 95,
            },
          },
        ],
        links: [],
      };

      const result = transformGraphResponse(apiResponse);
      expect(result.nodes[0].data.relevanceScore).toBe(95);
    });

    it("returns undefined when relevance_score is not provided", () => {
      const apiResponse: ApiGraphResponse = {
        nodes: [
          {
            id: 1,
            labels: ["Skill"],
            color: "#000",
            visible: true,
            data: { name: "Test", type: "Skill" },
          },
        ],
        links: [],
      };

      const result = transformGraphResponse(apiResponse);
      expect(result.nodes[0].data.relevanceScore).toBeUndefined();
    });
  });

  describe("field renaming (snake_case to camelCase)", () => {
    it("maps relevance_score to relevanceScore on nodes", () => {
      const apiResponse: ApiGraphResponse = {
        nodes: [
          {
            id: 1,
            labels: ["Skill"],
            color: "#000",
            visible: true,
            data: {
              name: "Test",
              type: "Skill",
              relevance_score: 0.85,
            },
          },
        ],
        links: [],
      };

      const result = transformGraphResponse(apiResponse);
      expect(result.nodes[0].data.relevanceScore).toBe(85);
    });

    it("maps start_date and end_date to startDate and endDate on links", () => {
      const apiResponse: ApiGraphResponse = {
        nodes: [
          {
            id: 1,
            labels: ["Person"],
            color: "#000",
            visible: true,
            data: { name: "A", type: "Document" },
          },
          {
            id: 2,
            labels: ["Position"],
            color: "#000",
            visible: true,
            data: { name: "B", type: "Position" },
          },
        ],
        links: [
          {
            id: 1,
            relationship: "WORKED_AT",
            color: "#000",
            source: 1,
            target: 2,
            visible: true,
            data: { start_date: "2020", end_date: "2023" },
          },
        ],
      };

      const result = transformGraphResponse(apiResponse);
      expect(result.links[0].data.startDate).toBe("2020");
      expect(result.links[0].data.endDate).toBe("2023");
    });
  });

  describe("relationship type mapping", () => {
    const relationships: Array<{
      apiRel: string;
      expectedRel: string;
    }> = [
      { apiRel: "HAS_SKILL", expectedRel: "HAS_SKILL" },
      { apiRel: "WORKED_AT", expectedRel: "WORKED_AT" },
      { apiRel: "EDUCATED_AT", expectedRel: "STUDIED_AT" },
      { apiRel: "PROJECT_MEMBER", expectedRel: "COMPLETED_PROJECT" },
      { apiRel: "CERTIFIED_IN", expectedRel: "CERTIFIED_BY" },
      { apiRel: "SPEAKS", expectedRel: "SPEAKS" },
      { apiRel: "INTERESTED_IN", expectedRel: "INTERESTED_IN" },
    ];

    it.each(relationships)(
      "maps $apiRel to $expectedRel",
      ({ apiRel, expectedRel }) => {
        const apiResponse: ApiGraphResponse = {
          nodes: [
            {
              id: 1,
              labels: ["A"],
              color: "#000",
              visible: true,
              data: { name: "A", type: "Document" },
            },
            {
              id: 2,
              labels: ["B"],
              color: "#000",
              visible: true,
              data: { name: "B", type: "Skill" },
            },
          ],
          links: [
            {
              id: 1,
              relationship: apiRel,
              color: "#000",
              source: 1,
              target: 2,
              visible: true,
              data: {},
            },
          ],
        };

        const result = transformGraphResponse(apiResponse);
        expect(result.links[0].relationship).toBe(expectedRel);
      },
    );

    it("falls back to RELATED_TO for unknown relationships", () => {
      const apiResponse: ApiGraphResponse = {
        nodes: [
          {
            id: 1,
            labels: ["A"],
            color: "#000",
            visible: true,
            data: { name: "A", type: "Document" },
          },
          {
            id: 2,
            labels: ["B"],
            color: "#000",
            visible: true,
            data: { name: "B", type: "Skill" },
          },
        ],
        links: [
          {
            id: 1,
            relationship: "UNKNOWN_REL",
            color: "#000",
            source: 1,
            target: 2,
            visible: true,
            data: {},
          },
        ],
      };

      const result = transformGraphResponse(apiResponse);
      expect(result.links[0].relationship).toBe("RELATED_TO");
    });
  });

  describe("link color override", () => {
    it("uses LINK_COLOR for all links", () => {
      const apiResponse: ApiGraphResponse = {
        nodes: [
          {
            id: 1,
            labels: ["A"],
            color: "#000",
            visible: true,
            data: { name: "A", type: "Document" },
          },
          {
            id: 2,
            labels: ["B"],
            color: "#000",
            visible: true,
            data: { name: "B", type: "Skill" },
          },
        ],
        links: [
          {
            id: 1,
            relationship: "HAS_SKILL",
            color: "#ff0000",
            source: 1,
            target: 2,
            visible: true,
            data: {},
          },
        ],
      };

      const result = transformGraphResponse(apiResponse);
      expect(result.links[0].color).toBe(LINK_COLOR);
    });
  });

  describe("empty response", () => {
    it("handles empty nodes and links arrays", () => {
      const apiResponse: ApiGraphResponse = {
        nodes: [],
        links: [],
      };

      const result = transformGraphResponse(apiResponse);
      expect(result.nodes).toEqual([]);
      expect(result.links).toEqual([]);
    });
  });

  describe("years field", () => {
    it("handles numeric years", () => {
      const apiResponse: ApiGraphResponse = {
        nodes: [
          {
            id: 1,
            labels: ["Skill"],
            color: "#000",
            visible: true,
            data: { name: "Test", type: "Skill", years: 5 },
          },
        ],
        links: [],
      };

      const result = transformGraphResponse(apiResponse);
      expect(result.nodes[0].data.years).toBe(5);
    });

    it("parses string years to number", () => {
      const apiResponse: ApiGraphResponse = {
        nodes: [
          {
            id: 1,
            labels: ["Skill"],
            color: "#000",
            visible: true,
            data: { name: "Test", type: "Skill", years: "3" },
          },
        ],
        links: [],
      };

      const result = transformGraphResponse(apiResponse);
      expect(result.nodes[0].data.years).toBe(3);
    });
  });

  describe("preserves structural fields", () => {
    it("preserves id, labels, visible, source, target", () => {
      const apiResponse: ApiGraphResponse = {
        nodes: [
          {
            id: 42,
            labels: ["Skill", "Technical"],
            color: "#000",
            visible: false,
            data: { name: "Test", type: "Skill" },
          },
        ],
        links: [
          {
            id: 99,
            relationship: "HAS_SKILL",
            color: "#000",
            source: 1,
            target: 42,
            visible: true,
            data: { weight: 0.8 },
          },
        ],
      };

      const result = transformGraphResponse(apiResponse);
      expect(result.nodes[0].id).toBe(42);
      expect(result.nodes[0].labels).toEqual(["Skill", "Technical"]);
      expect(result.nodes[0].visible).toBe(false);
      expect(result.links[0].id).toBe(99);
      expect(result.links[0].source).toBe(1);
      expect(result.links[0].target).toBe(42);
      expect(result.links[0].data.weight).toBe(0.8);
    });
  });
});
