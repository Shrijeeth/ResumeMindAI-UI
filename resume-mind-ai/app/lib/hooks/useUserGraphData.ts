"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { GraphData, GraphError, GraphErrorType } from "../types/graph";
import { getUserGraph } from "../api/graph";
import type { GraphQueryParams } from "../api/graph";
import { transformGraphResponse } from "../transformers/graphTransformer";

interface UseUserGraphDataOptions {
  queryParams?: GraphQueryParams;
  enabled?: boolean;
}

interface UseUserGraphDataReturn {
  data: GraphData | null;
  isLoading: boolean;
  error: GraphError | null;
  refresh: () => Promise<void>;
}

function classifyError(status: number, message: string): GraphError {
  const errorMap: Record<number, GraphErrorType> = {
    401: "unauthorized",
    403: "forbidden",
    404: "not_found",
    400: "validation",
  };

  return {
    type: errorMap[status] ?? (status === 0 ? "network" : "unknown"),
    message,
    status,
  };
}

/**
 * Hook for fetching user-level graph data from the backend API.
 * Fetches aggregated graph data across all documents for the authenticated user.
 * Transforms API response to frontend GraphData format.
 */
export function useUserGraphData(
  options: UseUserGraphDataOptions = {},
): UseUserGraphDataReturn {
  const { queryParams, enabled = true } = options;

  const [data, setData] = useState<GraphData | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<GraphError | null>(null);
  const mountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    const response = await getUserGraph(queryParams);

    if (!mountedRef.current) return;

    if (response.error) {
      setError(classifyError(response.status, response.error.message));
      setData(null);
    } else if (response.data) {
      const transformed = transformGraphResponse(response.data);
      setData(transformed);
    } else {
      setData({ nodes: [], links: [] });
    }

    setIsLoading(false);
  }, [queryParams, enabled]);

  // Data fetching on mount and dependency changes — async fetch sets state
  // after awaiting the network response, which is the standard React pattern
  // for data loading hooks.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return {
    data,
    isLoading,
    error,
    refresh: fetchData,
  };
}
