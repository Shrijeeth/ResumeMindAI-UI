"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  listDocuments,
  deleteDocument,
  uploadDocument,
} from "../api/documents";
import type {
  DocumentListItem,
  DocumentFilters,
  DocumentStatus,
  UploadResponse,
} from "../types/document";
import type { ApiError } from "../api/client";

interface UseDocumentsOptions {
  initialLimit?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface UseDocumentsReturn {
  documents: DocumentListItem[];
  isLoading: boolean;
  error: ApiError | null;
  filters: DocumentFilters;
  setStatusFilter: (status: DocumentStatus | undefined) => void;
  loadMore: () => Promise<void>;
  hasMore: boolean;
  refresh: () => Promise<void>;
  uploadFile: (file: File) => Promise<UploadResponse>;
  isUploading: boolean;
  removeDocument: (id: string) => Promise<void>;
  addOptimisticDocument: (doc: DocumentListItem) => void;
  updateDocument: (id: string, updates: Partial<DocumentListItem>) => void;
}

export function useDocuments(
  options: UseDocumentsOptions = {},
): UseDocumentsReturn {
  const {
    initialLimit = 20,
    autoRefresh = false,
    refreshInterval = 30000,
  } = options;

  const [documents, setDocuments] = useState<DocumentListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [filters, setFilters] = useState<DocumentFilters>({
    limit: initialLimit,
    offset: 0,
  });
  const [hasMore, setHasMore] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const mountedRef = useRef(true);
  const isInitialMount = useRef(true);

  const fetchDocuments = useCallback(
    async (resetList = false) => {
      if (resetList) {
        setIsLoading(true);
      }

      const currentFilters = resetList ? { ...filters, offset: 0 } : filters;

      const response = await listDocuments(currentFilters);

      if (!mountedRef.current) return;

      if (response.error) {
        setError(response.error);
        setIsLoading(false);
        return;
      }

      const data = response.data || [];

      if (resetList || currentFilters.offset === 0) {
        setDocuments(data);
      } else {
        setDocuments((prev) => [...prev, ...data]);
      }

      setHasMore(data.length === currentFilters.limit);
      setError(null);
      setIsLoading(false);
    },
    [filters],
  );

  const setStatusFilter = useCallback((status: DocumentStatus | undefined) => {
    setFilters((prev) => ({ ...prev, status_filter: status, offset: 0 }));
  }, []);

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;
    setFilters((prev) => ({
      ...prev,
      offset: (prev.offset || 0) + (prev.limit || initialLimit),
    }));
  }, [hasMore, isLoading, initialLimit]);

  const refresh = useCallback(async () => {
    setFilters((prev) => ({ ...prev, offset: 0 }));
    await fetchDocuments(true);
  }, [fetchDocuments]);

  const uploadFile = useCallback(
    async (file: File): Promise<UploadResponse> => {
      setIsUploading(true);
      try {
        const response = await uploadDocument(file);

        if (response.error) {
          throw response.error;
        }

        const data = response.data!;

        // Add optimistic document to list
        const optimisticDoc: DocumentListItem = {
          id: data.document_id,
          original_filename: file.name,
          file_type: file.name.split(".").pop() || "unknown",
          document_type: null,
          status: data.status,
          created_at: new Date().toISOString(),
        };
        setDocuments((prev) => [optimisticDoc, ...prev]);

        return data;
      } finally {
        setIsUploading(false);
      }
    },
    [],
  );

  const removeDocument = useCallback(
    async (id: string) => {
      // Optimistic removal
      const previousDocs = documents;
      setDocuments((prev) => prev.filter((d) => d.id !== id));

      const response = await deleteDocument(id);

      if (response.error) {
        // Restore on error
        setDocuments(previousDocs);
        throw response.error;
      }
    },
    [documents],
  );

  const addOptimisticDocument = useCallback((doc: DocumentListItem) => {
    setDocuments((prev) => [doc, ...prev]);
  }, []);

  const updateDocument = useCallback(
    (id: string, updates: Partial<DocumentListItem>) => {
      setDocuments((prev) =>
        prev.map((d) => (d.id === id ? { ...d, ...updates } : d)),
      );
    },
    [],
  );

  // Initial fetch
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchDocuments(true);
    }
  }, [fetchDocuments]);

  // Handle filter and pagination changes (skip initial mount)
  useEffect(() => {
    if (!isInitialMount.current) {
      fetchDocuments(filters.offset === 0);
    }
  }, [filters.status_filter, filters.offset, fetchDocuments]);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => fetchDocuments(true), refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchDocuments]);

  // Cleanup
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return {
    documents,
    isLoading,
    error,
    filters,
    setStatusFilter,
    loadMore,
    hasMore,
    refresh,
    uploadFile,
    isUploading,
    removeDocument,
    addOptimisticDocument,
    updateDocument,
  };
}
