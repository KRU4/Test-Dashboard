import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';

interface ChatMessageProps {
  role: 'user' | 'bot';
  message: string;
  timestamp: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, message, timestamp }) => {
  const { language } = useLanguage();

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`
        flex mb-4 w-full
        ${role === 'user' ? 'justify-end' : 'justify-start'}
      `}
    >
      <div
        className={`
          max-w-[75%] rounded-2xl p-3 shadow-sm
          ${
            role === 'user'
              ? 'bg-primary text-white rounded-tr-none'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-tl-none'
          }
        `}
      >
        <p className={`text-sm mb-1 ${role === 'user' ? 'text-right' : 'text-left'} whitespace-pre-wrap break-words`}>
          {message}
        </p>
        <p
          className={`
            text-xs opacity-70 mt-1
            ${role === 'user' ? 'text-right' : 'text-left'}
          `}
        >
          {formatTime(timestamp)}
        </p>
      </div>
    </div>
  );
};

