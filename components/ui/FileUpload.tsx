'use client';

import { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { Upload, X, FileText, Image } from 'lucide-react';

interface FileUploadProps {
  label?: string;
  accept?: string;
  maxSize?: number;
  onChange: (file: File | null) => void;
  error?: string;
  value?: File | null;
}

export function FileUpload({
  label,
  accept = 'image/*,.pdf,.txt,.csv',
  maxSize = 10 * 1024 * 1024,
  onChange,
  error,
  value,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setLocalError(null);
    if (file.size > maxSize) {
      setLocalError(`File too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB`);
      return;
    }
    onChange(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const displayError = error || localError;

  const isImage = value?.type.startsWith('image/');

  return (
    <div className="w-full">
      {label && (
        <label className="block font-heading font-bold text-lg mb-2">{label}</label>
      )}

      {value ? (
        <div className="border-3 border-nb-black bg-nb-gray p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isImage ? (
              <Image className="w-6 h-6" />
            ) : (
              <FileText className="w-6 h-6" />
            )}
            <span className="font-bold truncate max-w-[200px]">{value.name}</span>
            <span className="text-nb-gray-dark text-sm">
              ({Math.round(value.size / 1024)}KB)
            </span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="p-2 bg-nb-red text-white border-2 border-nb-black hover:bg-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            border-3 border-dashed border-nb-black p-8
            flex flex-col items-center justify-center gap-2
            cursor-pointer transition-colors
            ${isDragging ? 'bg-nb-yellow' : 'bg-white hover:bg-nb-gray'}
          `}
        >
          <Upload className="w-10 h-10" />
          <p className="font-heading font-bold text-lg">
            Drop file here or click to upload
          </p>
          <p className="text-nb-gray-dark text-sm">
            Max {Math.round(maxSize / 1024 / 1024)}MB - Images, PDF, TXT, CSV
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      {displayError && (
        <p className="mt-1 text-nb-red font-bold text-sm">{displayError}</p>
      )}
    </div>
  );
}
