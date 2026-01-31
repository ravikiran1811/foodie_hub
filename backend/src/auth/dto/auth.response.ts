import { User } from '../../entities/user.entity';

export class AuthResponse {
  accessToken: string;
  user: User;
}

export class PermissionNode {
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

export class PermissionsResponse {
  ORDERS?: PermissionNode;
  PAYMENTS?: PermissionNode;
  RESTAURANTS?: PermissionNode;
  USERS?: PermissionNode;
  DASHBOARD?: PermissionNode;
}

export class AccessNode {
  iWork: PermissionsResponse;
}

export class UserPermissionsResponse {
  access: AccessNode;
}
