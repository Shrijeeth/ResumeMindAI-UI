"use client";

import { useEffect, useRef, useCallback } from "react";
import { getDocumentStatus } from "../api/documents";
import type { DocumentListItem, DocumentStatus } from "../types/document";
import { isTerminalStatus } from "../types/document";

interface UsePollingDocumentsOptions {
  documents: DocumentListItem[];
  onStatusUpdate: (
    id: string,
    status: DocumentStatus,
    progressMessage?: string,
    errorMessage?: string,
  ) => void;
  initialInterval?: number;
  backoffInterval?: number;
  backoffAfter?: number;
  maxDuration?: number;
  enabled?: boolean;
}

interface PollingEntry {
  startTime: number;
  intervalId: ReturnType<typeof setInterval>;
  currentInterval: number;
}

/**
 * Hook to manage polling for multiple documents with non-terminal statuses.
 * Implements backoff: switches from initialInterval to backoffInterval after backoffAfter ms.
 * Stops polling after maxDuration or when status becomes terminal.
 */
export function usePollingDocuments(options: UsePollingDocumentsOptions): void {
  const {
    documents,
    onStatusUpdate,
    initialInterval = 2000,
    backoffInterval = 4000,
    backoffAfter = 30000,
    maxDuration = 120000,
    enabled = true,
  } = options;

  const pollingMapRef = useRef<Map<string, PollingEntry>>(new Map());
  const onStatusUpdateRef = useRef(onStatusUpdate);

  // Keep callback ref updated
  useEffect(() => {
    onStatusUpdateRef.current = onStatusUpdate;
  }, [onStatusUpdate]);

  const stopPolling = useCallback((id: string) => {
    const entry = pollingMapRef.current.get(id);
    if (entry) {
      clearInterval(entry.intervalId);
      pollingMapRef.current.delete(id);
    }
  }, []);

  const startPolling = useCallback(
    (id: string) => {
      // Don't start if already polling
      if (pollingMapRef.current.has(id)) return;

      const startTime = Date.now();

      const poll = async () => {
        const elapsed = Date.now() - startTime;
        const entry = pollingMapRef.current.get(id);

        if (!entry) return;

        // Stop after max duration
        if (elapsed > maxDuration) {
          stopPolling(id);
          return;
        }

        // Apply backoff if needed
        if (
          elapsed > backoffAfter &&
          entry.currentInterval === initialInterval
        ) {
          // Clear current interval and start with backoff interval
          clearInterval(entry.intervalId);
          const newIntervalId = setInterval(poll, backoffInterval);
          pollingMapRef.current.set(id, {
            ...entry,
            intervalId: newIntervalId,
            currentInterval: backoffInterval,
          });
        }

        try {
          const response = await getDocumentStatus(id);

          if (response.error) {
            stopPolling(id);
            return;
          }

          const status = response.data!;
          onStatusUpdateRef.current(
            id,
            status.status,
            status.progress_message,
            status.error_message,
          );

          if (isTerminalStatus(status.status)) {
            stopPolling(id);
          }
        } catch {
          stopPolling(id);
        }
      };

      // Start polling
      const intervalId = setInterval(poll, initialInterval);
      pollingMapRef.current.set(id, {
        startTime,
        intervalId,
        currentInterval: initialInterval,
      });

      // Initial poll immediately
      poll();
    },
    [initialInterval, backoffInterval, backoffAfter, maxDuration, stopPolling],
  );

  useEffect(() => {
    if (!enabled) {
      // Stop all polling if disabled
      pollingMapRef.current.forEach((_, id) => stopPolling(id));
      return;
    }

    // Get non-terminal documents
    const nonTerminalDocs = documents.filter(
      (d) => !isTerminalStatus(d.status),
    );
    const nonTerminalIds = new Set(nonTerminalDocs.map((d) => d.id));

    // Start polling for new non-terminal docs
    nonTerminalDocs.forEach((doc) => startPolling(doc.id));

    // Stop polling for docs no longer in list or now terminal
    pollingMapRef.current.forEach((_, id) => {
      if (!nonTerminalIds.has(id)) {
        stopPolling(id);
      }
    });
  }, [documents, enabled, startPolling, stopPolling]);

  // Cleanup on unmount
  useEffect(() => {
    const pollingMap = pollingMapRef.current;
    return () => {
      pollingMap.forEach((entry) => {
        clearInterval(entry.intervalId);
      });
      pollingMap.clear();
    };
  }, []);
}
