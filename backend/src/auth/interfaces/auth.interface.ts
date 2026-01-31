export interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    name: string;
    email: string;
    roleId: number;
    country: string;
  };
}

export interface PermissionNode {
  parent: string;
  READ_001?: boolean;
  WRITE_001?: boolean;
  UPDATE_001?: boolean;
  DELETE_001?: boolean;
  IMPORT_001?: boolean;
  EXPORT_001?: boolean;
  APPROVE_001?: boolean;
  REJECT_001?: boolean;
}

export interface PermissionsResponse {
  ORDERS?: PermissionNode;
  PAYMENTS?: PermissionNode;
  RESTAURANTS?: PermissionNode;
  USERS?: PermissionNode;
  DASHBOARD?: PermissionNode;
}

export interface AccessNode {
  iWork: PermissionsResponse;
}

export interface UserPermissionsResponse {
  access: AccessNode;
}
