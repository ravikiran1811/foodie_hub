# 🚀 Quick Start Guide

Get the Food Ordering ACL system running in 5 minutes!

## Prerequisites

- Node.js 20+
- PostgreSQL 14+
- npm or yarn

## Automated Setup (Recommended)

### On macOS/Linux:
```bash
./setup.sh
```

### On Windows:
```cmd
setup.bat
```

This will:
- Install all dependencies
- Create .env files
- Create the PostgreSQL database
- Guide you through the remaining steps

## Manual Setup

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Configure Backend Environment
```bash
# Copy example env file
cp .env.example .env

# Edit .env and update these values:
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres          # Your PostgreSQL user
DATABASE_PASSWORD=postgres      # Your PostgreSQL password
DATABASE_NAME=food_ordering_acl
JWT_SECRET=your-random-secret   # Change this!
JWT_EXPIRES_IN=7d
```

### 3. Create Database
```bash
# Using psql
createdb -U postgres food_ordering_acl

# Or using psql shell
psql -U postgres
CREATE DATABASE food_ordering_acl;
\q
```

### 4. Start Backend Server
```bash
cd backend
npm run start:dev
```

The backend will:
- Start at `http://localhost:3000`
- Auto-create database tables from TypeORM entities
- Enable CORS for frontend

### 5. Seed Database (IMPORTANT!)
**In a new terminal**, run:
```bash
cd backend
npm run seed
```

This populates the database with:
- ✅ 3 Roles (ADMIN, MANAGER, MEMBER)
- ✅ 5 ACL Categories
- ✅ 8 ACL Actions
- ✅ Category-Action mappings
- ✅ Role-Permission mappings
- ✅ 3 Test users
- ✅ 3 Sample restaurants with menus

### 6. Install Frontend Dependencies
**In a new terminal**:
```bash
cd frontend
npm install
```

### 7. Configure Frontend Environment
```bash
# Copy example env file
cp .env.example .env

# Edit .env (default should work):
VITE_API_URL=http://localhost:3000/api
```

### 8. Start Frontend Server
```bash
cd frontend
npm run dev
```

Frontend will start at `http://localhost:5173`

## 🎯 Test the Application

Open `http://localhost:5173` in your browser.

### Test Accounts

#### 1. Admin (Full Access)
```
Email: admin@example.com
Password: admin123
```
**Permissions:**
- ✅ View restaurants & menus
- ✅ Create orders
- ✅ Cancel any order
- ✅ View payment methods
- ✅ Add payment methods

#### 2. Manager (Moderate Access)
```
Email: manager@example.com
Password: manager123
```
**Permissions:**
- ✅ View restaurants & menus
- ✅ Create orders
- ✅ Cancel orders
- ✅ View payment methods
- ❌ Cannot add payment methods

#### 3. Member (Basic Access)
```
Email: member@example.com
Password: member123
```
**Permissions:**
- ✅ View restaurants & menus
- ✅ Create orders
- ✅ View own orders
- ❌ Cannot cancel orders
- ✅ View payment methods
- ❌ Cannot add payment methods

## 🧪 Quick Feature Test

1. **Login as Member** (`member@example.com`)
2. Go to **Restaurants** → Click on "Pizza Paradise"
3. Add 2x Margherita Pizza to cart
4. Click **Checkout** (you should see success)
5. Go to **Orders** → See your order
6. Try to **Cancel Order** → Button should NOT appear (no permission)
7. **Logout**
8. **Login as Admin** (`admin@example.com`)
9. Go to **Orders** → See all orders
10. Click **Cancel Order** → Should work (admin has permission)
11. Go to **Payments** → Click **+ Add New**
12. Add a payment method → Should work (only admin can)

## 🐛 Troubleshooting

### Backend won't start
- **Check PostgreSQL**: `psql -U postgres -c "SELECT version();"`
- **Check .env file**: Make sure credentials match your PostgreSQL setup
- **Check port 3000**: `lsof -i :3000` (macOS/Linux) or `netstat -ano | findstr :3000` (Windows)

### Frontend shows 401 errors
- Backend not running? Check `http://localhost:3000/api/restaurants`
- Token expired? Logout and login again

### No restaurants showing
- **Run seed script**: `cd backend && npm run seed`
- Check backend logs for errors

### Permission denied errors
- You're using wrong account (e.g., member trying to cancel order)
- Try logging in with `admin@example.com` (has all permissions)

### CORS errors
- Backend should have `app.enableCors()` in `main.ts`
- Check `VITE_API_URL` in frontend `.env`

## 📚 Next Steps

- Read [Root README](../README.md) for architecture overview
- Read [Backend README](../backend/README.md) for API docs
- Read [Frontend README](../frontend/README.md) for component docs
- Explore permission system in Redux DevTools
- Try creating orders with different roles

## 🎉 You're All Set!

The application is now running with:
- ✅ Enterprise ACL system
- ✅ Category + Action permissions
- ✅ JWT authentication
- ✅ Full REST API
- ✅ Modern React frontend

Start building! 🚀

---

**Need help?** Check the READMEs or examine the seed data in `backend/src/database/seeds/seed.ts`
