# Food Ordering System - Frontend

Enterprise-grade React + TypeScript frontend with Redux-based ACL (Access Control List) permission system.

## 🚀 Technology Stack

- **React 18.2** - Modern React with hooks
- **TypeScript 5.3** - Type safety
- **Redux Toolkit 2.0** - State management
- **Styled Components 6.1** - CSS-in-JS styling
- **Vite 5.0** - Lightning-fast build tool
- **React Router 6.21** - Client-side routing
- **Axios 1.6** - HTTP client

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/           # Reusable components
│   │   ├── Navbar.tsx       # Navigation bar with user info
│   │   ├── PermissionGuard.tsx  # HOC for permission checking
│   │   └── ProtectedRoute.tsx   # Auth route wrapper
│   ├── pages/               # Page components
│   │   ├── Login.tsx        # Login page
│   │   ├── Register.tsx     # Registration page
│   │   ├── Dashboard.tsx    # User dashboard with permissions
│   │   ├── Restaurants.tsx  # Restaurant listing
│   │   ├── RestaurantMenu.tsx  # Menu with cart & checkout
│   │   ├── Orders.tsx       # Order history & management
│   │   └── PaymentMethods.tsx  # Payment method management
│   ├── services/            # API services
│   │   └── api.ts          # Axios instance with auth interceptor
│   ├── store/              # Redux store
│   │   ├── store.ts        # Store configuration
│   │   └── slices/
│   │       ├── authSlice.ts        # Authentication state
│   │       └── permissionsSlice.ts # Permissions & ACL state
│   ├── styles/             # Global styles
│   │   └── GlobalStyles.tsx
│   ├── types/              # TypeScript types
│   │   ├── api.ts          # API response types
│   │   └── permissions.ts  # Permission enums & mappings
│   ├── App.tsx             # Root component with routing
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── .env                    # Environment variables
├── vite.config.ts          # Vite configuration
└── package.json
```

## 🔧 Installation

```bash
# Install dependencies
npm install
```

## ⚙️ Configuration

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:3000/api
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
Application will be available at `http://localhost:5173`

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Authentication & Permissions

### Authentication Flow

1. **Login/Register** - User authenticates via `/auth/login` or `/auth/register`
2. **Token Storage** - JWT token stored in localStorage
3. **Auto-Inject** - Axios interceptor adds `Authorization: Bearer <token>` to all requests
4. **Permission Fetch** - On login, permissions are fetched and stored in Redux
5. **Permission Check** - Components use `usePermission` hook to check access

### Permission System Architecture

The app uses a **category + action** based permission model (NOT simple role check).

#### Permission Response Format
```typescript
{
  access: {
    iWork: {
      RESTAURANT: {
        VIEW_001: true,
        CREATE_002: false,
        UPDATE_003: false,
        DELETE_004: false
      },
      ORDER: {
        VIEW_005: true,
        CREATE_006: true,
        CANCEL_007: false
      }
      // ... more categories
    }
  }
}
```

#### Feature-Permission Mapping

Defined in `src/types/permissions.ts`:

```typescript
export enum FeatureKey {
  VIEW_RESTAURANTS = 'VIEW_RESTAURANTS',
  CREATE_ORDER = 'CREATE_ORDER',
  CANCEL_ORDER = 'CANCEL_ORDER',
  VIEW_ORDERS = 'VIEW_ORDERS',
  VIEW_PAYMENT_METHODS = 'VIEW_PAYMENT_METHODS',
  ADD_PAYMENT_METHOD = 'ADD_PAYMENT_METHOD',
}

export const featurePermissionMap: Record<FeatureKey, PermissionCheck> = {
  [FeatureKey.VIEW_RESTAURANTS]: { category: 'RESTAURANT', action: 'VIEW_001' },
  [FeatureKey.CREATE_ORDER]: { category: 'ORDER', action: 'CREATE_006' },
  [FeatureKey.CANCEL_ORDER]: { category: 'ORDER', action: 'CANCEL_007' },
  // ... more mappings
};
```

