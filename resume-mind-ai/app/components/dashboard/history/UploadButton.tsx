"use client";

import { useRef, useState } from "react";
import {
  ALLOWED_EXTENSIONS,
  MAX_FILE_SIZE_MB,
  isValidFileExtension,
  isValidFileSize,
} from "@/app/lib/types/document";

interface UploadButtonProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

export default function UploadButton({
  onUpload,
  isUploading,
}: UploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    setError(null);
    inputRef.current?.click();
  };

  const validateFile = (file: File): string | null => {
    if (!isValidFileExtension(file.name)) {
      return `Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(", ")}`;
    }
    if (!isValidFileSize(file.size)) {
      return `File too large. Maximum size: ${MAX_FILE_SIZE_MB}MB`;
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        e.target.value = "";
        return;
      }
      setError(null);
      onUpload(file);
      e.target.value = "";
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_EXTENSIONS.map((ext) => `.${ext}`).join(",")}
        onChange={handleChange}
        className="hidden"
        aria-label="Upload document"
      />
      <button
        onClick={handleClick}
        disabled={isUploading}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-violet-600 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-lg">add</span>
            New Analysis
          </>
        )}
      </button>
      {error && (
        <div className="absolute top-full mt-2 right-0 z-10 px-3 py-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
}
