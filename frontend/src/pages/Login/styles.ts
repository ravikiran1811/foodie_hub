import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background};
  padding: 20px;
`;

export const StyledFormCard = styled.div`
  background: ${theme.colors.surface};
  padding: 60px 40px;
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoIcon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  margin-bottom: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.glow};
`;

export const StyledTitle = styled.h1`
  font-size: ${theme.fontSizes['2xl']};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.text.primary};
  text-align: center;
  font-weight: 600;
`;

export const StyledSubtitle = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  width: 100%;
`;

export const StyledFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const StyledLabel = styled.label`
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  color: ${theme.colors.text.secondary};
`;

export const StyledInput = styled.input`
  padding: 14px 16px;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text.primary};
  font-size: ${theme.fontSizes.md};
  transition: all ${theme.transitions.fast};

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.text.tertiary};
  }
`;

export const StyledButton = styled.button`
  padding: 14px;
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  font-size: ${theme.fontSizes.md};
  font-weight: 600;
  border-radius: ${theme.borderRadius.md};
  transition: all ${theme.transitions.normal};
  margin-top: ${theme.spacing.sm};
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
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const StyledErrorMessage = styled.div`
  padding: 12px;
  background: rgba(244, 67, 54, 0.1);
  color: ${theme.colors.error};
  border: 1px solid ${theme.colors.error};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  text-align: center;
`;

export const StyledForgotPassword = styled.div`
  text-align: center;
  margin-top: ${theme.spacing.md};
  
  a {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.fontSizes.sm};
    transition: color ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.primary};
    }
  }
`;

export const StyledTestCredentials = styled.div`
  margin-top: ${theme.spacing.xl};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.xs};
  width: 100%;
`;

export const StyledCredentialsTitle = styled.div`
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.sm};
`;

export const StyledCredentialItem = styled.div`
  color: ${theme.colors.text.tertiary};
  margin: ${theme.spacing.xs} 0;
  font-size: ${theme.fontSizes.xs};
`;

export const StyledFooter = styled.div`
  margin-top: ${theme.spacing.lg};
  text-align: center;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.sm};
  
  a {
    color: ${theme.colors.primary};
    font-weight: 500;
    transition: color ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.primaryDark};
    }
  }
`;
