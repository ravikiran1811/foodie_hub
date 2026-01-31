# 🍔 Food Ordering System with Enterprise ACL

A full-stack food ordering web application with **fine-grained Access Control List (ACL)** system built for a hackathon challenge. This is NOT a simple role-based system - permissions are **category + action driven** with support for scopes and country-based access control.

## 🎯 Project Overview

### Key Features
- ✅ **Enterprise ACL System** - Category + Action based permissions (not simple role check)
- ✅ **REST API** - NestJS backend with TypeORM & PostgreSQL
- ✅ **Modern Frontend** - React + TypeScript + Redux with permission guards
- ✅ **JWT Authentication** - Secure token-based auth with bcrypt password hashing
- ✅ **Restaurant Management** - Browse restaurants, view menus, add to cart
- ✅ **Order Management** - Create orders, track status, cancel orders (role-based)
- ✅ **Payment Methods** - Manage multiple payment options
- ✅ **Country-Based Access** - Restaurants filtered by user's country
- ✅ **Audit Trail** - created_by, updated_by, created_at, updated_at on all entities

### Permission Model

**This is NOT role-based! It's permission-based!**

```
User → Role → (Category + Action) → Permission
```

Each permission is checked as:
```typescript
access.iWork.CATEGORY.ACTION_XXX = boolean
```

Example:
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
        CANCEL_007: false  // Only ADMIN/MANAGER
      },
      PAYMENT: {
        VIEW_009: true,
        ADD_010: false  // Only ADMIN
      }
    }
  }
}
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│  React + TypeScript + Redux + Styled Components            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Pages: Login, Register, Dashboard, Restaurants,     │  │
│  │        RestaurantMenu, Orders, PaymentMethods       │  │
│  │ Components: PermissionGuard, Navbar, ProtectedRoute │  │
│  │ Store: authSlice, permissionsSlice                  │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↕ HTTP/REST (Axios)
┌─────────────────────────────────────────────────────────────┐
│                        BACKEND                              │
│  NestJS + TypeORM + PostgreSQL                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Modules: Auth, Restaurants, Orders, Payments        │  │
│  │ Guards: JwtAuthGuard, AclGuard, CountryAccessGuard  │  │
│  │ Entities: 12 TypeORM entities (snake_case columns)  │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↕ SQL
┌─────────────────────────────────────────────────────────────┐
│                      PostgreSQL DATABASE                    │
│  ┌──────────────────┐  ┌──────────────────┐              │
│  │   ACL Tables     │  │  Business Tables │              │
│  │ • acl_categories │  │ • users          │              │
│  │ • acl_actions    │  │ • restaurants    │              │
│  │ • roles          │  │ • menu_items     │              │
│  │ • mappings       │  │ • orders         │              │
│  └──────────────────┘  │ • order_items    │              │
│                        │ • payment_methods│              │
│                        └──────────────────┘              │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 14+
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repo-url>
cd food-ordering-acl
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure database
# Edit .env file
cp .env.example .env

# Create database
createdb food_ordering_acl

# Run migrations (entities auto-create tables)
npm run start:dev

# Seed database with test data
npm run seed

# Backend runs at http://localhost:3000
```

**Backend .env:**
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=food_ordering_acl
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Configure API URL
# Edit .env file
cp .env.example .env

# Start development server
npm run dev

# Frontend runs at http://localhost:5173
```

**Frontend .env:**
```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Access the Application

Open `http://localhost:5173` and login with:

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`
- Permissions: ✅ ALL

**Manager Account:**
- Email: `manager@example.com`
- Password: `manager123`
- Permissions: ✅ View, Create, Cancel orders | ❌ Add payments

**Member Account:**
- Email: `member@example.com`
- Password: `member123`
- Permissions: ✅ View, Create orders | ❌ Cancel orders, Add payments

## 📚 Technology Stack

### Backend
- **NestJS 10.3** - Progressive Node.js framework
- **TypeORM 0.3.19** - ORM with PostgreSQL
- **PostgreSQL 14+** - Relational database
- **JWT** - @nestjs/jwt for authentication
- **bcrypt** - Password hashing
- **class-validator** - DTO validation
- **class-transformer** - Data transformation

### Frontend
- **React 18.2** - UI library
- **TypeScript 5.3** - Type safety
- **Redux Toolkit 2.0** - State management
- **Styled Components 6.1** - CSS-in-JS
- **Vite 5.0** - Build tool
- **React Router 6.21** - Routing
- **Axios 1.6** - HTTP client

## 📁 Project Structure

```
food-ordering-acl/
├── backend/                    # NestJS backend
│   ├── src/
│   │   ├── auth/              # Auth module (JWT, guards)
│   │   ├── restaurants/       # Restaurant CRUD
│   │   ├── orders/            # Order management
│   │   ├── payments/          # Payment methods
│   │   ├── entities/          # TypeORM entities (12 tables)
│   │   ├── database/
│   │   │   └── seeds/         # Database seed script
│   │   ├── app.module.ts      # Main module
│   │   └── main.ts            # Bootstrap
│   ├── package.json
│   └── README.md              # Backend documentation
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API service (Axios)
│   │   ├── store/             # Redux store & slices
│   │   ├── styles/            # Global styles
│   │   ├── types/             # TypeScript types
│   │   ├── App.tsx            # Root component
│   │   └── main.tsx           # Entry point
│   ├── package.json
│   └── README.md              # Frontend documentation
│
└── README.md                   # This file
```

## 🔐 Permission System Deep Dive

### ACL Database Structure

```sql
-- Permission Categories
acl_categories (id, name, description, scope)
  - RESTAURANT, ORDER, PAYMENT, etc.

