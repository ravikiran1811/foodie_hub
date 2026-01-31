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
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${theme.spacing.xl};
`;

export const StyledCard = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
  transition: all ${theme.transitions.normal};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.glow};
    border-color: ${theme.colors.primary};
  }
`;

export const StyledImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: ${theme.colors.background};
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${theme.transitions.slow};

  ${StyledCard}:hover & {
    transform: scale(1.1);
  }
`;

export const StyledCardContent = styled.div`
  padding: ${theme.spacing.xl};
`;

export const StyledRestaurantName = styled.h3`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.primary};
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
`;

export const StyledDescription = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.md};
  line-height: 1.6;
`;

export const StyledAddress = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.tertiary};
  margin-bottom: ${theme.spacing.xs};
`;

export const StyledCountry = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.primary};
  font-weight: 500;
`;

export const StyledLoading = styled.div`
  text-align: center;
  padding: ${theme.spacing['3xl']};
  font-size: ${theme.fontSizes.lg};
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
