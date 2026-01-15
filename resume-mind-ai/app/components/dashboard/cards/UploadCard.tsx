'use client';

import { useState, useRef } from 'react';

interface UploadCardProps {
  onFileSelect?: (file: File) => void;
  isUploading?: boolean;
}

export default function UploadCard({ onFileSelect, isUploading = false }: UploadCardProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0 && onFileSelect) {
      onFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && onFileSelect) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div className="md:col-span-2 bg-gradient-to-br from-primary to-violet-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 transform skew-x-12 translate-x-12 group-hover:translate-x-8 transition-transform duration-500"></div>

      <div className="relative z-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Analyze a New Resume</h2>
        <p className="text-purple-100 mb-6 max-w-lg text-sm sm:text-base">
          Using GraphRAG & Multi-provider LLMs to transform your documents into structured knowledge.
        </p>

        {/* Dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center cursor-pointer backdrop-blur-sm transition-all ${
            isDragOver
              ? 'border-white bg-white/20'
              : 'border-white/30 bg-white/5 hover:bg-white/10'
          } ${isUploading ? 'pointer-events-none opacity-70' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc,.txt"
            onChange={handleFileChange}
            className="hidden"
          />

          {isUploading ? (
            <>
              <div className="w-10 h-10 border-3 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3"></div>
              <h3 className="font-medium text-lg">Uploading...</h3>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-4xl mb-2 opacity-80">
                cloud_upload
              </span>
              <h3 className="font-medium text-lg">Drop your PDF, DOCX or TXT here</h3>
              <p className="text-sm text-purple-200 mt-1">or click to browse files</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
