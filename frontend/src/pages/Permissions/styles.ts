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

export const StyledTitle = styled.h1`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.text.primary};
  font-weight: 600;
  margin: 0;
`;

export const StyledSubtitle = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.md};
  margin-top: ${theme.spacing.sm};
`;

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

export const RoleCard = styled.div<{ active: boolean }>`
  background: ${props => props.active ? theme.colors.background : theme.colors.surface};
  border: 2px solid ${props => props.active ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.md};
  }
`;

export const RoleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RoleName = styled.h3`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text.primary};
  font-weight: 600;
`;

export const RoleBadge = styled.span`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  background: ${theme.colors.primary}20;
  color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
`;

export const PermissionsSection = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

export const PermissionCategory = styled.h3`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.primary};
  font-weight: 600;
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  
  &:hover {
    color: ${theme.colors.primaryDark};
  }
`;

export const PermissionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const PermissionItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.md};
`;

export const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: ${theme.spacing.md};
`;

export const ActionBadge = styled.label<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${props => props.active ? `${theme.colors.primary}20` : theme.colors.background};
  border: 1px solid ${props => props.active ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  color: ${props => props.active ? theme.colors.primary : theme.colors.text.secondary};
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${props => props.active ? `${theme.colors.primary}30` : theme.colors.surface};
    transform: translateY(-2px);
  }

  input {
    cursor: pointer;
    margin: 0;
    width: 18px;
    height: 18px;
    accent-color: ${theme.colors.primary};
  }

  span {
    user-select: none;
  }
`;

export const SaveButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  font-size: ${theme.fontSizes.md};
  font-weight: 600;
  border-radius: ${theme.borderRadius.md};
  border: none;
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  display: flex;
  align-items: center;
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
