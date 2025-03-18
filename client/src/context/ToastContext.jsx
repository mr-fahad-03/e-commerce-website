import { createContext, useContext } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const showToast = (message, type = 'success') => {
    switch (type) {
      case 'success':
        toast.success(message, {
          style: {
            background: '#333',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#333',
          },
        });
        break;
      case 'error':
        toast.error(message, {
          style: {
            background: '#333',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#333',
          },
        });
        break;
      default:
        toast(message, {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </ToastContext.Provider>
  );
}; 