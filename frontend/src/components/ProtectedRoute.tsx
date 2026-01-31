import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectIsAuthenticated, selectUser, fetchCurrentUser } from '../store/slices/authSlice';
import { fetchPermissions } from '../store/slices/permissionsSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch user data if not available
      if (!user) {
        dispatch(fetchCurrentUser());
      }
      dispatch(fetchPermissions());
    }
  }, [isAuthenticated, user, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
