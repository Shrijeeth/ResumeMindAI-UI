/**
 * Document types for the Analysis History feature.
 * Maps to backend API at /api/documents
 */

// Backend status enum - maps to DocumentStatus in models/document.py
export type DocumentStatus =
  | "pending"
  | "uploading"
  | "validating"
  | "parsing"
  | "completed"
  | "invalid"
  | "failed";

// Terminal statuses where polling should stop
export const TERMINAL_STATUSES: DocumentStatus[] = [
  "completed",
  "invalid",
  "failed",
];

// Document type classification - maps to DocumentType in models/document.py
export type DocumentType =
  | "resume"
  | "job_description"
  | "cover_letter"
  | "other"
  | "unknown"
  | null;

// File type (extension)
export type FileType = "pdf" | "docx" | "txt" | "md" | string;

// Allowed upload extensions and size
export const ALLOWED_EXTENSIONS = ["pdf", "docx", "txt", "md"];
export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// Timestamps from backend
export interface DocumentTimestamps {
  created_at: string;
  updated_at?: string;
  completed_at?: string;
}

// Document list item (from GET /api/documents)
export interface DocumentListItem {
  id: string;
  original_filename: string;
  file_type: FileType;
  document_type: DocumentType;
  status: DocumentStatus;
  created_at: string;
}

// Document detail (from GET /api/documents/{id})
export interface DocumentDetail extends DocumentListItem {
  markdown_content?: string;
  classification_confidence?: number;
  s3_key?: string;
  updated_at?: string;
  completed_at?: string;
  progress_message?: string;
  error_message?: string;
}

// Upload response (from POST /api/documents/upload)
export interface UploadResponse {
  document_id: string;
  task_id: string;
  status: DocumentStatus;
  message: string;
}

// Status poll response (from GET /api/documents/{id}/status)
export interface DocumentStatusResponse {
  status: DocumentStatus;
  document_type?: DocumentType;
  progress_message?: string;
  error_message?: string;
  classification_confidence?: number;
  created_at: string;
  updated_at?: string;
  completed_at?: string;
}

// Filter options for list
export interface DocumentFilters {
  status_filter?: DocumentStatus;
  limit?: number;
  offset?: number;
}

// Helper to check if a status is terminal
export function isTerminalStatus(status: DocumentStatus): boolean {
  return TERMINAL_STATUSES.includes(status);
}

// Helper to validate file extension
export function isValidFileExtension(filename: string): boolean {
  const ext = filename.split(".").pop()?.toLowerCase();
  return ext ? ALLOWED_EXTENSIONS.includes(ext) : false;
}

// Helper to validate file size
export function isValidFileSize(size: number): boolean {
  return size <= MAX_FILE_SIZE_BYTES;
}

// Helper to get file extension from filename
export function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() || "unknown";
}
