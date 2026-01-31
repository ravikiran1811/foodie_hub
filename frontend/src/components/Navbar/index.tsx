import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout, selectUser } from '../../store/slices/authSlice';
import {
  StyledNav,
  StyledContainer,
  StyledLogo,
  StyledMenu,
  StyledMenuItem,
  StyledUserSection,
  StyledUserInfo,
  StyledUserName,
  StyledUserEmail,
  StyledLogoutButton,
} from './styles';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <StyledNav>
      <StyledContainer>
        <StyledLogo onClick={() => navigate('/')}>🍔 Food ACL</StyledLogo>
        <StyledMenu>
          <StyledMenuItem onClick={() => navigate('/')}>Dashboard</StyledMenuItem>
          <StyledMenuItem onClick={() => navigate('/restaurants')}>Restaurants</StyledMenuItem>
          <StyledMenuItem onClick={() => navigate('/orders')}>Orders</StyledMenuItem>
          <StyledMenuItem onClick={() => navigate('/payments')}>Payments</StyledMenuItem>
        </StyledMenu>
        <StyledUserSection>
          <StyledUserInfo>
            <StyledUserName>{user?.name}</StyledUserName>
            <StyledUserEmail>{user?.email}</StyledUserEmail>
          </StyledUserInfo>
          <StyledLogoutButton onClick={handleLogout}>Logout</StyledLogoutButton>
        </StyledUserSection>
      </StyledContainer>
    </StyledNav>
  );
};

export default Navbar;
