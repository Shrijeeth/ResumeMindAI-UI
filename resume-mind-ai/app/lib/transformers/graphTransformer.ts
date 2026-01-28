/**
 * Transforms API graph responses to frontend GraphData format.
 * Handles type mapping, color overrides, and field renaming.
 */

import type {
  ApiGraphResponse,
  ApiNode,
  ApiLink,
  GraphData,
  GraphNode,
  GraphLink,
  NodeType,
  RelationshipType,
  NodeData,
  LinkData,
  SkillLevel,
} from "../types/graph";
import { NODE_COLORS, LINK_COLOR } from "../types/graph";

// API PascalCase node type -> frontend lowercase NodeType
const API_NODE_TYPE_MAP: Record<string, NodeType> = {
  Document: "person",
  Skill: "skill",
  Company: "company",
  Position: "experience",
  Education: "education",
  Project: "project",
  Certification: "certification",
  Language: "language",
  Interest: "interest",
};

// API relationship string -> frontend RelationshipType
const API_RELATIONSHIP_MAP: Record<string, RelationshipType> = {
  HAS_SKILL: "HAS_SKILL",
  WORKED_AT: "WORKED_AT",
  EDUCATED_AT: "STUDIED_AT",
  PROJECT_MEMBER: "COMPLETED_PROJECT",
  CERTIFIED_IN: "CERTIFIED_BY",
  SPEAKS: "SPEAKS",
  INTERESTED_IN: "INTERESTED_IN",
  USES_TECHNOLOGY: "USES_TECHNOLOGY",
  RELATED_TO: "RELATED_TO",
  AT_COMPANY: "AT_COMPANY",
  STUDIED_AT: "STUDIED_AT",
  CERTIFIED_BY: "CERTIFIED_BY",
  COMPLETED_PROJECT: "COMPLETED_PROJECT",
};

// API capitalized skill level -> frontend lowercase SkillLevel
const API_SKILL_LEVEL_MAP: Record<string, SkillLevel> = {
  Beginner: "beginner",
  Intermediate: "intermediate",
  Advanced: "advanced",
  Expert: "expert",
  beginner: "beginner",
  intermediate: "intermediate",
  advanced: "advanced",
  expert: "expert",
};

function mapNodeType(apiType: string): NodeType {
  return API_NODE_TYPE_MAP[apiType] ?? "technology";
}

function mapRelationshipType(apiRelationship: string): RelationshipType {
  return API_RELATIONSHIP_MAP[apiRelationship] ?? "RELATED_TO";
}

function mapSkillLevel(apiLevel?: string): SkillLevel | undefined {
  if (!apiLevel) return undefined;
  return API_SKILL_LEVEL_MAP[apiLevel];
}

function normalizeRelevanceScore(score?: number): number | undefined {
  if (score == null) return undefined;
  // API sends 0-1 float; frontend expects 0-100 integer.
  // Guard: if already > 1, treat as percentage.
  if (score > 1) return Math.round(score);
  return Math.round(score * 100);
}

function transformNode(apiNode: ApiNode): GraphNode {
  const nodeType = mapNodeType(apiNode.data.type);

  const years =
    typeof apiNode.data.years === "string"
      ? parseInt(apiNode.data.years, 10) || undefined
      : apiNode.data.years;

  const nodeData: NodeData = {
    name: apiNode.data.name,
    type: nodeType,
    description: apiNode.data.description,
    level: mapSkillLevel(apiNode.data.level),
    years,
    institution: apiNode.data.institution,
    date: apiNode.data.date,
    relevanceScore: normalizeRelevanceScore(apiNode.data.relevance_score),
  };

  return {
    id: apiNode.id,
    labels: apiNode.labels,
    color: NODE_COLORS[nodeType] ?? apiNode.color,
    visible: apiNode.visible,
    data: nodeData,
  };
}

function transformLink(apiLink: ApiLink): GraphLink {
  const linkData: LinkData = {
    label: apiLink.data.label,
    weight: apiLink.data.weight,
    startDate: apiLink.data.start_date,
    endDate: apiLink.data.end_date,
  };

  return {
    id: apiLink.id,
    relationship: mapRelationshipType(apiLink.relationship),
    color: LINK_COLOR,
    source: apiLink.source,
    target: apiLink.target,
    visible: apiLink.visible,
    data: linkData,
  };
}

/**
 * Transform a complete API graph response to frontend GraphData.
 */
export function transformGraphResponse(
  apiResponse: ApiGraphResponse,
): GraphData {
  return {
    nodes: apiResponse.nodes.map(transformNode),
    links: apiResponse.links.map(transformLink),
  };
}
