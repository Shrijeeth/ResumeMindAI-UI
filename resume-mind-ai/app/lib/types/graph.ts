/**
 * Graph types for FalkorDB Canvas integration.
 * Maps to @falkordb/canvas data format and career knowledge graph domain.
 */

// ---------------------------------------------------------------------------
// Frontend Domain Types
// ---------------------------------------------------------------------------

// Node type enumeration for career graph
export type NodeType =
  | "person"
  | "skill"
  | "experience"
  | "education"
  | "company"
  | "certification"
  | "project"
  | "technology"
  | "language"
  | "interest";

// Skill proficiency levels
export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

// Relationship types between nodes
export type RelationshipType =
  | "HAS_SKILL"
  | "WORKED_AT"
  | "STUDIED_AT"
  | "CERTIFIED_BY"
  | "COMPLETED_PROJECT"
  | "USES_TECHNOLOGY"
  | "RELATED_TO"
  | "AT_COMPANY"
  | "SPEAKS"
  | "INTERESTED_IN";

// Custom node data based on career domain
export interface NodeData {
  name: string;
  type: NodeType;
  description?: string;
  level?: SkillLevel;
  years?: number;
  institution?: string;
  date?: string;
  relevanceScore?: number;
}

// FalkorDB Canvas Node format
export interface GraphNode {
  id: number;
  labels: string[];
  color: string;
  visible: boolean;
  data: NodeData;
}

// Custom link data
export interface LinkData {
  label?: string;
  weight?: number;
  startDate?: string;
  endDate?: string;
}

// FalkorDB Canvas Link format
export interface GraphLink {
  id: number;
  relationship: RelationshipType;
  color: string;
  source: number;
  target: number;
  visible: boolean;
  data: LinkData;
}

// Complete graph data structure
export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// Canvas configuration callbacks
export interface CanvasConfig {
  onNodeClick?: (node: GraphNode) => void;
  onNodeHover?: (node: GraphNode | null) => void;
  onLinkClick?: (link: GraphLink) => void;
  onLinkHover?: (link: GraphLink | null) => void;
  onBackgroundClick?: () => void;
  onZoom?: (zoom: number) => void;
}

// Graph view state
export interface GraphViewState {
  selectedNode: GraphNode | null;
  hoveredNode: GraphNode | null;
  zoomLevel: number;
  isLoading: boolean;
  error: string | null;
}

// Node color mapping by type (matching design system)
export const NODE_COLORS: Record<NodeType, string> = {
  person: "#8b5cf6", // primary purple
  skill: "#3b82f6", // blue-500
  experience: "#10b981", // emerald-500
  education: "#f97316", // orange-500
  certification: "#eab308", // yellow-500
  project: "#ec4899", // pink-500
  company: "#6366f1", // indigo-500
  technology: "#14b8a6", // teal-500
  language: "#06b6d4", // cyan-500
  interest: "#f43f5e", // rose-500
};

// Node labels for display
export const NODE_LABELS: Record<NodeType, string> = {
  person: "Person",
  skill: "Skills",
  experience: "Experience",
  education: "Education",
  certification: "Certifications",
  project: "Projects",
  company: "Companies",
  technology: "Technologies",
  language: "Languages",
  interest: "Interests",
};

// Link color (slate-600)
export const LINK_COLOR = "#475569";

// Helper to get level percentage for progress bars
export function getLevelPercentage(level: SkillLevel): number {
  const levels: Record<SkillLevel, number> = {
    beginner: 25,
    intermediate: 50,
    advanced: 75,
    expert: 100,
  };
  return levels[level];
}

// Count nodes by type for statistics
export function getNodeCountsByType(data: GraphData): Record<string, number> {
  const counts: Record<string, number> = {};
  data.nodes.forEach((node) => {
    const type = node.data.type;
    counts[type] = (counts[type] || 0) + 1;
  });
  return counts;
}

// ---------------------------------------------------------------------------
// API Response Types (raw backend shapes)
// ---------------------------------------------------------------------------

export interface ApiNodeData {
  name: string;
  type: string;
  description?: string;
  level?: string;
  years?: number | string;
  institution?: string;
  date?: string;
  relevance_score?: number;
}

export interface ApiNode {
  id: number;
  labels: string[];
  color: string;
  visible: boolean;
  data: ApiNodeData;
}

export interface ApiLinkData {
  label?: string;
  weight?: number;
  start_date?: string;
  end_date?: string;
}

export interface ApiLink {
  id: number;
  relationship: string;
  color: string;
  source: number;
  target: number;
  visible: boolean;
  data: ApiLinkData;
}

export interface ApiGraphResponse {
  nodes: ApiNode[];
  links: ApiLink[];
}

// ---------------------------------------------------------------------------
// Graph Error Types
// ---------------------------------------------------------------------------

export type GraphErrorType =
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "validation"
  | "network"
  | "unknown";

export interface GraphError {
  type: GraphErrorType;
  message: string;
  status: number;
}
