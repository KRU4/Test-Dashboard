import { useLocalStorage } from './useLocalStorage';

export interface Webhooks {
  aboutCompany: string;
  services: string;
  data: string;
  assistant: string;
}

const defaultWebhooks: Webhooks = {
  aboutCompany: '',
  services: '',
  data: '',
  assistant: '',
};

export const useWebhook = () => {
  const [webhooks, setWebhooks] = useLocalStorage<Webhooks>('webhooks', defaultWebhooks);

  const updateWebhook = (key: keyof Webhooks, url: string) => {
    setWebhooks((prev) => ({ ...prev, [key]: url }));
  };

  const getWebhook = (key: keyof Webhooks): string => {
    return webhooks[key] || '';
  };

  const validateUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  return {
    webhooks,
    updateWebhook,
    getWebhook,
    validateUrl,
  };
};

