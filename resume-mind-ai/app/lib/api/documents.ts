/**
 * Documents API functions for the Analysis History feature.
 * Base path: /documents
 */

import api from "./client";
import type {
  DocumentListItem,
  DocumentDetail,
  DocumentStatusResponse,
  UploadResponse,
  DocumentFilters,
} from "../types/document";

const DOCUMENTS_BASE = "/documents";

/**
 * List documents with optional filtering and pagination.
 * GET /documents?status_filter=<status>&limit=<1-100>&offset=<0+>
 */
export async function listDocuments(filters: DocumentFilters = {}) {
  const params = new URLSearchParams();

  if (filters.status_filter) {
    params.set("status_filter", filters.status_filter);
  }
  if (filters.limit !== undefined) {
    params.set("limit", String(filters.limit));
  }
  if (filters.offset !== undefined) {
    params.set("offset", String(filters.offset));
  }

  const query = params.toString();
  const path = query ? `${DOCUMENTS_BASE}?${query}` : DOCUMENTS_BASE;

  return api.get<DocumentListItem[]>(path);
}

/**
 * Get document details.
 * GET /documents/{document_id}
 */
export async function getDocument(documentId: string) {
  return api.get<DocumentDetail>(`${DOCUMENTS_BASE}/${documentId}`);
}

/**
 * Poll document status.
 * GET /documents/{document_id}/status
 */
export async function getDocumentStatus(documentId: string) {
  return api.get<DocumentStatusResponse>(
    `${DOCUMENTS_BASE}/${documentId}/status`,
  );
}

/**
 * Upload a document.
 * POST /documents/upload (multipart/form-data)
 * Max 10MB, extensions: pdf, docx, txt, md
 */
export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return api.post<UploadResponse>(`${DOCUMENTS_BASE}/upload`, formData);
}

/**
 * Delete a document.
 * DELETE /documents/{document_id}
 * Returns 204 No Content on success
 */
export async function deleteDocument(documentId: string) {
  return api.delete<void>(`${DOCUMENTS_BASE}/${documentId}`);
}
