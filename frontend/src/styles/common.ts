import styled from 'styled-components';
import { theme } from './theme';

// Buttons
export const PrimaryButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  border-radius: ${theme.borderRadius.md};
  transition: all ${theme.transitions.normal};
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover:not(:disabled) {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.glow};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${theme.colors.surfaceHover};
  color: ${theme.colors.text.primary};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.border};
  transition: all ${theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${theme.colors.border};
    border-color: ${theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DangerButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${theme.colors.error};
  color: white;
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  border-radius: ${theme.borderRadius.md};
  transition: all ${theme.transitions.fast};

  &:hover:not(:disabled) {
    background: #d32f2f;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all ${theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${theme.colors.surfaceHover};
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Cards
export const Card = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg};
`;

export const CardTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.primary};
  font-weight: 600;
  margin: 0;
`;

// Inputs
export const Input = styled.input`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.primary};
  font-size: ${theme.fontSizes.sm};
  transition: all ${theme.transitions.fast};

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.text.tertiary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Select = styled.select`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.primary};
  font-size: ${theme.fontSizes.sm};
  transition: all ${theme.transitions.fast};

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TextArea = styled.textarea`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.primary};
  font-size: ${theme.fontSizes.sm};
  transition: all ${theme.transitions.fast};
  resize: vertical;
  min-height: 100px;

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.text.tertiary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Tables
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  border-bottom: 1px solid ${theme.colors.border};
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${theme.colors.border};
  transition: background ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.background};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: ${theme.spacing.md} ${theme.spacing.sm};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
`;

export const TableCell = styled.td`
  padding: ${theme.spacing.md} ${theme.spacing.sm};
  color: ${theme.colors.text.primary};
  font-size: ${theme.fontSizes.sm};
`;

// Badges
export const Badge = styled.span<{ variant?: 'success' | 'warning' | 'error' | 'info' | 'default' }>`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: ${props => {
    switch (props.variant) {
      case 'success':
        return `${theme.colors.success}20`;
      case 'warning':
        return `${theme.colors.warning}20`;
      case 'error':
        return `${theme.colors.error}20`;
      case 'info':
        return `${theme.colors.info}20`;
      default:
        return `${theme.colors.text.tertiary}20`;
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'success':
        return theme.colors.success;
      case 'warning':
        return theme.colors.warning;
      case 'error':
        return theme.colors.error;
      case 'info':
        return theme.colors.info;
      default:
        return theme.colors.text.tertiary;
    }
  }};
`;

// Modal
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.xl};
`;

export const ModalContent = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  width: 100%;
  max-width: 600px;
  border: 1px solid ${theme.colors.border};
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.xl};
`;

export const ModalTitle = styled.h2`
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.text.primary};
  font-weight: 600;
  margin: 0;
`;

export const ModalBody = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
`;

// Form
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const Label = styled.label`
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  color: ${theme.colors.text.secondary};
`;

export const ErrorMessage = styled.span`
  color: ${theme.colors.error};
  font-size: ${theme.fontSizes.xs};
`;

// Grid
export const Grid = styled.div<{ columns?: number; gap?: string }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
  gap: ${props => props.gap || theme.spacing.lg};
`;

// Flex
export const Flex = styled.div<{ gap?: string; align?: string; justify?: string }>`
  display: flex;
  gap: ${props => props.gap || theme.spacing.md};
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'flex-start'};
`;
