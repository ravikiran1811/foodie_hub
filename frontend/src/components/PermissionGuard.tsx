import { useAppSelector } from '../store/hooks';
import { selectHasPermission } from '../store/slices/permissionsSlice';
import { FeatureKey } from '../types/permissions';
import { Navigate } from 'react-router-dom';

interface PermissionGuardProps {
  feature: FeatureKey;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

/**
 * Permission Guard Component
 * Wraps components that require specific permissions
 * Can either hide, show fallback, or redirect based on permission
 */
export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  feature,
  children,
  fallback = null,
  redirectTo,
}) => {
  const hasPermission = useAppSelector(selectHasPermission(feature));

  if (!hasPermission) {
    if (redirectTo) {
      return <Navigate to={redirectTo} replace />;
    }
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

interface UsePermissionResult {
  hasPermission: boolean;
  PermissionGuard: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }>;
}

/**
 * Custom hook for permission checking
 * Use this in components for conditional rendering
 */
export const usePermission = (feature: FeatureKey): UsePermissionResult => {
  const hasPermission = useAppSelector(selectHasPermission(feature));

  const Guard: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({
    children,
    fallback = null,
  }) => {
    return hasPermission ? <>{children}</> : <>{fallback}</>;
  };

  return {
    hasPermission,
    PermissionGuard: Guard,
  };
};
