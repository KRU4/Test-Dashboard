import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div
      className={`
        fixed top-4 right-4 z-50
        ${bgColor[type]} text-white
        px-6 py-4 rounded-lg shadow-lg
        flex items-center gap-3
        animate-slide-in
        max-w-md
      `}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-auto text-white hover:text-gray-200 font-bold"
      >
        ×
      </button>
    </div>
  );
};