### Using Permissions in Components

#### 1. Hook-based Permission Check
```typescript
import { usePermission } from '../components/PermissionGuard';
import { FeatureKey } from '../types/permissions';

const MyComponent = () => {
  const { hasPermission: canCreateOrder } = usePermission(FeatureKey.CREATE_ORDER);

  return (
    <>
      {canCreateOrder && (
        <button onClick={handleOrder}>Place Order</button>
      )}
    </>
  );
};
```

#### 2. Component-level Guard
```typescript
import PermissionGuard from '../components/PermissionGuard';
import { FeatureKey } from '../types/permissions';

const MyPage = () => (
  <PermissionGuard feature={FeatureKey.VIEW_RESTAURANTS}>
    <RestaurantList />
  </PermissionGuard>
);
```

#### 3. Redux Selector
```typescript
import { useSelector } from 'react-redux';
import { selectHasPermission } from '../store/slices/permissionsSlice';
import { FeatureKey } from '../types/permissions';

const MyComponent = () => {
  const canCancel = useSelector((state) => 
    selectHasPermission(state, FeatureKey.CANCEL_ORDER)
  );
};
```

## 📄 Pages & Features

### 1. Login (`/login`)
- Email/password authentication
- Redirects to dashboard on success
- Auto-fetches user permissions

### 2. Register (`/register`)
- User registration with role selection (ADMIN, MANAGER, MEMBER)
- Optional country field
- Auto-login after registration

### 3. Dashboard (`/`)
- **Protected Route** - Requires authentication
- Shows welcome message with user info
- Displays all permissions grouped by category
- Quick navigation to features

### 4. Restaurants (`/restaurants`)
- **Permission Required**: `VIEW_RESTAURANTS` (RESTAURANT:VIEW_001)
- Grid layout with restaurant cards
- Shows restaurant image, name, description, address
- Click to view menu

### 5. Restaurant Menu (`/restaurants/:id`)
- **Permission Required**: `VIEW_RESTAURANTS`
- Displays all menu items with images, prices, categories
- **Add to Cart** - Permission: `CREATE_ORDER` (ORDER:CREATE_006)
- Shopping cart with quantity controls
- **Checkout** - Calls `/orders` API with order items
- Shows unavailable items as disabled

### 6. Orders (`/orders`)
- **Permission Required**: `VIEW_ORDERS` (ORDER:VIEW_005)
- Lists all user orders with status badges
- Shows restaurant info, order items, total amount
- **Cancel Order** button - Permission: `CANCEL_ORDER` (ORDER:CANCEL_007)
  - Only visible to ADMIN/MANAGER
  - Only for orders not DELIVERED/CANCELLED
- Status colors: PENDING (yellow), CONFIRMED/PREPARING (blue), READY/DELIVERED (green), CANCELLED (red)

### 7. Payment Methods (`/payments`)
- **Permission Required**: `VIEW_PAYMENT_METHODS` (PAYMENT:VIEW_009)
- Lists all saved payment methods
- Shows card type icon, label, last 4 digits
- **Add Payment Method** - Permission: `ADD_PAYMENT_METHOD` (PAYMENT:ADD_010)
  - Only ADMIN can add payment methods
  - Form with type (CREDIT_CARD, DEBIT_CARD, UPI, NET_BANKING, WALLET), label, last 4 digits
- **Remove** - Deletes payment method

## 🔑 Test Credentials

Use these pre-seeded accounts to test different permission levels:

### Admin Account
```
Email: admin@example.com
Password: admin123
Permissions: FULL ACCESS (all categories & actions)
```

### Manager Account
```
Email: manager@example.com
Password: manager123
Permissions: View restaurants/menus, create/cancel orders, view payments
```

### Member Account
```
Email: member@example.com
Password: member123
Permissions: View restaurants/menus, create orders, view own orders (cannot cancel)
```

## 🎨 UI Components & Styling

