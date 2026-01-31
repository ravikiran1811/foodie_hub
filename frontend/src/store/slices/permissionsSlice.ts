import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { UserPermissionsResponse, FeatureKey, featurePermissionMap } from '../../types/permissions';
import api from '../../services/api';

interface PermissionsState {
  access: UserPermissionsResponse['access'] | null;
  loading: boolean;
  error: string | null;
}

const initialState: PermissionsState = {
  access: null,
  loading: false,
  error: null,
};

// Async thunk to fetch permissions
export const fetchPermissions = createAsyncThunk(
  'permissions/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<UserPermissionsResponse>('/auth/permissions');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch permissions');
    }
  }
);

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    clearPermissions: (state) => {
      state.access = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPermissions.fulfilled, (state, action: PayloadAction<UserPermissionsResponse>) => {
        state.loading = false;
        state.access = action.payload.access;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPermissions } = permissionsSlice.actions;

// Selectors
export const selectPermissions = (state: RootState) => state.permissions.access;
export const selectPermissionsLoading = (state: RootState) => state.permissions.loading;
export const selectPermissionsError = (state: RootState) => state.permissions.error;

/**
 * Core permission selector - Checks if user has permission for a specific feature
 * This is the primary permission check used throughout the application
 */
export const selectHasPermission = (feature: FeatureKey) => (state: RootState): boolean => {
  const perms = state.permissions.access;
  if (!perms) return false;

  const config = featurePermissionMap[feature];
  if (!config) return true; // If no config, allow by default

  // Navigate the permission structure: access -> scope -> category -> action
  const scopePermissions = perms[config.scope];
  if (!scopePermissions) return false;

  const categoryPermissions = scopePermissions[config.category];
  if (!categoryPermissions) return false;

  // Check if the specific action is allowed
  return Boolean(categoryPermissions[config.action]);
};

/**
 * Bulk permission check - Returns an object with permission status for multiple features
 */
export const selectBulkPermissions = (features: FeatureKey[]) => (state: RootState) => {
  return features.reduce((acc, feature) => {
    acc[feature] = selectHasPermission(feature)(state);
    return acc;
  }, {} as Record<FeatureKey, boolean>);
};

/**
 * Category permission check - Checks if user has any permission for a category
 */
export const selectHasCategoryAccess = (category: string) => (state: RootState): boolean => {
  const perms = state.permissions.access;
  if (!perms || !perms.iWork) return false;

  const categoryPerms = perms.iWork[category as keyof typeof perms.iWork];
  if (!categoryPerms) return false;

  // Check if any action is allowed
  const actions = Object.keys(categoryPerms).filter((key) => key !== 'parent');
  return actions.some((action) => categoryPerms[action as keyof typeof categoryPerms] === true);
};

export default permissionsSlice.reducer;
