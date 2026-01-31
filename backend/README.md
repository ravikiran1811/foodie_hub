# Food Ordering ACL System - Backend

Enterprise-grade ACL (Access Control List) system built with NestJS, TypeORM, and PostgreSQL.

## 🚀 Features

- **Role-Based Access Control (RBAC)** with fine-grained ACL
- **Category + Action** based permissions
- **Country-based** data filtering (ReBAC-style)
- JWT Authentication
- REST API (no GraphQL)
- Enterprise entity structure with audit fields

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## ⚙️ Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update with your PostgreSQL credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=food_ordering_acl

JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d

PORT=4000
NODE_ENV=development
```

### 3. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE food_ordering_acl;
```

### 4. Run Database Seed

```bash
npm run seed
```

This will create:
- ACL Categories (ORDERS, PAYMENTS, RESTAURANTS, USERS, DASHBOARD)
- ACL Actions (READ, WRITE, UPDATE, DELETE, IMPORT, EXPORT, APPROVE, REJECT)
- Roles (ADMIN, MANAGER, MEMBER)
- Permission mappings
- Test users
- Sample restaurants and menu items

### 5. Start Development Server

```bash
npm run start:dev
```

Server will start at `http://localhost:4000`

## 🔑 Test Credentials

```
Admin:   admin@food.com / password123
Manager: manager@food.com / password123
Member:  member@food.com / password123
```

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/permissions` - Get user permissions (requires auth)
- `GET /api/auth/me` - Get current user (requires auth)

### Restaurants

- `GET /api/restaurants` - List all restaurants (filtered by user country)
- `GET /api/restaurants/:id` - Get restaurant details
- `GET /api/restaurants/:id/menu` - Get restaurant menu

### Orders

- `POST /api/orders` - Create order (WRITE permission required)
- `GET /api/orders` - List user's orders (READ permission required)
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (UPDATE permission required)
- `DELETE /api/orders/:id` - Cancel order (DELETE permission required)

### Payments

- `POST /api/payments/methods` - Add payment method (WRITE permission required)
- `GET /api/payments/methods` - List payment methods (READ permission required)
- `DELETE /api/payments/methods/:id` - Remove payment method (UPDATE permission required)

## 🔐 Permission System

### How It Works

1. **Categories**: Logical groupings (ORDERS, PAYMENTS, etc.)
2. **Actions**: Operations (READ, WRITE, UPDATE, DELETE, etc.)
3. **Action-Category Mapping**: Defines which actions are valid for each category
4. **Role Permissions**: Maps roles to category-action combinations with isAllowed flag

### Permission Response Format

```json
{
  "access": {
    "iWork": {
      "ORDERS": {
        "parent": "ORDERS",
        "READ_001": true,
        "WRITE_001": true,
        "UPDATE_001": false,
        "DELETE_001": false
      },
      "PAYMENTS": {
        "parent": "PAYMENTS",
        "READ_001": true,
        "WRITE_001": false
      }
    }
  }
}
```

### Role Capabilities

| Feature | Admin | Manager | Member |
|---------|-------|---------|--------|
| View restaurants | ✅ | ✅ | ✅ |
| Create order | ✅ | ✅ | ✅ |
| Update/Cancel order | ✅ | ✅ | ❌ |
| Manage payments | ✅ | ❌ | ❌ |

## 🗄️ Database Schema

### Core ACL Tables

- `acl_categories` - Permission categories
- `acl_actions` - Available actions
- `acl_action_category_map` - Valid action-category combinations
- `roles` - User roles
- `role_acl_category_action_map` - **Core ACL mapping table**
- `users` - User accounts with role and country

### Business Tables

- `restaurants` - Restaurant listings
- `menu_items` - Menu items per restaurant
- `orders` - Customer orders
- `order_items` - Order line items
- `payment_methods` - Payment methods per user

## 🛡️ Guards

### JwtAuthGuard

Validates JWT token and extracts user information.

### AclGuard

Checks if user's role has permission for the requested category-action combination.

```typescript
@RequireAcl('ORDERS', 'WRITE')
```

### CountryAccessGuard

Validates country-based access restrictions.

```typescript
@RequireCountryAccess()
```

## 🏗️ Project Structure

```
src/
├── auth/
│   ├── decorators/
│   ├── dto/
│   ├── guards/
│   ├── interfaces/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── entities/
│   ├── acl-action.entity.ts
│   ├── acl-category.entity.ts
│   ├── acl-action-category-map.entity.ts
│   ├── role.entity.ts
│   ├── role-acl-category-action-map.entity.ts
│   ├── user.entity.ts
│   ├── restaurant.entity.ts
│   ├── menu-item.entity.ts
│   ├── order.entity.ts
│   ├── order-item.entity.ts
│   └── payment-method.entity.ts
├── restaurants/
├── orders/
├── payments/
├── database/seeds/
├── config/
├── app.module.ts
└── main.ts
```

## 📝 Scripts

```bash
npm run build          # Build for production
npm run start          # Start production server
npm run start:dev      # Start development server
npm run seed           # Seed database
npm run lint           # Lint code
npm run format         # Format code
```

## 🔧 Development Tips

1. **Synchronize is ON**: For development convenience, TypeORM auto-syncs schema. Disable in production.
2. **Audit Fields**: All entities have `created_by`, `updated_by`, `created_at`, `updated_at`.
3. **Numeric IDs**: All entities use numeric IDs (not UUIDs) for better performance.
4. **Column Names**: Follow snake_case convention for database columns.

## 🚨 Production Checklist

- [ ] Disable `synchronize` in TypeORM config
- [ ] Use migrations for schema changes
- [ ] Change JWT secret
- [ ] Enable HTTPS
- [ ] Set up proper logging
- [ ] Configure rate limiting
- [ ] Set up database backups
- [ ] Use environment-specific configs
- [ ] Enable helmet for security headers
- [ ] Set up monitoring (Sentry, DataDog, etc.)

## 📄 License

MIT
