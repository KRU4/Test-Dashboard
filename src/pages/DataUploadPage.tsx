import React, { useState } from 'react';
import { useWebhook } from '../hooks/useWebhook';
import { useLanguage } from '../hooks/useLanguage';
import { FileUpload } from '../components/ui/FileUpload';
import { Button } from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';

export const DataUploadPage: React.FC = () => {
  const { t } = useLanguage();
  const { getWebhook } = useWebhook();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setToast({ message: t('invalidFile'), type: 'error' });
      return;
    }

    const webhookUrl = getWebhook('data');
    if (!webhookUrl) {
      setToast({ message: t('webhookNotConfigured'), type: 'error' });
      return;
    }

    setIsLoading(true);
    try {
      const fileBase64 = await convertToBase64(selectedFile);
      
      const payload = {
        type: 'pdf_upload',
        data: {
          filename: selectedFile.name,
          file_base64: fileBase64,
          file_size: selectedFile.size,
        },
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to upload');
      }

      setToast({ message: t('fileUploaded'), type: 'success' });
      setSelectedFile(null);
    } catch {
      setToast({ message: t('networkError'), type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t('dataUpload')}
      </h1>

      <div className="max-w-3xl">
        <div className="bg-white dark:bg-[#2d2d2d] p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('uploadPdfDocument')}
          </h2>
          <FileUpload
            accept=".pdf"
            maxSize={10 * 1024 * 1024}
            onFileSelect={setSelectedFile}
          />
        </div>

        {selectedFile && (
          <div className="mt-6 flex justify-center">
            <Button onClick={handleUpload} isLoading={isLoading}>
              {t('upload')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

