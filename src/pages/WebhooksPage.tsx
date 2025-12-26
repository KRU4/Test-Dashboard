import React, { useState } from 'react';
import { useWebhook } from '../hooks/useWebhook';
import { useLanguage } from '../hooks/useLanguage';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';

export const WebhooksPage: React.FC = () => {
  const { t } = useLanguage();
  const { webhooks, updateWebhook, validateUrl } = useWebhook();
  const [localWebhooks, setLocalWebhooks] = useState({
    aboutCompany: webhooks.aboutCompany,
    services: webhooks.services,
    data: webhooks.data,
    assistant: webhooks.assistant,
  });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSave = (key: keyof typeof localWebhooks) => {
    const url = localWebhooks[key];
    if (!url.trim()) {
      setToast({ message: t('invalidUrl'), type: 'error' });
      return;
    }
    if (!validateUrl(url)) {
      setToast({ message: t('invalidUrl'), type: 'error' });
      return;
    }
    updateWebhook(key, url);
    setToast({ message: t('webhookSaved'), type: 'success' });
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
        {t('webhookConfiguration')}
      </h1>

      <div className="space-y-6 max-w-3xl">
        {/* About Company Webhook */}
        <div className="bg-white dark:bg-[#2d2d2d] p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('aboutCompanyWebhook')}
          </h2>
          <div className="flex gap-3">
            <Input
              value={localWebhooks.aboutCompany}
              onChange={(e) =>
                setLocalWebhooks({ ...localWebhooks, aboutCompany: e.target.value })
              }
              placeholder="https://n8.g-aid.cloud/webhook..."
              className="flex-1"
            />
            <Button onClick={() => handleSave('aboutCompany')}>
              {t('save')}
            </Button>
          </div>
        </div>

        {/* Services Webhook */}
        <div className="bg-white dark:bg-[#2d2d2d] p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('servicesWebhook')}
          </h2>
          <div className="flex gap-3">
            <Input
              value={localWebhooks.services}
              onChange={(e) =>
                setLocalWebhooks({ ...localWebhooks, services: e.target.value })
              }
              placeholder="https://..."
              className="flex-1"
            />
            <Button onClick={() => handleSave('services')}>
              {t('save')}
            </Button>
          </div>
        </div>

        {/* Data Upload Webhook */}
        <div className="bg-white dark:bg-[#2d2d2d] p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('dataUploadWebhook')}
          </h2>
          <div className="flex gap-3">
            <Input
              value={localWebhooks.data}
              onChange={(e) =>
                setLocalWebhooks({ ...localWebhooks, data: e.target.value })
              }
              placeholder="https://..."
              className="flex-1"
            />
            <Button onClick={() => handleSave('data')}>
              {t('save')}
            </Button>
          </div>
        </div>

        {/* Assistant Webhook */}
        <div className="bg-white dark:bg-[#2d2d2d] p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('assistantWebhook')}
          </h2>
          <div className="flex gap-3">
            <Input
              value={localWebhooks.assistant}
              onChange={(e) =>
                setLocalWebhooks({ ...localWebhooks, assistant: e.target.value })
              }
              placeholder="https://..."
              className="flex-1"
            />
            <Button onClick={() => handleSave('assistant')}>
              {t('save')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

