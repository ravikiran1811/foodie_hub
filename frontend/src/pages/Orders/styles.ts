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

export const StyledOrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

export const StyledOrderCard = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.md};
  }
`;

export const StyledOrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border};
`;

export const StyledOrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

export const StyledOrderId = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  color: ${theme.colors.primary};
`;

export const StyledOrderDate = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.tertiary};
`;

export const StyledOrderStatus = styled.span<{ status: string }>`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  background: ${props => {
    const status = props.status.toLowerCase();
    if (status.includes('delivered')) return `${theme.colors.success}20`;
    if (status.includes('pending')) return `${theme.colors.warning}20`;
    if (status.includes('cancelled')) return `${theme.colors.error}20`;
    return `${theme.colors.info}20`;
  }};
  color: ${props => {
    const status = props.status.toLowerCase();
    if (status.includes('delivered')) return theme.colors.success;
    if (status.includes('pending')) return theme.colors.warning;
    if (status.includes('cancelled')) return theme.colors.error;
    return theme.colors.info;
  }};
`;

export const StyledRestaurantInfo = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

export const StyledRestaurantName = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`;

export const StyledRestaurantAddress = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.tertiary};
`;

export const StyledOrderItems = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

export const StyledOrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid ${theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const StyledItemName = styled.div`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.text.primary};
  flex: 1;
`;

export const StyledItemPrice = styled.div`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.primary};
  font-weight: 600;
`;

export const StyledOrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border};
`;

export const StyledTotalAmount = styled.div`
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  color: ${theme.colors.primary};
`;

export const StyledCancelButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${theme.colors.error};
  color: white;
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  border-radius: ${theme.borderRadius.md};
  transition: all ${theme.transitions.fast};
  display: flex;
  align-items: center;
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
  margin-bottom: ${theme.spacing.lg};
`;

export const StyledEmptyText = styled.div`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.primary};
  font-weight: 600;
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