-- Allowed Actions
acl_actions (id, name, description)
  - VIEW_001, CREATE_002, UPDATE_003, DELETE_004, etc.

-- Map Actions to Categories
acl_action_category_map (acl_action_id, acl_category_id)
  - VIEW_001 → RESTAURANT
  - CREATE_006 → ORDER

-- User Roles
roles (id, name, description)
  - ADMIN, MANAGER, MEMBER

-- Map Roles to Permissions
role_acl_category_action_map (role_id, acl_action_id, acl_category_id)
  - ADMIN → VIEW_001 + RESTAURANT
  - MEMBER → CREATE_006 + ORDER
```

### Backend Permission Check

```typescript
// Using @UseGuards(AclGuard) decorator
@UseGuards(JwtAuthGuard, AclGuard)
@Acl({ category: 'ORDER', action: 'CANCEL_007' })
@Delete(':id')
async cancelOrder(@Param('id') id: number, @CurrentUser() user: User) {
  return this.orderService.cancel(id, user.id);
}
```

### Frontend Permission Check

```typescript
// Using usePermission hook
const { hasPermission: canCancelOrder } = usePermission(FeatureKey.CANCEL_ORDER);

{canCancelOrder && (
  <button onClick={handleCancel}>Cancel Order</button>
)}
```

## 🎨 Features Breakdown

### 1. Authentication
- **Registration** - Choose role (ADMIN/MANAGER/MEMBER), optional country
- **Login** - Email/password with JWT token
- **Auto-redirect** - Protected routes redirect to login if not authenticated
- **Token storage** - JWT stored in localStorage
- **Auto-logout** - 401 responses clear token and redirect to login

### 2. Restaurant Management
- **List restaurants** - Grid layout with images, descriptions
- **Country filtering** - Backend filters by user's country (if set)
- **View menu** - Click restaurant to see all menu items
- **Permission**: `RESTAURANT:VIEW_001` (all roles)

### 3. Order Management
- **Browse menu** - See prices, descriptions, categories, availability
- **Add to cart** - Quantity controls, live total calculation
- **Checkout** - Create order with items, delivery address, special instructions
- **View orders** - List all orders with status, restaurant, items, total
- **Cancel order** - Delete order (only ADMIN/MANAGER, only if not DELIVERED/CANCELLED)
- **Permissions**: 
  - View: `ORDER:VIEW_005` (all roles)
  - Create: `ORDER:CREATE_006` (all roles)
  - Cancel: `ORDER:CANCEL_007` (ADMIN, MANAGER only)

### 4. Payment Methods
- **List methods** - Display all saved payment options
- **Add method** - Form with type, label, last 4 digits
- **Remove method** - Delete payment method
- **Permissions**:
  - View: `PAYMENT:VIEW_009` (all roles)
  - Add: `PAYMENT:ADD_010` (ADMIN only)

### 5. Dashboard
- **Welcome message** - Shows user name, email, role
- **Permission display** - Lists all permissions by category
- **Quick navigation** - Links to main features

## 🧪 Testing

### Backend API Testing

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# Get permissions
curl http://localhost:3000/api/auth/permissions \
  -H "Authorization: Bearer <token>"

# List restaurants
curl http://localhost:3000/api/restaurants \
  -H "Authorization: Bearer <token>"

# Create order
curl -X POST http://localhost:3000/api/orders \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "restaurantId": 1,
    "items": [{"menuItemId": 1, "quantity": 2, "price": 299}],
    "deliveryAddress": "123 Main St"
  }'
```

### Frontend Testing

1. **Test with MEMBER** - Cannot cancel orders or add payment methods
2. **Test with MANAGER** - Can cancel orders but cannot add payment methods
3. **Test with ADMIN** - Full access to all features

## 🚧 Common Issues & Solutions

### Issue: Cannot connect to database
**Solution:** Ensure PostgreSQL is running and credentials in `.env` are correct

### Issue: 401 Unauthorized on all requests
**Solution:** Login again to get a fresh JWT token

### Issue: Permission denied error
**Solution:** You're logged in with a role that doesn't have that permission. Try admin@example.com

### Issue: CORS error in browser
**Solution:** Backend has `app.enableCors()` in `main.ts`, restart backend

### Issue: Orders not showing
**Solution:** Run `npm run seed` in backend to populate database

## 📦 Deployment

### Backend (Heroku/Railway/Render)
```bash
# Set environment variables
DATABASE_HOST=<postgres-host>
DATABASE_PORT=5432
DATABASE_USER=<user>
DATABASE_PASSWORD=<password>
DATABASE_NAME=<dbname>
JWT_SECRET=<random-secret>

# Deploy
git push heroku main
```

### Frontend (Vercel/Netlify)
```bash
# Build command
npm run build

# Output directory
dist

# Environment variable
VITE_API_URL=https://your-backend.herokuapp.com/api
```

## 🤝 Contributing

This is a hackathon project demonstrating enterprise ACL patterns. Feel free to:
- Fork the repository
- Add more categories/actions
- Implement more features (reviews, ratings, delivery tracking)
- Improve UI/UX
- Add tests (Jest, Cypress)

## 📄 License

MIT License

## 👨‍💻 Author

Built for hackathon challenge - demonstrating:
- ✅ Fine-grained ACL (not simple role check)
- ✅ Category + Action driven permissions
- ✅ Scope and country-based access
- ✅ Enterprise-grade architecture
- ✅ Full-stack TypeScript
- ✅ Modern best practices

---

**Happy Coding! 🚀**
