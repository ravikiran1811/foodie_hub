import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${theme.colors.background};
`;

export const MainContent = styled.main`
  margin-left: 280px;
  flex: 1;
  padding: ${theme.spacing.xl};
  min-height: 100vh;
`;
