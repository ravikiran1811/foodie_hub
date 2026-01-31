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
  padding: ${theme.spacing.lg};
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

export const HeaderIcon = styled.span`
  font-size: 1.75rem;
`;

export const StyledTitle = styled.h1`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.text.primary};
  font-weight: 600;
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

export const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: all ${theme.transitions.fast};
  cursor: pointer;

  &:hover {
    background: ${theme.colors.surfaceHover};
    border-color: ${theme.colors.primary};
  }
`;

export const ProfileWrapper = styled.div`
  position: relative;
`;

export const ProfileDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.lg};
  min-width: 180px;
  z-index: 1000;
  overflow: hidden;
`;

export const DropdownItem = styled.button`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  text-align: left;
  background: transparent;
  border: none;
  color: ${theme.colors.text.primary};
  font-size: ${theme.fontSizes.sm};
  cursor: pointer;
  transition: background ${theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.background};
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

export const StatCard = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  transition: all ${theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.glow};
    border-color: ${theme.colors.primary};
  }
`;

export const StatLabel = styled.div`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.sm};
  font-weight: 500;
`;

export const StatValue = styled.div`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes['4xl']};
  font-weight: 700;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const Section = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg};
`;

export const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.primary};
  font-weight: 600;
  margin: 0;
`;

export const ViewAllButton = styled.button`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.sm};
  background: transparent;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  transition: all ${theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  &:hover {
    background: ${theme.colors.background};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  border-bottom: 1px solid ${theme.colors.border};
`;

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

export const StatusBadge = styled.span<{ status: string }>`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  background: ${props => {
    switch (props.status.toLowerCase()) {
      case 'active':
        return `${theme.colors.status.active}20`;
      case 'pending':
        return `${theme.colors.status.pending}20`;
      case 'delivered':
        return `${theme.colors.status.delivered}20`;
      default:
        return `${theme.colors.text.tertiary}20`;
    }
  }};
  color: ${props => {
    switch (props.status.toLowerCase()) {
      case 'active':
        return theme.colors.status.active;
      case 'pending':
        return theme.colors.status.pending;
      case 'delivered':
        return theme.colors.status.delivered;
      default:
        return theme.colors.text.tertiary;
    }
  }};
`;

export const ChartSection = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  grid-column: 1 / -1;
`;
