import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import {
  NotificationContainer,
  NotificationModal,
  NotificationIcon,
  NotificationContent,
  NotificationTitle,
  NotificationMessage,
  NotificationButton,
  Overlay,
} from './styles';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationData {
  type: NotificationType;
  title: string;
  message: string;
}

interface NotificationContextType {
  showNotification: (type: NotificationType, title: string, message: string) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notification, setNotification] = useState<NotificationData | null>(null);

  const showNotification = useCallback((type: NotificationType, title: string, message: string) => {
    setNotification({ type, title, message });
  }, []);

  const showSuccess = useCallback((message: string) => {
    showNotification('success', 'Success', message);
  }, [showNotification]);

  const showError = useCallback((message: string) => {
    showNotification('error', 'Error', message);
  }, [showNotification]);

  const showWarning = useCallback((message: string) => {
    showNotification('warning', 'Warning', message);
  }, [showNotification]);

  const showInfo = useCallback((message: string) => {
    showNotification('info', 'Info', message);
  }, [showNotification]);

  const closeNotification = () => {
    setNotification(null);
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return 'ℹ';
    }
  };

  return (
    <NotificationContext.Provider
      value={{ showNotification, showSuccess, showError, showWarning, showInfo }}
    >
      {children}
      {notification && (
        <>
          <Overlay onClick={closeNotification} />
          <NotificationContainer>
            <NotificationModal type={notification.type}>
              <NotificationIcon type={notification.type}>
                {getIcon(notification.type)}
              </NotificationIcon>
              <NotificationContent>
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationMessage>{notification.message}</NotificationMessage>
              </NotificationContent>
              <NotificationButton onClick={closeNotification}>
                OK
              </NotificationButton>
            </NotificationModal>
          </NotificationContainer>
        </>
      )}
    </NotificationContext.Provider>
  );
};
