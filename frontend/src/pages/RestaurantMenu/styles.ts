import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const StyledContainer = styled.div`
  padding: 0;
`;

export const StyledRestaurantHeader = styled.div`
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.xl};
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};

  h1 {
    font-size: ${theme.fontSizes['2xl']};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing.sm};
    font-weight: 600;
  }

  p {
    font-size: ${theme.fontSizes.md};
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing.xs};
  }
`;

export const StyledContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: ${theme.spacing.xl};

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledMenuSection = styled.div``;

export const StyledSectionTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xl};
  font-weight: 600;
`;

export const StyledMenuGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.lg};
`;

export const StyledMenuItem = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
  overflow: hidden;
  display: flex;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  transition: all ${theme.transitions.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.glow};
    border-color: ${theme.colors.primary};
  }
`;

export const StyledItemImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.md};
`;

export const StyledItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const StyledItemName = styled.h3`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
  font-weight: 600;
`;

export const StyledItemDescription = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  margin-bottom: auto;
  line-height: 1.6;
`;

export const StyledItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.spacing.md};
`;

export const StyledItemPrice = styled.div`
  font-size: ${theme.fontSizes.xl};
  font-weight: 600;
  color: ${theme.colors.primary};
`;

export const StyledAddButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background: ${theme.colors.primary};
  color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all ${theme.transitions.normal};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

export const StyledCartSection = styled.div`
  background: ${theme.colors.surface};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
  height: fit-content;
  position: sticky;
  top: 90px;
`;

export const StyledCartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

export const StyledCartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.border};
`;

export const StyledCartItemName = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.primary};
  flex: 1;
`;

export const StyledCartItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

export const StyledQuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: ${theme.borderRadius.sm};
  background: ${theme.colors.background};
  color: ${theme.colors.text.primary};
  font-size: ${theme.fontSizes.md};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.colors.border};
  cursor: pointer;
  transition: all ${theme.transitions.normal};

  &:hover {
    background: ${theme.colors.surface};
    border-color: ${theme.colors.primary};
  }
`;

export const StyledQuantity = styled.div`
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  min-width: 24px;
  text-align: center;
`;

export const StyledCartItemPrice = styled.div`
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.primary};
  min-width: 60px;
  text-align: right;
`;

export const StyledTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.md} 0;
  border-top: 2px solid ${theme.colors.border};
  margin-bottom: ${theme.spacing.lg};

  span:last-child {
    color: ${theme.colors.primary};
  }
`;

export const StyledCheckoutButton = styled.button`
  width: 100%;
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
    box-shadow: ${theme.shadows.glow};
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