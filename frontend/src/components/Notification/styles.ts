import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 9998;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const NotificationContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  animation: ${slideIn} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

export const NotificationModal = styled.div<{ type: 'success' | 'error' | 'warning' | 'info' }>`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  border: 2px solid ${props => {
    switch (props.type) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      case 'info':
        return theme.colors.info;
      default:
        return theme.colors.border;
    }
  }};
  padding: ${theme.spacing['2xl']};
  min-width: 400px;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.lg};

  @media (max-width: 768px) {
    min-width: 90vw;
    padding: ${theme.spacing.xl};
  }
`;

export const NotificationIcon = styled.div<{ type: 'success' | 'error' | 'warning' | 'info' }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  background: ${props => {
    switch (props.type) {
      case 'success':
        return `${theme.colors.success}20`;
      case 'error':
        return `${theme.colors.error}20`;
      case 'warning':
        return `${theme.colors.warning}20`;
      case 'info':
        return `${theme.colors.info}20`;
      default:
        return theme.colors.background;
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      case 'info':
        return theme.colors.info;
      default:
        return theme.colors.text.primary;
    }
  }};
  border: 2px solid ${props => {
    switch (props.type) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      case 'info':
        return theme.colors.info;
      default:
        return theme.colors.border;
    }
  }};
`;

export const NotificationContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const NotificationTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0;
`;

export const NotificationMessage = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.text.secondary};
  margin: 0;
  line-height: 1.5;
`;

export const NotificationButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing['2xl']};
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  min-width: 120px;

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.glow};
  }

  &:active {
    transform: translateY(0);
  }
`;
