/**
 * Graph API functions for knowledge graph visualization.
 * Base paths:
 * - Document-level: /documents/{documentId}/graph
 * - User-level: /api/user/graph
 */

import api from "./client";
import type { ApiGraphResponse } from "../types/graph";

const DOCUMENTS_BASE = "/documents";
const USER_GRAPH_BASE = "/api/user/graph";

export interface GraphQueryParams {
  types?: string[];
  max_nodes?: number;
  max_depth?: number;
}

/**
 * Fetch the knowledge graph for a specific document.
 * GET /documents/{documentId}/graph?types=Skill,Company&max_nodes=50
 */
export async function getDocumentGraph(
  documentId: string,
  params: GraphQueryParams = {},
) {
  const queryParams = new URLSearchParams();

  if (params.types && params.types.length > 0) {
    queryParams.set("types", params.types.join(","));
  }
  if (params.max_nodes !== undefined) {
    queryParams.set("max_nodes", String(params.max_nodes));
  }

  const query = queryParams.toString();
  const path = `${DOCUMENTS_BASE}/${documentId}/graph${query ? `?${query}` : ""}`;

  return api.get<ApiGraphResponse>(path);
}

/**
 * Fetch the aggregated user-level knowledge graph.
 * GET /api/user/graph?types=Skill,Company&max_nodes=50&max_depth=3
 *
 * Returns all nodes and links across all documents for the authenticated user.
 */
export async function getUserGraph(params: GraphQueryParams = {}) {
  const queryParams = new URLSearchParams();

  if (params.types && params.types.length > 0) {
    queryParams.set("types", params.types.join(","));
  }
  if (params.max_nodes !== undefined) {
    queryParams.set("max_nodes", String(params.max_nodes));
  }
  if (params.max_depth !== undefined) {
    queryParams.set("max_depth", String(params.max_depth));
  }

  const query = queryParams.toString();
  const path = `${USER_GRAPH_BASE}${query ? `?${query}` : ""}`;

  return api.get<ApiGraphResponse>(path);
}
