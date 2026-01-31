import styled from 'styled-components';

export const StyledNav = styled.nav`
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;

export const StyledLogo = styled.div`
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  color: #667eea;
`;

export const StyledMenu = styled.div`
  display: flex;
  gap: 32px;
  flex: 1;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledMenuItem = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #667eea;
  }
`;

export const StyledUserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StyledUserInfo = styled.div`
  text-align: right;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledUserName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const StyledUserEmail = styled.div`
  font-size: 12px;
  color: #666;
`;

export const StyledLogoutButton = styled.button`
  padding: 8px 16px;
  background: #667eea;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background: #5568d3;
  }
`;
