import React, { useState } from 'react';
import { useWebhook } from '../hooks/useWebhook';
import { useLanguage } from '../hooks/useLanguage';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';

export const AboutCompanyPage: React.FC = () => {
  const { t } = useLanguage();
  const { getWebhook } = useWebhook();
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ companyName?: string; description?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const validate = (): boolean => {
    const newErrors: { companyName?: string; description?: string } = {};
    
    if (!companyName.trim() || companyName.length < 2 || companyName.length > 100) {
      newErrors.companyName = t('companyNameRequired');
    }
    
    if (!description.trim() || description.length < 10 || description.length > 500) {
      newErrors.description = t('descriptionRequired');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) {
      setToast({ message: t('validationError'), type: 'error' });
      return;
    }

    const webhookUrl = getWebhook('aboutCompany');
    if (!webhookUrl) {
      setToast({ message: t('webhookNotConfigured'), type: 'error' });
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        type: 'about_company',
        data: {
          company_name: companyName,
          description: description,
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
        throw new Error('Failed to save');
      }

      setToast({ message: t('companyInfoSaved'), type: 'success' });
      setCompanyName('');
      setDescription('');
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
        {t('aboutCompany')}
      </h1>

      <div className="max-w-3xl space-y-6">
        <div className="bg-white dark:bg-[#2d2d2d] p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <Input
            label={t('companyName')}
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            error={errors.companyName}
            placeholder={t('companyName')}
          />
        </div>

        <div className="bg-white dark:bg-[#2d2d2d] p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <Textarea
            label={t('description')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errors.description}
            placeholder={t('description')}
            rows={6}
          />
        </div>

        <div className="flex justify-center">
          <Button onClick={handleSave} isLoading={isLoading}>
            {t('save')}
          </Button>
        </div>
      </div>
    </div>
  );
};

