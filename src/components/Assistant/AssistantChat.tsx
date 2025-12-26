import React, { useState, useEffect, useRef } from 'react';
import { useWebhook } from '../../hooks/useWebhook';
import { useLanguage } from '../../hooks/useLanguage';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ChatMessage } from './ChatMessage';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface Message {
  role: 'user' | 'bot';
  message: string;
  timestamp: string;
}

export const AssistantChat: React.FC = () => {
  const { t, language } = useLanguage();
  const { getWebhook } = useWebhook();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useLocalStorage<Message[]>('chatHistory', []);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'bot',
          message: t('hello'),
          timestamp: new Date().toISOString(),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const messageText = inputMessage.trim();
    const userMessage: Message = {
      role: 'user',
      message: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    const webhookUrl = getWebhook('assistant');
    if (!webhookUrl) {
      const errorMessage: Message = {
        role: 'bot',
        message: t('webhookNotConfigured'),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev: Message[]) => [...prev, errorMessage]);
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        type: 'user_message',
        message: messageText,
        timestamp: new Date().toISOString(),
        session_id: sessionId,
      };

      console.log('Sending message to webhook:', webhookUrl);
      console.log('Payload:', payload);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Webhook error:', response.status, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText || 'Unknown error'}`);
      }

      // Get response text first to see what we're dealing with
      const responseText = await response.text();
      console.log('Response text:', responseText);

      // Try to parse JSON response
      let data;
      const contentType = response.headers.get('content-type') || '';
      
      try {
        if (contentType.includes('application/json') || responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          data = JSON.parse(responseText);
        } else {
          // If it's plain text, use it as the message
          data = { message: responseText };
        }
      } catch (parseError) {
        console.warn('Failed to parse JSON, using as text:', parseError);
        data = { message: responseText || 'Empty response' };
      }

      console.log('Parsed data:', data);

      // Handle different response formats
      let botResponseMessage = '';
      
      if (typeof data === 'string') {
        botResponseMessage = data;
      } else if (data && typeof data === 'object') {
        if (data.message) {
          botResponseMessage = data.message;
        } else if (data.text) {
          botResponseMessage = data.text;
        } else if (data.response) {
          botResponseMessage = data.response;
        } else if (data.answer) {
          botResponseMessage = data.answer;
        } else if (data.content) {
          botResponseMessage = data.content;
        } else if (data.output) {
          botResponseMessage = data.output;
        } else if (data.result) {
          botResponseMessage = data.result;
        } else if (Array.isArray(data) && data.length > 0) {
          // If response is an array, try to get the first item
          botResponseMessage = typeof data[0] === 'string' ? data[0] : JSON.stringify(data[0]);
        } else if (Object.keys(data).length > 0) {
          // If it's an object with other keys, try to find a string value
          const stringValue = Object.values(data).find(v => typeof v === 'string');
          botResponseMessage = stringValue as string || JSON.stringify(data);
        } else {
          botResponseMessage = JSON.stringify(data);
        }
      } else {
        botResponseMessage = String(data || 'Empty response');
      }

      console.log('Bot response message:', botResponseMessage);

      if (!botResponseMessage || botResponseMessage.trim() === '') {
        botResponseMessage = 'Received empty response from webhook';
      }

      const botMessage: Message = {
        role: 'bot',
        message: botResponseMessage,
        timestamp: (data && data.timestamp) ? data.timestamp : new Date().toISOString(),
      };

      setMessages((prev: Message[]) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error details:', error);
      const errorMessage: Message = {
        role: 'bot',
        message: error instanceof Error ? error.message : t('networkError'),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev: Message[]) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'bot',
        message: t('hello'),
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const positionClass = language === 'ar' ? 'left-5' : 'right-5';

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`
            fixed bottom-5 ${positionClass} z-50
            w-16 h-16 rounded-full
            bg-primary
            hover:bg-blue-600
            dark:hover:bg-blue-700
            text-white shadow-lg
            hover:shadow-xl
            flex items-center justify-center
            transition-all duration-300 ease-in-out
            hover:scale-110
            active:scale-95
            cursor-pointer
          `}
          aria-label={t('aiAssistant')}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`
            fixed bottom-5 ${positionClass} z-50
            w-[calc(100vw-2.5rem)] md:w-[400px]
            h-[600px] max-h-[calc(100vh-2.5rem)]
            bg-white dark:bg-[#2d2d2d]
            rounded-lg shadow-2xl
            flex flex-col
            border border-gray-200 dark:border-gray-700
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('aiAssistant')}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={clearChat}
                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                title={t('clearChat')}
              >
                🗑️
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                title={t('minimize')}
              >
                −
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4"
          >
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                role={msg.role}
                message={msg.message}
                timestamp={msg.timestamp}
              />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('typeYourMessage')}
                className="flex-1"
                disabled={isLoading}
              />
              <Button onClick={sendMessage} disabled={isLoading || !inputMessage.trim()}>
                {t('send')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