All components use **Styled Components** for styling:

- **GlobalStyles** - CSS reset, typography, base styles
- **Responsive** - Mobile-friendly layouts
- **Theme** - Purple gradient (`#667eea` → `#764ba2`)
- **Shadows** - Subtle shadows for depth
- **Animations** - Hover effects with `transform`
- **Icons** - Emoji-based icons for simplicity

### Color Palette
- Primary: `#667eea` (Purple)
- Primary Dark: `#764ba2`
- Success: `#d4edda` (Green)
- Warning: `#fff3cd` (Yellow)
- Danger: `#f8d7da` (Red)
- Text: `#333` (Dark Gray)
- Text Light: `#666` (Medium Gray)

## 📡 API Integration

### Base Configuration
```typescript
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor - adds auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handles 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### API Endpoints Used

| Endpoint | Method | Description | Permission |
|----------|--------|-------------|------------|
| `/auth/login` | POST | User login | Public |
| `/auth/register` | POST | User registration | Public |
| `/auth/permissions` | GET | Get user permissions | Authenticated |
| `/restaurants` | GET | List restaurants | VIEW_RESTAURANTS |
| `/restaurants/:id` | GET | Get restaurant details | VIEW_RESTAURANTS |
| `/restaurants/:id/menu` | GET | Get menu items | VIEW_RESTAURANTS |
| `/orders` | GET | List user orders | VIEW_ORDERS |
| `/orders` | POST | Create order | CREATE_ORDER |
| `/orders/:id` | DELETE | Cancel order | CANCEL_ORDER |
| `/payments/methods` | GET | List payment methods | VIEW_PAYMENT_METHODS |
| `/payments/methods` | POST | Add payment method | ADD_PAYMENT_METHOD |
| `/payments/methods/:id` | DELETE | Remove payment method | ADD_PAYMENT_METHOD |

## 🧪 Development Tips

### Adding a New Protected Feature

1. **Add permission to backend** - Add to `acl_actions` table
2. **Map action to category** - Add to `acl_action_category_map`
3. **Add to feature mapping** - Update `featurePermissionMap` in `src/types/permissions.ts`
4. **Use in component**:
```typescript
const { hasPermission } = usePermission(FeatureKey.MY_NEW_FEATURE);
```

### Debugging Permissions

Check Redux DevTools to inspect permission state:
```typescript
// State structure
{
  permissions: {
    access: {
      iWork: {
        RESTAURANT: { VIEW_001: true, ... },
        ORDER: { VIEW_005: true, CREATE_006: true, ... }
      }
    }
  }
}
```

### Hot Reload
Vite provides instant hot module replacement (HMR). Changes to components will reflect immediately without page refresh.

## 🐛 Common Issues

### 1. 401 Unauthorized
- **Cause**: Token expired or invalid
- **Fix**: Logout and login again

### 2. Permission Denied
- **Cause**: User role doesn't have required permission
- **Fix**: Login with an account that has the permission (e.g., admin@example.com)

### 3. CORS Errors
- **Cause**: Backend not allowing requests from `http://localhost:5173`
- **Fix**: Backend should have `app.enableCors()` in `main.ts`

### 4. API Not Found (404)
- **Cause**: Backend not running or wrong `VITE_API_URL`
- **Fix**: Ensure backend is running at `http://localhost:3000` and `.env` is correct

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
```
Creates optimized bundle in `dist/` folder.

### Deploy to Vercel/Netlify
```bash
# Build command
npm run build

# Output directory
dist

# Environment variables
VITE_API_URL=https://your-backend-api.com/api
```

### Docker Support (Optional)
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

When adding new features:
1. Follow existing component structure
2. Use TypeScript for type safety
3. Use styled-components for styling
4. Check permissions with `usePermission` hook
5. Handle loading/error states
6. Add responsive styles

## 📝 License

MIT License

---

**Built for hackathon challenge** - Enterprise-grade ACL system with category + action driven permissions! 🚀
