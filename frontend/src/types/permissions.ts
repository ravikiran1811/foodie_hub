// Permission Keys
export enum ScopeKey {
  IWORK = 'iWork',
}

export enum CategoryKey {
  ORDERS = 'ORDERS',
  PAYMENTS = 'PAYMENTS',
  RESTAURANTS = 'RESTAURANTS',
  USERS = 'USERS',
  DASHBOARD = 'DASHBOARD',
}

export enum ActionKey {
  READ_001 = 'READ_001',
  WRITE_001 = 'WRITE_001',
  UPDATE_001 = 'UPDATE_001',
  DELETE_001 = 'DELETE_001',
  IMPORT_001 = 'IMPORT_001',
  EXPORT_001 = 'EXPORT_001',
  APPROVE_001 = 'APPROVE_001',
  REJECT_001 = 'REJECT_001',
  VIEW_ALL_ORDERS_001 ='VIEW_ALL_ORDERS_001'
}

export enum FeatureKey {
  // Restaurants
  VIEW_RESTAURANTS = 'VIEW_RESTAURANTS',
  VIEW_RESTAURANT_MENU = 'VIEW_RESTAURANT_MENU',
  MANAGE_RESTAURANTS = 'MANAGE_RESTAURANTS',

  // Orders
  CREATE_ORDER = 'CREATE_ORDER',
  VIEW_ORDERS = 'VIEW_ORDERS',
  VIEW_ALL_ORDERS = 'VIEW_ALL_ORDERS',
  UPDATE_ORDER = 'UPDATE_ORDER',
  CANCEL_ORDER = 'CANCEL_ORDER',

  // Payments
  ADD_PAYMENT_METHOD = 'ADD_PAYMENT_METHOD',
  VIEW_PAYMENT_METHODS = 'VIEW_PAYMENT_METHODS',
  CHECKOUT = 'CHECKOUT',

  // Dashboard
  VIEW_DASHBOARD = 'VIEW_DASHBOARD',

  // Admin Features
  MANAGE_PERMISSIONS = 'MANAGE_PERMISSIONS',
  MANAGE_MENU_ITEMS = 'MANAGE_MENU_ITEMS',
  MANAGE_API = 'MANAGE_API',
}

// Permission Mapping Configuration
export interface PermissionConfig {
  scope: ScopeKey;
  category: CategoryKey;
  action: ActionKey;
}

export const featurePermissionMap: Record<FeatureKey, PermissionConfig> = {
  // Restaurants
  [FeatureKey.VIEW_RESTAURANTS]: {
    scope: ScopeKey.IWORK,
    category: CategoryKey.RESTAURANTS,
    action: ActionKey.READ_001,
  },
  [FeatureKey.VIEW_RESTAURANT_MENU]: {
    scope: ScopeKey.IWORK,
    category: CategoryKey.RESTAURANTS,
    action: ActionKey.READ_001,
  },
  [FeatureKey.MANAGE_RESTAURANTS]: {
    scope: ScopeKey.IWORK,
    category: CategoryKey.RESTAURANTS,
    action: ActionKey.WRITE_001,
  },

  // Orders
  [FeatureKey.CREATE_ORDER]: {
    scope: ScopeKey.IWORK,
    category: CategoryKey.ORDERS,
    action: ActionKey.WRITE_001,
  },
  [FeatureKey.VIEW_ORDERS]: {
    scope: ScopeKey.IWORK,
    category: CategoryKey.ORDERS,
    action: ActionKey.READ_001,
  },
  [FeatureKey.VIEW_ALL_ORDERS]: {
    scope: ScopeKey.IWORK,
    category: CategoryKey.ORDERS,
    action: ActionKey.VIEW_ALL_ORDERS_001,
  },
  [FeatureKey.UPDATE_ORDER]: {
    scope: ScopeKey.IWORK,
    category: CategoryKey.ORDERS,
    action: ActionKey.UPDATE_001,
  },
  [FeatureKey.CANCEL_ORDER]: {
    scope: ScopeKey.IWORK,
    category: CategoryKey.ORDERS,
    action: ActionKey.DELETE_001,
  },

  // Payments
  [FeatureKey.ADD_PAYMENT_METHOD]: {
    scope: ScopeKey.IWORK,
    category: CategoryKey.PAYMENTS,
    action: ActionKey.WRITE_001,
  },
  [FeatureKey.VIEW_PAYMENT_METHODS]: {
    scope: ScopeKey.IWORK,
    category: CategoryKey.PAYMENTS,
    action: ActionKey.READ_001,
  },
  [FeatureKey.CHECKOUT]: {
    scope: ScopeKey.IWORK,
    category: CategoryKey.PAYMENTS,
    action: ActionKey.WRITE_001,
  },

  // Dashboard
  [FeatureKey.VIEW_DASHBOARD]: {
    scope: ScopeKey.IWORK,
    category: CategoryKey.DASHBOARD,
    action: ActionKey.READ_001,
  },

  // Admin Features
  [FeatureKey.MANAGE_PERMISSIONS]: {
    scope: ScopeKey.IWORK,
    category: CategoryKey.USERS,
    action: ActionKey.WRITE_001,
  },
  [FeatureKey.MANAGE_MENU_ITEMS]: {
    scope: ScopeKey.IWORK,
    category: CategoryKey.RESTAURANTS,
    action: ActionKey.UPDATE_001,
  },
  [FeatureKey.MANAGE_API]: {
    scope: ScopeKey.IWORK,
    category: CategoryKey.USERS,
    action: ActionKey.UPDATE_001,
  },
};

// Permission Response Types
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

export type PermissionsResponse = Partial<Record<CategoryKey, PermissionNode>>;

export interface AccessNode {
  iWork: PermissionsResponse;
}

export interface UserPermissionsResponse {
  access: AccessNode;
}
