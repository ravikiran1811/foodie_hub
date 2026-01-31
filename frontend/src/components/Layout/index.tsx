import { ReactNode } from 'react';
import Sidebar from '../Sidebar';
import { LayoutContainer, MainContent } from './styles';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};

export default Layout;
