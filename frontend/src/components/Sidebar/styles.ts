import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { theme } from '../../styles/theme';

export const SidebarContainer = styled.aside`
  width: 280px;
  height: 100vh;
  background: ${theme.colors.surface};
  border-right: 1px solid ${theme.colors.border};
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
`;

export const LogoSection = styled.div`
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.border};
`;

export const LogoIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  box-shadow: ${theme.shadows.glow};
`;

export const LogoText = styled.h1`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  text-align: center;
`;

export const Nav = styled.nav`
  flex: 1;
  padding: ${theme.spacing.lg} 0;
  overflow-y: auto;
`;

export const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.md};
  transition: all ${theme.transitions.fast};
  border-left: 3px solid transparent;

  &:hover {
    background: ${theme.colors.surfaceHover};
    color: ${theme.colors.text.primary};
  }

  &.active {
    background: ${theme.colors.surfaceHover};
    color: ${theme.colors.primary};
    border-left-color: ${theme.colors.primary};
  }

  span {
    font-size: 1.25rem;
  }
`;

export const UserSection = styled.div`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${theme.fontSizes.sm};
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const UserName = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.primary};
  font-weight: 500;
`;

export const UserRole = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.text.tertiary};
`;

export const LogoutButton = styled.button`
  padding: ${theme.spacing.sm};
  background: transparent;
  color: ${theme.colors.text.secondary};
  border-radius: ${theme.borderRadius.sm};
  transition: all ${theme.transitions.fast};
  font-size: 1.25rem;

  &:hover {
    background: ${theme.colors.surfaceHover};
    color: ${theme.colors.error};
  }
`;

export const LogoutModal = styled.div`
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
`;

export const ModalContent = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  width: 90%;
  max-width: 400px;
  border: 1px solid ${theme.colors.border};
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

export const ModalIcon = styled.span`
  font-size: 1.5rem;
`;

export const ModalTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text.primary};
  flex: 1;
`;

export const CloseButton = styled.button`
  background: transparent;
  color: ${theme.colors.text.secondary};
  padding: ${theme.spacing.sm};
  font-size: 1.25rem;

  &:hover {
    color: ${theme.colors.text.primary};
  }
`;

export const ModalText = styled.p`
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xl};
  font-size: ${theme.fontSizes.md};
`;

export const ModalActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
`;

export const CancelButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${theme.colors.surfaceHover};
  color: ${theme.colors.text.primary};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.border};
  }
`;

export const ConfirmButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.glow};
  }
`;
