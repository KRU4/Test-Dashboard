import React, { useState } from 'react';
import { useWebhook } from '../hooks/useWebhook';
import { useLanguage } from '../hooks/useLanguage';
import { RadioGroup } from '../components/ui/RadioGroup';
import { Input } from '../components/ui/Input';
import { CheckboxGroup } from '../components/ui/Checkbox';
import { Button } from '../components/ui/Button';
import { Toast } from '../components/ui/Toast';

export const ServicesPage: React.FC = () => {
  const { t } = useLanguage();
  const { getWebhook } = useWebhook();
  const [serviceType, setServiceType] = useState('');
  const [numberOfUsers, setNumberOfUsers] = useState(1);
  const [enabledTools, setEnabledTools] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ serviceType?: string; tools?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const serviceOptions = [
    { value: 'personal_assistant', label: t('personalAssistant') },
    { value: 'company_assistant', label: t('companyAssistant') },
    { value: 'moderation_agent', label: t('moderationAgent') },
    { value: 'sales_agent', label: t('salesAgent') },
    { value: 'customer_support', label: t('customerSupport') },
  ];

  const toolOptions = [
    { value: 'create_image', label: t('createImage') },
    { value: 'create_docs_file', label: t('createDocsFile') },
    { value: 'telegram_sender', label: t('telegramSender') },
    { value: 'whatsapp_sender', label: t('whatsappSender') },
  ];

  const validate = (): boolean => {
    const newErrors: { serviceType?: string; tools?: string } = {};
    
    if (!serviceType) {
      newErrors.serviceType = t('serviceTypeRequired');
    }
    
    if (enabledTools.length === 0) {
      newErrors.tools = t('atLeastOneTool');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) {
      setToast({ message: t('validationError'), type: 'error' });
      return;
    }

    const webhookUrl = getWebhook('services');
    if (!webhookUrl) {
      setToast({ message: t('webhookNotConfigured'), type: 'error' });
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        type: 'service_configuration',
        data: {
          service_type: serviceType,
          number_of_users: numberOfUsers,
          enabled_tools: enabledTools,
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

      setToast({ message: t('serviceSaved'), type: 'success' });
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
        {t('serviceConfiguration')}
      </h1>

      <div className="max-w-3xl space-y-6">
        <div className="bg-white dark:bg-[#2d2d2d] p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <RadioGroup
            label={t('selectService')}
            options={serviceOptions}
            value={serviceType}
            onChange={setServiceType}
            error={errors.serviceType}
          />
        </div>

        <div className="bg-white dark:bg-[#2d2d2d] p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <Input
            label={t('numberOfUsers')}
            type="number"
            value={numberOfUsers.toString()}
            onChange={(e) => setNumberOfUsers(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
          />
        </div>

        <div className="bg-white dark:bg-[#2d2d2d] p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <CheckboxGroup
            label={t('enableTools')}
            options={toolOptions}
            value={enabledTools}
            onChange={setEnabledTools}
            error={errors.tools}
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

