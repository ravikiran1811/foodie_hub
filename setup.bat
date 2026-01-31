@echo off
REM Food Ordering ACL - Quick Setup Script (Windows)
REM This script sets up both backend and frontend for development

echo Food Ordering ACL - Quick Setup
echo ==================================
echo.

REM Check prerequisites
echo Checking prerequisites...

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 20+ first.
    exit /b 1
)

where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed. Please install npm first.
    exit /b 1
)

where psql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] PostgreSQL is not installed. Please install PostgreSQL 14+ first.
    exit /b 1
)

echo [OK] Prerequisites check passed
echo.

REM Backend setup
echo Setting up Backend...
cd backend

REM Install dependencies
echo Installing backend dependencies...
call npm install

REM Create .env if it doesn't exist
if not exist .env (
    echo Creating backend .env file...
    (
        echo DATABASE_HOST=localhost
        echo DATABASE_PORT=5432
        echo DATABASE_USER=postgres
        echo DATABASE_PASSWORD=postgres
        echo DATABASE_NAME=food_ordering_acl
        echo JWT_SECRET=hackathon-super-secret-jwt-key-change-in-production
        echo JWT_EXPIRES_IN=7d
    ) > .env
    echo [OK] Created .env file ^(please update PostgreSQL credentials if needed^)
) else (
    echo [OK] .env file already exists
)

REM Create database
echo Creating database...
psql -U postgres -lqt | findstr /C:"food_ordering_acl" >nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Database already exists
) else (
    createdb -U postgres food_ordering_acl
    echo [OK] Database created
)

echo [OK] Backend setup complete
echo.

REM Frontend setup
echo Setting up Frontend...
cd ..\frontend

REM Install dependencies
echo Installing frontend dependencies...
call npm install

REM Create .env if it doesn't exist
if not exist .env (
    echo Creating frontend .env file...
    echo VITE_API_URL=http://localhost:3000/api > .env
    echo [OK] Created .env file
) else (
    echo [OK] .env file already exists
)

echo [OK] Frontend setup complete
echo.

cd ..

REM Summary
echo Setup Complete!
echo ==================
echo.
echo Next steps:
echo.
echo 1. Start the backend:
echo    cd backend
echo    npm run start:dev
echo    ^(Backend will run at http://localhost:3000^)
echo.
echo 2. Seed the database ^(in a new terminal^):
echo    cd backend
echo    npm run seed
echo.
echo 3. Start the frontend ^(in a new terminal^):
echo    cd frontend
echo    npm run dev
echo    ^(Frontend will run at http://localhost:5173^)
echo.
echo 4. Login with test account:
echo    Email: admin@example.com
echo    Password: admin123
echo.
echo Read README.md for more details
echo.
echo Happy coding!

pause
