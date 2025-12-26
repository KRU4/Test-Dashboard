import React, { useRef, useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in bytes
  onFileSelect: (file: File) => void;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = '.pdf',
  maxSize = 10 * 1024 * 1024, // 10MB default
  onFileSelect,
  error,
}) => {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (accept && !file.name.toLowerCase().endsWith(accept.replace('.', ''))) {
      return `Please select a ${accept} file`;
    }
    if (file.size > maxSize) {
      return `File size must be less than ${maxSize / (1024 * 1024)}MB`;
    }
    return null;
  };

  const handleFile = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      alert(validationError);
      return;
    }
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          w-full p-8 border-2 border-dashed rounded-lg
          cursor-pointer transition-colors
          flex flex-col items-center justify-center
          text-center
          ${
            isDragging
              ? 'border-primary bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#2d2d2d] hover:border-gray-400'
          }
          ${error ? 'border-red-500 dark:border-red-500' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
          aria-label={t('uploadPdfDocument')}
          title={t('uploadPdfDocument')}
        />
        <div className="text-4xl mb-2">📄</div>
        <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
          {t('dragDropPdf')}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
          {t('orClickToBrowse')}
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-xs">
          {t('pdfFilesOnly')} ({maxSize / (1024 * 1024)}MB)
        </p>
      </div>
      {selectedFile && (
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          {t('selectedFile')}: <span className="font-medium">{selectedFile.name}</span>
        </p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

