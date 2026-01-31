import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledContainer = styled.div`
  padding: 0;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.xl};
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
`;

export const StyledHeaderContent = styled.div`
  flex: 1;
`;

export const StyledTitle = styled.h1`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.text.primary};
  font-weight: 600;
  margin: 0 0 ${theme.spacing.sm} 0;
`;

export const StyledSubtitle = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

export const StyledAddButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.md};
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all ${theme.transitions.normal};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.glow};
  }
`;

export const StyledFormCard = styled.div`
  background: ${theme.colors.surface};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
  margin-bottom: ${theme.spacing.xl};
`;

export const StyledFormTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xl};
  font-weight: 600;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

export const StyledFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const StyledLabel = styled.label`
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

export const StyledInput = styled.input`
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  background: ${theme.colors.background};
  color: ${theme.colors.text.primary};
  transition: all ${theme.transitions.normal};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primary}33;
  }

  &::placeholder {
    color: ${theme.colors.text.tertiary};
  }
`;

export const StyledSelect = styled.select`
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  background: ${theme.colors.background};
  color: ${theme.colors.text.primary};
  cursor: pointer;
  transition: all ${theme.transitions.normal};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primary}33;
  }
`;

export const StyledSubmitButton = styled.button`
  padding: ${theme.spacing.md};
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.md};
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  &:hover:not(:disabled) {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.glow};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StyledPaymentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
`;

export const StyledPaymentCard = styled.div`
  background: ${theme.colors.surface};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${theme.spacing.md};
  transition: all ${theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.glow};
    border-color: ${theme.colors.primary};
  }
`;

export const StyledCardIcon = styled.div`
  font-size: 3rem;
`;

export const StyledCardInfo = styled.div`
  flex: 1;
`;

export const StyledCardLabel = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`;

export const StyledCardType = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
  text-transform: capitalize;
`;

export const StyledCardNumber = styled.div`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.text.secondary};
  font-family: monospace;
`;

export const StyledDeleteButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background: ${theme.colors.error};
  color: white;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  &:hover:not(:disabled) {
    background: #d32f2f;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StyledLoading = styled.div`
  text-align: center;
  padding: ${theme.spacing['3xl']};
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text.secondary};
`;

export const StyledEmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing['3xl']};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
`;

export const StyledEmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${theme.spacing.md};
`;

export const StyledEmptyText = styled.div`
  font-size: ${theme.fontSizes.xl};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`;

export const StyledEmptySubtext = styled.div`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.text.secondary};
`;

export const StyledNoAccess = styled.div`
  text-align: center;
  padding: ${theme.spacing['3xl']};
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.error};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.error};
  border-radius: ${theme.borderRadius.lg};
`;
