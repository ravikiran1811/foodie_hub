import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import api from '../../services/api';
import { useAppDispatch } from '../../store/hooks';
import { fetchPermissions } from '../../store/slices/permissionsSlice';
import { Spinner } from '../../components/Spinner';
import { useNotification } from '../../components/Notification';
import {
  StyledContainer,
  StyledHeader,
  StyledTitle,
  StyledSubtitle,
  StyledGrid,
  RoleCard,
  RoleHeader,
  RoleName,
  RoleBadge,
  PermissionsSection,
  PermissionCategory,
  ActionGrid,
  ActionBadge,
  SaveButton,
} from './styles';

interface Role {
  id: number;
  name: string;
}

interface CategoryAction {
  id: number;
  name?: string;
  actionKey?: string;
}

interface PermissionData {
  role: Role;
  permissions: Record<string, Record<string, boolean>>;
  categories: CategoryAction[];
  actions: CategoryAction[];
}

const PermissionsManagement = () => {
  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useNotification();
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [permissionData, setPermissionData] = useState<PermissionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modifiedPermissions, setModifiedPermissions] = useState<Record<string, Record<string, boolean>>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    if (selectedRole) {
      fetchRolePermissions(selectedRole.id);
    }
  }, [selectedRole]);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/permissions/roles');
      setRoles(response.data);
      if (response.data.length > 0) {
        setSelectedRole(response.data[0]);
      }
    } catch (error: any) {
      console.error('Error fetching roles:', error);
      setError(error.response?.data?.message || 'Failed to fetch roles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRolePermissions = async (roleId: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/permissions/role/${roleId}`);
      setPermissionData(response.data);
      setModifiedPermissions(response.data.permissions);
    } catch (error: any) {
      console.error('Error fetching role permissions:', error);
      setError(error.response?.data?.message || 'Failed to fetch permissions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionToggle = (category: string, action: string) => {
    setModifiedPermissions((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [action]: !prev[category]?.[action],
      },
    }));
  };

  const handleCategoryToggle = (category: string) => {
    const categoryActions = modifiedPermissions[category];
    if (!categoryActions) return;

    // Check if all actions are currently enabled
    const allEnabled = Object.values(categoryActions).every((enabled) => enabled);

    // Toggle all actions to opposite state
    const updatedActions: Record<string, boolean> = {};
    Object.keys(categoryActions).forEach((action) => {
      updatedActions[action] = !allEnabled;
    });

    setModifiedPermissions((prev) => ({
      ...prev,
      [category]: updatedActions,
    }));
  };

  const isCategoryFullyChecked = (category: string): boolean => {
    const categoryActions = modifiedPermissions[category];
    if (!categoryActions) return false;
    return Object.values(categoryActions).every((enabled) => enabled);
  };

  const isCategoryPartiallyChecked = (category: string): boolean => {
    const categoryActions = modifiedPermissions[category];
    if (!categoryActions) return false;
    const enabledCount = Object.values(categoryActions).filter((enabled) => enabled).length;
    return enabledCount > 0 && enabledCount < Object.keys(categoryActions).length;
  };

  const handleSaveChanges = async () => {
    if (!selectedRole || !permissionData) return;

    try {
      setSaving(true);

      // Build permissions array from modified permissions
      const permissions: { categoryId: number; actionId: number }[] = [];

      Object.entries(modifiedPermissions).forEach(([categoryName, actions]) => {
        const category = permissionData.categories.find((c) => c.name === categoryName);
        if (category) {
          Object.entries(actions).forEach(([actionKey, enabled]) => {
            if (enabled) {
              const action = permissionData.actions.find((a) => a.actionKey === actionKey);
              if (action) {
                permissions.push({
                  categoryId: category.id,
                  actionId: action.id,
                });
              }
            }
          });
        }
      });

      await api.put(`/permissions/role/${selectedRole.id}`, { permissions });

      showSuccess('Permissions updated successfully!');
      
      // Refresh permissions for this role
      await fetchRolePermissions(selectedRole.id);
      
      // Update global permissions state if current user's role was modified
      await dispatch(fetchPermissions());
    } catch (error) {
      console.error('Error saving permissions:', error);
      showError('Failed to save permissions. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getRoleBadge = (roleName: string) => {
    const badges: Record<string, string> = {
      Admin: 'All',
      Manager: 'Limited',
      Staff: 'Basic',
      Customer: 'View Only',
    };
    return badges[roleName] || 'Custom';
  };

  if (loading && !permissionData) {
    return (
      <Layout>
        <StyledContainer>
          <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>
            Loading permissions...
          </div>
        </StyledContainer>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <StyledContainer>
          <div style={{ 
            textAlign: 'center', 
            padding: '60px', 
            color: '#D4AF37',
            background: '#1A1A1A',
            borderRadius: '12px',
            border: '1px solid #252525'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <div style={{ fontSize: '18px', marginBottom: '8px' }}>{error}</div>
            <button
              onClick={() => fetchRoles()}
              style={{
                marginTop: '20px',
                padding: '12px 24px',
                background: '#D4AF37',
                color: '#0A0A0A',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Retry
            </button>
          </div>
        </StyledContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <StyledContainer>
        <StyledHeader>
          <div>
            <StyledTitle>🔐 Permissions Management</StyledTitle>
            <StyledSubtitle>Configure role-based access control</StyledSubtitle>
          </div>
          <SaveButton onClick={handleSaveChanges} disabled={saving}>
            {saving ? (
              <><Spinner /> Saving...</>
            ) : (
              '💾 Save Changes'
            )}
          </SaveButton>
        </StyledHeader>

        <StyledGrid>
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              active={selectedRole?.id === role.id}
              onClick={() => setSelectedRole(role)}
            >
              <RoleHeader>
                <RoleName>{role.name}</RoleName>
                <RoleBadge>{getRoleBadge(role.name)}</RoleBadge>
              </RoleHeader>
            </RoleCard>
          ))}
        </StyledGrid>

        {permissionData && modifiedPermissions && (
          <PermissionsSection>
            {Object.entries(modifiedPermissions).map(([category, actions]) => (
              <div key={category}>
                <PermissionCategory>
                  <input
                    type="checkbox"
                    checked={isCategoryFullyChecked(category)}
                    ref={(el) => {
                      if (el) {
                        el.indeterminate = isCategoryPartiallyChecked(category);
                      }
                    }}
                    onChange={() => handleCategoryToggle(category)}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      marginRight: '12px',
                    }}
                  />
                  {category}
                </PermissionCategory>
                <ActionGrid>
                  {Object.entries(actions).map(([action, enabled]) => (
                    <ActionBadge
                      key={action}
                      active={enabled}
                      onClick={() => handlePermissionToggle(category, action)}
                    >
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => {
                          e.stopPropagation();
                          handlePermissionToggle(category, action);
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span>{action.replace('_001', '')}</span>
                    </ActionBadge>
                  ))}
                </ActionGrid>
              </div>
            ))}
          </PermissionsSection>
        )}
      </StyledContainer>
    </Layout>
  );
};

export default PermissionsManagement;
