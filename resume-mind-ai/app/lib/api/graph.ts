/**
 * Graph API functions for knowledge graph visualization.
 * Base path: /documents/{documentId}/graph
 */

import api from "./client";
import type { ApiGraphResponse } from "../types/graph";

const DOCUMENTS_BASE = "/documents";

export interface GraphQueryParams {
  types?: string[];
  max_nodes?: number;
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
