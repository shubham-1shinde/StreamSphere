import React, { useEffect } from 'react';

const ToastNotification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Auto-close after 2 seconds
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg animate-slide-in-out z-50">
      ✅ {message}
    </div>
  );
};

export default ToastNotification;
