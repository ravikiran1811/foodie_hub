import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout, selectUser } from '../../store/slices/authSlice';
import { usePermission } from '../PermissionGuard';
import { FeatureKey } from '../../types/permissions';
import {
  SidebarContainer,
  LogoSection,
  LogoIcon,
  LogoText,
  Nav,
  NavItem,
  UserSection,
  UserInfo,
  UserAvatar,
  UserDetails,
  UserName,
  UserRole,
  LogoutButton,
  LogoutModal,
  ModalContent,
  ModalHeader,
  ModalIcon,
  ModalTitle,
  CloseButton,
  ModalText,
  ModalActions,
  CancelButton,
  ConfirmButton,
} from './styles';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Permission checks
  const { hasPermission: canManageRestaurants } = usePermission(FeatureKey.MANAGE_RESTAURANTS);
  const { hasPermission: canViewOrders } = usePermission(FeatureKey.VIEW_ORDERS);
  const { hasPermission: canManagePermissions } = usePermission(FeatureKey.MANAGE_PERMISSIONS);
  const { hasPermission: canManageAPI } = usePermission(FeatureKey.MANAGE_API);

  const handleLogout = () => {
    dispatch(logout());
    setShowLogoutModal(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <SidebarContainer>
        <LogoSection>
          <LogoIcon>
            <img src="https://mir-s3-cdn-cf.behance.net/projects/404/42b7e5119707637.Y3JvcCwxMzgwLDEwODAsMjcwLDA.jpg" alt="FoodieHub Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          </LogoIcon>
          <LogoText>FoodieHub</LogoText>
        </LogoSection>

        <Nav>
          <NavItem to="/dashboard">
            <span>📊</span>
            Dashboard
          </NavItem>
          <NavItem to="/restaurants">
            <span>🏪</span>
            {canManageRestaurants ? 'Manage Restaurants' : 'Restaurants'}
          </NavItem>
          {canViewOrders && (
            <NavItem to="/orders">
              <span>📦</span>
              Orders Management
            </NavItem>
          )}
          {canManagePermissions && (
            <NavItem to="/permissions">
              <span>🔐</span>
              Permissions Management
            </NavItem>
           )} 
          {canManageAPI && (
            <NavItem to="/api-management">
              <span>🔌</span>
              API Management
            </NavItem>
          )}
        </Nav>

        <UserSection>
          <UserInfo>
            <UserAvatar>{user?.name ? getInitials(user.name) : '??'}</UserAvatar>
            <UserDetails>
              <UserName>{user?.name || 'User'}</UserName>
              <UserRole>{user?.roleId === 1 ? 'Admin' : user?.roleId === 2 ? 'Manager' : 'Customer'}</UserRole>
            </UserDetails>
          </UserInfo>
          <LogoutButton onClick={() => setShowLogoutModal(true)}>
            🚪
          </LogoutButton>
        </UserSection>
      </SidebarContainer>

      {showLogoutModal && (
        <LogoutModal onClick={() => setShowLogoutModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalIcon>🚪</ModalIcon>
              <ModalTitle>Logout</ModalTitle>
              <CloseButton onClick={() => setShowLogoutModal(false)}>✕</CloseButton>
            </ModalHeader>
            <ModalText>Are you sure you want to logout?</ModalText>
            <ModalActions>
              <CancelButton onClick={() => setShowLogoutModal(false)}>
                Cancel
              </CancelButton>
              <ConfirmButton onClick={handleLogout}>
                Logout
              </ConfirmButton>
            </ModalActions>
          </ModalContent>
        </LogoutModal>
      )}
    </>
  );
};

export default Sidebar;
