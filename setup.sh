#!/bin/bash

# Food Ordering ACL - Quick Setup Script
# This script sets up both backend and frontend for development

set -e

echo "🍔 Food Ordering ACL - Quick Setup"
echo "=================================="
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL 14+ first."
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Backend setup
echo "🔧 Setting up Backend..."
cd backend

# Install dependencies
echo "📦 Installing backend dependencies..."
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating backend .env file..."
    cat > .env << EOF
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=food_ordering_acl
JWT_SECRET=hackathon-super-secret-jwt-key-change-in-production-$(date +%s)
JWT_EXPIRES_IN=7d
EOF
    echo "✅ Created .env file (please update PostgreSQL credentials if needed)"
else
    echo "✅ .env file already exists"
fi

# Create database
echo "🗄️  Creating database..."
DB_NAME="food_ordering_acl"
if psql -U postgres -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
    echo "✅ Database already exists"
else
    createdb -U postgres $DB_NAME
    echo "✅ Database created"
fi

echo "✅ Backend setup complete"
echo ""

# Frontend setup
echo "🎨 Setting up Frontend..."
cd ../frontend

# Install dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating frontend .env file..."
    cat > .env << EOF
VITE_API_URL=http://localhost:3000/api
EOF
    echo "✅ Created .env file"
else
    echo "✅ .env file already exists"
fi

echo "✅ Frontend setup complete"
echo ""

cd ..

# Summary
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo ""
echo "1. Start the backend:"
echo "   cd backend"
echo "   npm run start:dev"
echo "   (Backend will run at http://localhost:3000)"
echo ""
echo "2. Seed the database (in a new terminal):"
echo "   cd backend"
echo "   npm run seed"
echo ""
echo "3. Start the frontend (in a new terminal):"
echo "   cd frontend"
echo "   npm run dev"
echo "   (Frontend will run at http://localhost:5173)"
echo ""
echo "4. Login with test account:"
echo "   Email: admin@example.com"
echo "   Password: admin123"
echo ""
echo "📚 Read README.md for more details"
echo ""
echo "Happy coding! 🚀"
